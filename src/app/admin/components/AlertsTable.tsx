"use client";
import { getAlertsData, updateAlerts } from '@/services/admin/admin-service';
import { TickIcon1 } from '@/utils/svgicons';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'sonner';
import useSWR from 'swr';

const AlertsTable = () => {


  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); 
  const filterStr = query ? `read=${query}` : ''
  const { data, error, isLoading, mutate } = useSWR(`/admin/alerts?${filterStr}`, getAlertsData);
  const alertsTable = data?.data?.data;
  const alertsData = alertsTable?.data;

  const total = alertsTable?.total ?? 0;
  const rowsPerPage = 10;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`);
  };

  const handleMarkStatus = async (id: string, readStatus: boolean) => {
    try {
      const status = { read: !readStatus }; 
      const response = await updateAlerts(`/admin/alerts/${id}`, status);
  
      if (response.status === 200) {
        toast.success(`Alert marked as ${!readStatus ? 'read' : 'unread'} successfully`);
        mutate();
      } else {
        toast.error("Failed to update alert status");
      }
    } catch (error) {
      console.error("Error updating alert status:", error);
      toast.error("An error occurred while updating the alert status");
    }
  };
  

  const handlefilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery(e.target.value);

  };

  return (
    <div className='mt-[49px]'>
      <div className='flex items-center justify-between mb-5'>
        <h2 className=''>Alerts</h2>
        <div className='filter-select min-w-[190px]'>
           <select 
            onChange={handlefilters} 
            value={query} 
            className='border border-[#26395E] text-[#26395E] text-sm h-[46px] px-5 bg-transparent p-0'
          >
            <option value="" disabled>Status</option>
            <option value="true">Read</option> 
            <option value="false">Unread</option> 
          </select>
        </div>
      </div>
      <div className='table-common overflo-custom'>
        <table className="">
          <thead className="">
            <tr>
              <th>Client</th>
              <th>Alert Message</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="text-center text-red-500">Error loading data.</td>
              </tr>
            ) : alertsData?.length > 0 ? (
              alertsData.map((row: any) => (
                <tr key={row?._id} className="border-b">
                  <td>{row?.userId?.firstName} {row?.userId?.lastName}</td>
                  <td>{row?.message}</td>
                  <td>
                    <p className={`leading-[normal] px-2.5 py-1 inline-block rounded-[25px] text-[11px] font-semibold  ${row?.read ? "text-[#41A803] bg-[#d6ffcc]" : "text-[#A9A901] bg-[#ffffcc] "} `}>
                    {row?.read ? "Read" : "Unread"}</p>
                  </td>
                  <td>
                    <button
                      onClick={() => handleMarkStatus(row?._id, row?.read)}
                      className={`rounded-[3px] flex items-center gap-[5px] py-1 px-[6px] text-[11px] text-[#fff] ${row?.read ? "bg-[#E1E105] " : "  bg-[#029008]"}`}
                    >
                      <TickIcon1/> {row?.read ? "Mark as unread" : "Mark as read"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className='w-full flex justify-center p-3 items-center'>No data found</td>
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
          pageCount={Math.ceil(total / rowsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]'}
          pageClassName={'text-[#26395e] '}
          pageLinkClassName={'py-2 px-4 inline-block'}
          activeClassName={'bg-[#26395e] rounded-[5px] text-white'}
          previousLinkClassName={'py-2 px-4 inline-block'}
          nextLinkClassName={'py-2 px-4 inline-block'}
          disabledClassName={'opacity-50 cursor-not-allowed'}
        />
      </div>
    </div>
  );
};

export default AlertsTable;
