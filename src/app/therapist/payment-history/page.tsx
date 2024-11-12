"use client"
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import SearchBar from '@/app/therapist/components/SearchBar';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { getPaymentsData } from '@/services/therapist/therapist-service.';
import ReactLoading from 'react-loading';
 
const Page = () => {
  const session = useSession()
  const [query, setQuery] = useState('')
  const { data, error, isLoading, mutate } = useSWR(`/therapist/payment-requests/${session?.data?.user?.id}?${query}`, getPaymentsData);
  const paymentsData: any = data?.data?.data
  console.log('paymentsData:', paymentsData);
  const page = data?.data?.page
  const total = data?.data?.total
  const rowsPerPage = data?.data?.limit


  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`);
  }
  
  return (
    <div>
      <h1 className=' mb-[20px] md:mb-[50px]'>Payment History</h1>
      <div className='flex justify-end mb-[30px]'>
        <SearchBar />
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
            </tr>
          </thead>
          <tbody>
          {isLoading ? (
              <tr>
                <td colSpan={7} className='text-center'>
                  <ReactLoading type={'spin'} color={'#26395e'} height={'20px'} width={'20px'} />
                </td>
              </tr>
            ) : (
              paymentsData?.length > 0 ? (
            paymentsData?.map((item: any) => (
              <tr key={item?._id}>
                <td>{item?._id}</td>
                <td>{session?.data?.user?.name}</td>
                <td>{item?.requestType}</td>
                <td>{item?.servicesProvided}</td>
                <td>{item?.clientId?.firstName} {item?.clientId?.lastName}</td>  
                {/* .toLocaleDateString('en-US') */}
                <td>{item?.serviceDate} {item?.serviceTime} </td>
                <td>{item?.progressNotes}</td>
                <td>{item?.rejectedNote ? (item.detailsAboutPayment ? item.detailsAboutPayment : item.rejectedNote) : "No Note"}</td>

                <td>{item?.serviceDate}</td>
                <td>
                <p className='font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px]  text-[#42A803] bg-[#CBFFB2]'>{item?.status}</p> 
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
    </div>
  );
};

export default Page;
