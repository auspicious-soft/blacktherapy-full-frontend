"use client";
import { DeleteIcon, ViewIcon } from '@/utils/svgicons';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import deleteCross from "@/assets/images/deleteCross.png";
import ClientDetailsPopup from './ClientDetailsPopup';
import { deleteClientData } from '@/services/admin/admin-service';
import { toast } from 'sonner';

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
interface ClientsDataProps { 
  clientsData: any;
  setQuery: any;
  error: any;
  isLoading: any;
  mutate: any;
}
const ClientTable: React.FC<ClientsDataProps> = ({ clientsData, setQuery, error, isLoading, mutate }) => {
  const total = clientsData?.total ?? 0;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(clientsData);
  const [clientDetailsPopup, setClientDetailsPopup] = useState(false);
  const [clientDetails, setClientDetails] = useState<{ id: string; clientName: string } | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const ClientsArray = clientsData?.data;

  const rowsPerPage = 10;
  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }
  
  
  const openClientPopup = (row:any) => {
    setClientDetails(row);
    setClientDetailsPopup(true);
  };

  const closeClientPopup = () => {
    setClientDetailsPopup(false);
    setClientDetails(null); 
  };
  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
  };


  const handleToggleStatus = (id: string) => {
    const updatedClientsArray = ClientsArray.map((item: any) =>
      item._id === id ? { ...item, status: !item.status } : item
    );
    
  };

  const handleEdit = (row: TableData  ) => {
    setSelectedRow(row);
  };

  const handleDelete = (id: any) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };


  const handleDeleteConfirm = async (id: string) => {
    try {
      const response = await deleteClientData(`/admin/clients/${id}`); 
      if (response.status === 200) {
        toast.success("Client deleted successfully");
        setIsDeleteModalOpen(false);
      } else {
        toast.error("Failed to delete Client");
      }
    } catch (error) {
      console.error("Error deleting Client", error);
      toast.error("An error occurred while deleting the Client");
    }
    mutate()
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
              <th>Action</th>
              {/* <th>Account Status</th> */}
              <th>Actions</th>
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
        <td colSpan={5} className="text-center text-red-500">
          Error loading payments data.
        </td>
      </tr>
    ) :ClientsArray?.length > 0 ? (
          ClientsArray?.map((row: any) => (
              <tr key={row?._id} className="border-b">
                <td>{row?._id}</td>
                <td>
                <p className={`font-gothamMedium rounded-3xl py-[2px] px-[10px] text-[10px] text-center 
        ${row?.isOnline ? 'text-[#155724] bg-[#D4EDDA]' : 'text-[#5E2626] bg-[#FFCCCC]'}`}>
        {row?.isOnline ? 'Completed' : 'Intake Pending'}
            </p>
                </td>
                <td>{row?.firstName} {row?.lastName}</td>
                <td>{row?.phoneNumber}</td>
                <td>{row?.createdAt}</td>
                <td>{row?.appointments.length}</td>
                <td>
                  <select
                    name="actionss"
                    value={row?.status}
                    onChange={handleInputChange}
                    className="w-auto border-none h-auto bg-transparent p-0"
                  >
                    <option value="Active Client">Active Client</option>
                    <option value="Pending">Pending</option>
                    <option value="Callback Pending">Callback Pending</option>
                    <option value="Insurance Verified">Insurence Verified</option>
                    <option value="Pending Clinical Review">Pending Clinical Review</option>
                    <option value="Waiting Assignment">Waiting Assignment</option>
                    <option value="Assessment Pending">Assessment Pending</option>
                    <option value="Assessment Scheduled">Assessment Scheduled</option>
                    <option value="Insurance Hold">Insurance Hold</option>
                    <option value="Ineligible Due to insurance">Ineligible Due to insurance</option>
                    <option value="Alert -SEE NOTES">Alert -SEE NOTES</option>
                    <option value="Alert - Past Due Balance/Collection">Alert - Past Due Balance/Collection</option>
                    <option value="Unresponsive - Week 1">Unresponsive - Week 1</option>
                    <option value="Unresponsive - Week 2">Unresponsive - Week 2</option>
                    <option value="Unresponsive - Week 3">Unresponsive - Week 3</option>
                    <option value="Unresponsive - Week 4">Unresponsive - Week 4</option>
                    <option value="No Contact Sent">No Contact Sent</option>
                    <option value="Inactive - Discharged">Inactive - Discharged</option>
                    <option value="Inactive - Unresponsive">Inactive - Unresponsive</option>
                    <option value="Inactive - Bad Lead">Inactive - Bad Lead</option>
                    <option value="Inactive - Referred Out">Inactive - Referred Out</option>
                    <option value="Inactive - Not Interested">Inactive - Not Interested</option>
                    <option value="Intake Pending">Intake Pending</option>
                    <option value="Intake Complete">Intake Complete</option>
                  </select>
                </td>
                {/* <td className="py-2 px-4">
                  <label className="relative toggle-checkbox">
                    <input 
                      type="checkbox"
                      checked={row?.status}
                      onChange={() => handleToggleStatus(row?._id)}
                      className="absolute opacity-0 z-[1] w-full h-full "
                    />
                    <span className="indicator">
                      <span className="dot"></span>
                    </span>
                  </label>
                </td> */}
                <td className="py-2 px-4">
                 <div className='flex gap-2 '>
                 <button onClick={() => openClientPopup(row)}> <ViewIcon /> </button>
                  <button
                    onClick={() => handleDelete(row?._id)} >
                    <DeleteIcon />
                  </button>
                 </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='w-full flex justify-center p-3 items-center' colSpan={5} >No data found</td>
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
          
    {clientDetails && ( 
  <ClientDetailsPopup
    isOpen={clientDetailsPopup}
    onRequestClose={closeClientPopup}
    row={clientDetails}
  /> 
)}

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
            onClick={()=>handleDeleteConfirm(deleteId as string) }
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
