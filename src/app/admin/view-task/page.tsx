"use client"
import React, { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import deleteCross from "@/assets/images/deleteCross.png"
import { DeleteIcon } from '@/utils/svgicons';
import SearchBar from '@/app/admin/components/SearchBar';
import { deleteTaskData, getTasksData } from '@/services/admin/admin-service';
import useSWR from 'swr';
import { toast } from 'sonner';


const TableComponent: React.FC = () => {
  const [query, setQuery] = useState('page=1&limit=10&');
  const { data, error, isLoading, mutate } = useSWR(`/admin/therapists/tasks?${query}`, getTasksData);
  const taskData = data?.data?.data;
  const total = data?.data?.total ?? 0;
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const confirmDeleteEntry = async (id: string) => {
    // const route = `/admin/therapists/tasks/${id}`; 
    try {
      const response = await deleteTaskData(`/admin/therapists/tasks/${id}`);
      if (response.status === 200) {
        setIsOpen(false);
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete User");
      }
    } catch (error) {
      console.error("Error deleting User:", error);
      toast.error("An error occurred while deleting the User");
    }

    mutate()
  };

  const rowsPerPage = 10;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }

  const getStatusColor = (status: 'Background Check Pending' | 'Completed'): string => {
    return status === 'Background Check Pending' ? 'text-[#A85C03] bg-[#FFFDD1]' : 'text-[#42A803] bg-[#CBFFB2]';
  };

  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low'): string => {
    switch (priority) {
      case 'High':
        return 'text-[#A85C03] bg-[#FFFDD1]';
      case 'Medium':
        return 'text-[#C00] bg-[#FFD9D9]';
      case 'Low':
        return 'text-[#42A803] bg-[#CBFFB2]';
      default:
        return '';
    }
  };

  return (
    <div>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        All Tasks
      </h1>
      <div className='flex justify-end mb-5'>
        <SearchBar setQuery={setQuery} />
      </div>
      <div className='table-common overflo-custom'>
        <table className="">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>From</th>
              <th>To</th>
              <th>Title</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Attachment</th>
              <th>Note</th>
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
            ) : taskData?.length > 0 ? (
              taskData?.map((row: any) => (
                <tr key={row?._id}>
                  <td>{row?._id}</td>
                  <td>
                    <p className={`px-[10px] py-[2px] text-[10px] text-center rounded-3xl ${getStatusColor(row?.status)}`}>{row?.status}</p>
                  </td>
                  <td>Admin</td>
                  <td>{row?.therapistId?.firstName} {row?.therapistId?.lastName}</td>
                  <td>{row?.title}</td>
                  <td>{new Date(row?.dueDate).toLocaleDateString('en-US')}</td>
                  <td>
                    <p className={`px-[10px] py-[2px] text-[10px] text-center rounded-3xl ${getPriorityColor(row?.priority)}`}>{row?.priority}</p>
                  </td>
                  <td>
                    <a href="#" onClick={() => alert(`Opening attachment for ${row?.title}`)}>{row?.attachment}</a>
                  </td>
                  <td>{row?.note}</td>
                  <td>
                    <button
                      onClick={() => openModal(row?._id)}
                      className=""
                    ><DeleteIcon /></button>
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

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Confirm Deletion"
          className="modal max-w-[584px] mx-auto bg-white rounded-xl w-full p-5 bg-flower"
          overlayClassName="overlay"
        >
          <Image src={deleteCross} alt='delete' height={174} width={174} className="mx-auto" />
          <h2 className="text-[20px] text-center leading-normal mt-[-20px]">Are you sure you want to Delete?</h2>
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              type="button"
              onClick={() => confirmDeleteEntry(deleteId as string)}
              className="py-[10px] px-8 bg-[#CC0000] text-white rounded"
            >
              Yes, Delete
            </button>
            <button
              type="button"
              onClick={closeModal}
              className='py-[10px] px-8 bg-[#283C63] text-white rounded'
            >
              No
            </button>
          </div>
        </Modal>
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

export default TableComponent;
function setIsDeleteModalOpen(arg0: boolean) {
  throw new Error('Function not implemented.');
}

