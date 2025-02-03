"use client"
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import SearchBar from '@/app/admin/components/SearchBar';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { getPaymentsData } from '@/services/therapist/therapist-service.';
import ReactLoading from 'react-loading';
import Modal from "react-modal";
import { CloseIcon } from '@/utils/svgicons';
import { downloadFileFromS3, getImageUrlOfS3 } from '@/utils';
import { IoIosDocument } from "react-icons/io";
import ReactLoader from '@/components/ReactLoader';

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProgressNotes, setSelectedProgressNotes] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const session = useSession()
  const [query, setQuery] = useState('page=1&limit=10')
  const { data, error, isLoading, mutate } = useSWR(`/therapist/payment-requests/${session?.data?.user?.id}?${query}`, getPaymentsData);
  const paymentsData: any = data?.data?.data
  const page = data?.data?.page
  const total = data?.data?.total
  const rowsPerPage = data?.data?.limit


  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`);
  }

  const openModal = (progressNotes: string) => {
    setSelectedProgressNotes(progressNotes);
    setShowModal(true);
  };

  return (
    <div>
      <h1 className=' mb-[20px] md:mb-[50px]'>Payment History</h1>
      <div className='flex justify-end mb-[30px]'>
        <SearchBar setQuery={setQuery} placeholder = {'Search By Id'} />
      </div>
      <div className="table-common overflo-custom">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Requestor&apos;s Name</th>
              <th>Request Type</th>
              <th>Services Provider</th>
              <th>Client Name</th>
              <th>Date & Time</th>
              <th>Progress Notes</th>
              <th>Notes</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Payment Invoice</th>
              <th>Late Payment</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className='text-center'>
                  <ReactLoading type={'spin'} color={'#26395e'} height={'20px'} width={'20px'} />
                </td>
              </tr>
            ) : (paymentsData?.length > 0 ? (
              paymentsData?.map((item: any) => (
                <tr key={item?._id}>
                  <td>#{item?.identifier}</td>
                  <td>{session?.data?.user?.name}</td>
                  <td>{item?.requestType}</td>
                  <td>{item?.servicesProvided}</td>
                  <td>{item?.clientId?.firstName} {item?.clientId?.lastName}</td>
                  {/* .toLocaleDateString('en-US')  {item?.progressNotes}*/}
                  <td>{new Date(item?.serviceDate).toLocaleDateString('en-US')} {item?.serviceTime} </td>
                  <td> <p className='cursor-pointer font-gothamMedium text-center rounded-xl text-[10px] py-[4px] text-[#fff] bg-[#26395E]' onClick={() => openModal(item?.progressNotes)}>View</p></td>
                  <td>{item?.rejectedNote ? (item.detailsAboutPayment ? item.detailsAboutPayment : item.rejectedNote) : "No Note"}</td>
                  <td>{new Date(item?.serviceDate).toLocaleDateString('en-US')}</td>
                  <td> <p className={`capitalize font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px] ${item?.status === 'approved' ? 'text-[#42A803] bg-[#CBFFB2]' : ''}`}>{item?.status}</p> </td>
                  <td>
                    <button
                      onClick={() => {
                        setDownloading(true)
                        if (item?.invoice) {
                          downloadFileFromS3(getImageUrlOfS3(item?.invoice))
                          setDownloading(false)
                        }
                      }}
                      disabled={item?.invoice == null}
                    >
                      {!downloading ? <IoIosDocument color='#26395e' size={20} /> : <ReactLoader />}
                    </button>
                  </td>
                  <td>
                    <p className={`capitalize font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px] ${item?.latePayment ? 'text-[#FF0000] bg-[#FFB2B2]' : 'text-[#42A803] bg-[#CBFFB2]'}`}>
                      {item?.latePayment ? 'Yes' : 'No'}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className='text-center'>No data found</td>
              </tr>
            )
            )}
          </tbody>
        </table>
      </div>
      <div className="text-right">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(total / rowsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'inline-flex mt-8 rounded border border-[#d5dce9]'}
          pageClassName={'text-[#26395e] '}
          pageLinkClassName={'py-2 px-4 inline-block'}
          activeClassName={'bg-[#26395e] rounded text-white'}
          previousLinkClassName={'py-2 px-4 inline-block text-[#26395e] '}
          nextLinkClassName={'py-2 px-4 inline-block text-[#26395e] '}
          disabledClassName={'opacity-50 cursor-not-allowed'}
        />
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Notes "
        className=" w-[90%] max-w-[500px] max-h-[90vh]  overflow-auto overflo-custom   "
        overlayClassName="w-full h-full fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >

        <div className='flex items-center justify-between rounded-t-[20px] p-5  bg-[#283C63]  '>
          <h2 className="text-xl text-white font- ">Progress Notes</h2>
          <button onClick={() => setShowModal(false)} className="">
            <CloseIcon />
          </button>
        </div>
        <div className='bg-white p-5 rounded-b-[20px] '>
          <p>{selectedProgressNotes || "No notes available"}</p>

        </div>
      </Modal>
    </div>
  );
};

export default Page;
