"use client"
import React, { useState, useTransition } from 'react';
import ReactPaginate from 'react-paginate';
import { TicketTableIcon } from '@/utils/svgicons';
import SearchBar from '@/app/admin/components/SearchBar';
import {  getAdminTicketsData, updateAdminTicketsData } from '@/services/admin/admin-service';
import useSWR from 'swr';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const Page: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('page=1&limit=10&'); //?${query}
  const { data, error, isLoading, mutate } = useSWR(`/admin/tickets/?${query}`, getAdminTicketsData);
  const ticketsData = data?.data?.data?.data;
  const total = data?.data?.total ?? 0;
 const router = useRouter();
  const rowsPerPage = 10;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }
  const getStatusColor = (status: 'Pending' | 'Completed'): string => {
    return status === 'Pending' ? 'text-[#A85C03] bg-[#FFFDD1]' : 'text-[#42A803] bg-[#CBFFB2]';
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    if (id) {
      const { name, value } = event.target;
      const actionData = {
        [name]: value,
      };
      (async () => {
        try {
          const response = await updateAdminTicketsData(`/admin/tickets/${id}`, actionData);
          if (response.status === 200) {
            toast.success("Client status updated successfully");
            mutate();
          } else {
            toast.error("Failed to update client status");
            console.error("Unexpected response:", response);
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error("Error updating client status");
        }
      })();
    }
  };

  const handleChat = (id: string) => {
    router.push(`/admin/tickets-page/chats/${id}`);
  };

  
  return (
    <div>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
      Tickets
      </h1>
      <div className='flex justify-end mb-5'>
          <SearchBar setQuery={setQuery} placeholder='Search ticket Id'/>
      </div>
      <div className='table-common overflo-custom'>
        <table className="">
          <thead>
            <tr>
              <th>Ticket Id</th>
              <th>Client Name</th>
              <th>Title</th>
              <th>Created On</th>
              <th>Status</th>
              <th>Chat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="text-center text-red-500 ">
                  Error loading data.
                </td>
              </tr>
            ) : ticketsData?.length > 0 ? (
              ticketsData?.map((row: any) => (
                <tr key={row?._id}>
                  <td>#{row?.ticketId}</td>
                  
                  <td>{row?.sender?.firstName} {row?.sender?.lastName}</td>
                  <td>{row?.title}</td>
                  <td>{new Date(row?.createdAt).toLocaleDateString('en-US')}</td>
                  
                  <td> <p className={`px-[10px] py-[2px] w-20 text-[10px] text-center rounded-3xl ${getStatusColor(row?.status)}`}>{row?.status}</p>
                  </td>

                  <td><button onClick={()=>handleChat(row?.roomId)}><TicketTableIcon/> </button> </td>
                    <td>  
                    <select
                    name="status"
                    value={row?.status}
                    onChange={(event)=>handleInputChange(event, row?._id)}
                    className="w-auto border-none h-auto bg-transparent p-0 pr-4"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    </select>
                    </td>
                    
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="w-full flex justify-center p-3 items-center"
                  colSpan={5}
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
      <div className="text-right mt-4">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(total / rowsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]'}
          pageClassName={'text-[#26395e]'}  // list item
          pageLinkClassName={'py-2 px-4 inline-block'} // anchor tag
          activeClassName={'bg-[#26395e] rounded-[5px] text-white'} // active anchor
          previousLinkClassName={'py-2 px-4 inline-block'}
          nextLinkClassName={'py-2 px-4 inline-block'}
          disabledClassName={'opacity-50 cursor-not-allowed'}
        />
      </div>
    </div>
  );
};

export default Page;
