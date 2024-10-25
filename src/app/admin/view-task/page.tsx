"use client"
import React, { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import deleteCross from "@/assets/images/deleteCross.png"
import { DeleteIcon } from '@/utils/svgicons';
import SearchBar from '@/app/admin/components/SearchBar';

interface TableData {
  id: number;
  status: 'Pending' | 'Completed';
  from: string;
  to: string;
  title: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  attachment: string;
  note: string;
}

const TableComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<TableData[]>([
    {
      id: 1,
      status: 'Pending',
      from: 'Alice',
      to: 'Bob',
      title: 'Project Proposal',
      dueDate: '2024-08-10',
      priority: 'High',
      attachment: 'View docs',
      note: 'Initial draft',
    },
    {
      id: 2,
      status: 'Completed',
      from: 'Carol',
      to: 'Dave',
      title: 'Design Review',
      dueDate: '2024-08-12',
      priority: 'Medium',
      attachment: 'View docs',
      note: 'Reviewed and approved',
    },
    {
      id: 3,
      status: 'Pending',
      from: 'Eve',
      to: 'Frank',
      title: 'Budget Report',
      dueDate: '2024-08-15',
      priority: 'Low',
      attachment: 'View docs',
      note: 'Awaiting feedback',
    },
    // Add more data for testing pagination
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDeleteId(null);
  };

  const deleteEntry = () => {
    if (deleteId !== null) {
      setData(data.filter((item) => item.id !== deleteId));
      closeModal();
    }
  };

  const rowsPerPage = 2;
  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const getStatusColor = (status: 'Pending' | 'Completed'): string => {
    return status === 'Pending' ? 'text-[#C00] bg-[#FFD9D9]' : 'text-[#42A803] bg-[#CBFFB2]';
  };

  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low'): string => {
    switch (priority) {
      case 'High':
        return 'text-[#C00] bg-[#FFD9D9]';
      case 'Medium':
        return 'text-[#A85C03] bg-[#FFFDD1]';
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
            {currentRows.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <p className={`px-[10px] py-[2px] text-[10px] text-center rounded-3xl ${getStatusColor(item.status)}`}>{item.status}</p>
                </td>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>{item.title}</td>
                <td>{item.dueDate}</td>
                <td>
                  <p className={`px-[10px] py-[2px] text-[10px] text-center rounded-3xl ${getPriorityColor(item.priority)}`}>{item.priority}</p>
                </td>
                <td>
                  <a href="#" onClick={() => alert(`Opening attachment for ${item.title}`)}>{item.attachment}</a>
                </td>
                <td>{item.note}</td>
                <td>
                  <button
                    onClick={() => openModal(item.id)}
                    className=""
                  ><DeleteIcon /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Confirm Deletion"
          className="bg-white w-[90%] max-w-[668px] max-h-[90vh] overflow-auto bg-flower"
          overlayClassName="w-full h-full fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        >
          <Image src={deleteCross} alt='delete' height={174} width={174} className="mx-auto" />
          <h2 className="text-[20px] text-center leading-normal mt-[-20px]">Are you sure you want to Delete?</h2>
          <div className="flex items-center justify-center gap-6 mt-8">
            <button 
              type="button"
              onClick={deleteEntry}
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
          pageCount={Math.ceil(data.length / rowsPerPage)}
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
