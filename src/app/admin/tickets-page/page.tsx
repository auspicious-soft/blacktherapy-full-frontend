"use client"
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { DeleteIcon } from '@/utils/svgicons';
import SearchBar from '@/app/admin/components/SearchBar';
import {  getAdminTicketsData } from '@/services/admin/admin-service';
import useSWR from 'swr';
import { toast } from 'sonner';


const Page: React.FC = () => {
  const [query, setQuery] = useState('page=1&limit=10&'); //?${query}
  const { data, error, isLoading, mutate } = useSWR(`/admin/tickets`, getAdminTicketsData);
  const ticketsData = data?.data?.data?.data;
  console.log('ticketsData:', ticketsData);
  const total = data?.data?.total ?? 0;



  

  const rowsPerPage = 10;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }



  return (
    <div>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
      Tickets
      </h1>
      <div className='flex justify-end mb-5'>
          <SearchBar setQuery={setQuery} />
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
                  <td>{row?._id}</td>
                  
                  <td>{row?.therapistId?.firstName} {row?.therapistId?.lastName}</td>
                  <td>{row?.title}</td>
                  <td>{new Date(row?.dueDate).toLocaleDateString('en-US')}</td>
                  
                  <td>
                    <a href="#" onClick={() => alert(`Opening attachment for ${row?.title}`)}>{row?.attachment}</a>
                  </td>
                  <td>{row?.note}</td>
                    
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
