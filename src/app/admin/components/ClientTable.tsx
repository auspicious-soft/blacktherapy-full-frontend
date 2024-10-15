"use client";
import { DeleteIcon, ViewIcon } from '@/utils/svgicons';
import { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import deleteCross from "@/assets/images/deleteCross.png";
import ClientDetailsPopup from './ClientDetailsPopup';

interface TableData {
  id: string;
  status: string;
  clientName: string;
  contact: string;
  memberSince: string;
  assignments: number;
  actionss: string;
  accountStatus: boolean;
  action: boolean;
}

const ClientTable: React.FC = () => {
  const initialData: TableData[] = [
    {
      id: 'F123',
      status: 'Completed',
      clientName: 'Herry',
      contact: '1234567890',
      memberSince: '01 Jan 2020',
      assignments: 5,
      actionss: "Action",
      accountStatus: true,
      action: true,
    },
    {
      id: 'F545',
      status: 'Completed',
      clientName: 'Genny',
      contact: '1234567890',
      memberSince: '01 Jan 2020',
      assignments: 5,
      actionss: "Action",
      accountStatus: true,
      action: true,
    },
    {
      id: 'F55',
      status: 'Completed',
      clientName: 'Genny',
      contact: '1234567890',
      memberSince: '01 Jan 2020',
      assignments: 5,
      actionss: "Action",
      accountStatus: true,
      action: true,
    },
    // Add more data as needed
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<TableData[]>(initialData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TableData | null>(null);
  const [clientDetailsPopup, setClientDetailsPopup]= useState(false);
  const [clientDetails, setClientDetails] = useState<{ id: string; clientName: string } | null>(null);

  const rowsPerPage = 2;

  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };
  
  const openClientPopup = (id: string, clientName: string) => {
    setClientDetails({ id, clientName });
    setClientDetailsPopup(true);
  };

  const closeClientPopup = () => {
    setClientDetailsPopup(false);
    setClientDetails(null); // Clear the selected client details
  };

  const handleToggleStatus = (id: string) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, accountStatus: !item.accountStatus } : item
      )
    );
  };

  const handleEdit = (row: TableData) => {
    setSelectedRow(row);
  };

  const handleDelete = (row: TableData) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setData(data.filter((item) => item.id !== selectedRow?.id));
    handleModalClose();
  };

  const handleDeleteCancel = () => {
    handleModalClose();
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (selectedRow) {
      const { name, value } = event.target;
      setSelectedRow({ ...selectedRow, [name]: value });
    }
  };

  return (
    <div className="">
      <div className='table-common overflo-custom'>
        <table className="">
          <thead className="">
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Client</th>
              <th>Contact</th>
              <th>Member Since</th>
              <th>Assignments</th>
              <th>Actions</th>
              <th>Account Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id} className="border-b">
                <td>{row.id}</td>
                <td>
                  <p className='font-gothamMedium rounded-3xl py-[2px] px-[10px] text-[#5E2626] bg-[#FFCCCC] text-[10px] '>{row.status}</p>
                </td>
                <td>{row.clientName}</td>
                <td>{row.contact}</td>
                <td>{row.memberSince}</td>
                <td>{row.assignments}</td>
                <td>
                  <select
                    name="actionss"
                    value={row.actionss}
                    onChange={handleInputChange}
                    className="w-auto border-none h-auto bg-transparent p-0"
                  >
                    <option value="Applicant Reviewed">Applicant Reviewed</option>
                    <option value="Interview Pending">Interview Pending</option>
                    <option value="Incomplete Application">Incomplete Application</option>
                    <option value="Doesn't Meet Qualifications">Doesn&apos;t Meet Qualifications</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <label className="relative toggle-checkbox">
                    <input
                      type="checkbox"
                      checked={row.accountStatus}
                      onChange={() => handleToggleStatus(row.id)}
                      className="absolute opacity-0 z-[1] w-full h-full "
                    />
                    <span className="indicator">
                      <span className="dot"></span>
                    </span>
                  </label>
                </td>
                <td className="py-2 px-4">
                 <div className='flex gap-2 '>
                 <button onClick={() => openClientPopup(row.id, row.clientName)}> <ViewIcon /> </button>
                  <button
                    onClick={() => handleDelete(row)} >
                    <DeleteIcon />
                  </button>
                 </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right mt-4">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={Math.ceil(data.length / rowsPerPage)}
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
          
    {clientDetails && (
  <ClientDetailsPopup
    isOpen={clientDetailsPopup}
    onRequestClose={closeClientPopup}
    clientId={clientDetails.id}
    clientName={clientDetails.clientName}
  />
)}


      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Delete Item"
        className="modal max-w-[584px] mx-auto bg-white rounded-xl w-full p-5 bg-flower"
        overlayClassName="overlay"
      >
        <Image src={deleteCross} alt='delete' height={174} width={174} className="mx-auto" />
        <h2 className="text-[20px] text-center leading-normal mt-[-20px]">Are you sure you want to Delete?</h2>
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            type="button"
            onClick={handleDeleteConfirm}
            className="py-[10px] px-8 bg-[#CC0000] text-white rounded"
          >
            Yes, Delete
          </button>
          <button
            type="button"
            onClick={handleDeleteCancel}
            className='py-[10px] px-8 bg-[#283C63] text-white rounded'
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ClientTable;
