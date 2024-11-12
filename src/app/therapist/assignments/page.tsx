"use client"
import SearchBar from '@/app/admin/components/SearchBar';
import { getTherapistAssignments } from '@/services/therapist/therapist-service.';
import { useSession } from 'next-auth/react';
import { use, useState } from 'react';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';
import ReactLoading from 'react-loading';

const Page = () => {
  const session = useSession()
  const [query, setQuery] = useState('')
  const { data, error, isLoading, mutate } = useSWR(`/therapist/${session?.data?.user?.id}/clients?${query}`, getTherapistAssignments);
  const clientsData: any = data?.data?.data
  const page = data?.data?.page
  const total = data?.data?.total
  const rowsPerPage = data?.data?.limit
  const [currentPage, setCurrentPage] = useState(0);
  const peerSupportData = [
    { id: 1, client: 'Sandra Norton', date: '26 July 2023', phone: '7044431549', email: 'allisoncook58.ac@gmail.com', chat: 'Start Chat', videoChat: '', status: 'Confirm' },
    { id: 2, client: 'Andrea Gibson', date: '26 July 2023', phone: '7044431549', email: 'allisoncook58.ac@gmail.com', chat: 'No Permission', videoChat: '', status: 'Confirm' },
    // Add more dummy data here
  ];

  const therapistData = [
    { id: 1, client: 'John Doe', date: '24 July 2023', phone: '7011234567', email: 'johndoe@gmail.com', chat: 'No Permission', videoChat: '', status: 'Confirm' },
    { id: 2, client: 'Jane Smith', date: '25 July 2023', phone: '7027654321', email: 'janesmith@gmail.com', chat: 'Start Chat', videoChat: '', status: 'Confirm' },
    { id: 3, client: 'John Doe', date: '24 July 2023', phone: '7011234567', email: 'johndoe@gmail.com', chat: 'No Permission', videoChat: '', status: 'Confirm' },
    { id: 4, client: 'Jane Smith', date: '25 July 2023', phone: '7027654321', email: 'janesmith@gmail.com', chat: 'Start Chat', videoChat: '', status: 'Confirm' },

    // Add more dummy data here
  ];

  // const handleTabClick = (tab: string) => {
  //   setActiveTab(tab);
  //   setCurrentPage(0); // Reset to the first page when switching tabs
  // };

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`);
  }

  // const data = activeTab === 'peerSupport' ? peerSupportData : therapistData;
  // const filteredData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <div className="">
      <h1 className=' mb-[20px] md:mb-[50px]'>Assignmets</h1>
      <div className="flex justify-end my-4">
        <SearchBar setQuery={setQuery} />
      </div>
      <div className='table-common overflo-custom'>

        <table className="">
          <thead>
            <tr className="">
              <th >Client</th>
              <th >Date Assigned</th>
              <th >Phone Number</th>
              <th >Email Address</th>
              <th >Session Notes</th>
              <th >Chat Client</th>
              <th >Video Chat</th>
              <th >Status</th>
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
              clientsData?.length > 0 ? (
                clientsData?.map((item: any) => (
                  <tr key={item._id}>
                    <td>{item.clientId.firstName} {item.clientId.lastName}</td>
                    <td>{new Date(item.appointmentDate).toLocaleDateString('en-US')}</td>
                    <td>{item.clientId.phoneNumber}</td>
                    <td>{item.clientId.email}</td>
                    <td>
                      <p className='cursor-pointer font-gothamMedium text-center rounded-xl text-[10px] py-[4px] text-[#fff] bg-[#26395E]'>View</p>
                    </td>
                    <td>
                      <p className={`font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px] ${item.chat === 'Start Chat' ? ' text-[#42A803] bg-[#CBFFB2] ' : ' text-[#FFA234] bg-[#FFFCEC] '}`}>
                        {!item.message ? 'No chat' : <p className='cursor-pointer font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px]  text-[#42A803] bg-[#CBFFB2]'>Start Chat</p>}
                      </p>
                    </td>
                    <td>{!item.video ? 'No video' : <p className='cursor-pointer font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px]  text-[#42A803] bg-[#CBFFB2]'>Start Video</p>}</td>
                    <td>
                      <p className='font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px]  text-[#42A803] bg-[#CBFFB2]'>{item.status}</p>
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
      {Math.ceil(total / rowsPerPage) > 0 && <div className="text-right">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(total / rowsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={
            "inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]"
          }
          pageClassName={"text-[#26395e] "} //list item
          pageLinkClassName={"py-2 px-4 inline-block"} //anchor tag
          activeClassName={"bg-[#26395e] rounded-[5px] text-white"} //active anchor
          previousLinkClassName={"py-2 px-4 inline-block"}
          nextLinkClassName={"py-2 px-4 inline-block"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>}
    </div>
  );
};

export default Page;
