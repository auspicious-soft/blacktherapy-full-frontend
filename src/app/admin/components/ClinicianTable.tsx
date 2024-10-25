"use client";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import EditClinicianModal from "@/app/admin/components/EditClinicianModal";
import AssignTaskModal from "@/app/admin/components/AssignTaskModal";
import { DeleteIcon, EditIcon, ViewIcon } from "@/utils/svgicons";
import deleteCross from "@/assets/images/deleteCross.png"
import Modal from 'react-modal';
import Image from 'next/image';
import ClinicianDetailsPopup from "./ClinicianDetailsPopup";
import { DeleteClinician } from "@/services/admin/admin-service";
import { toast } from "sonner";

interface TableData {
  id: number;
  status: string;
  training: string;
  name: string; 
  contact: string;
  address: string;
  memberSince: string;
  noOfAppointments: number; 
  accountStatus: boolean; 
  status2: string;
}
interface TherapistsDataProps { 
  therapistsData: any;
  setQuery: any;
  error: any;
  isLoading: any;
  mutate: any;
}


const ClinicianTable: React.FC<TherapistsDataProps> = ({therapistsData, setQuery, isLoading, error, mutate} ) => {

  const total = therapistsData?.total ?? 0;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(therapistsData);
  const [cliniciantDetailsPopup, setCliniciantDetailsPopup]= useState(false);
  const [clinicianDetails, setClinicianDetails] = useState<{ id: number; name: string } | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);

  const therapistsDataArray = therapistsData?.data;

  const rowsPerPage = 5;
  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleToggleStatus = (id: number) => {
    // setTableData(
    //   tableData.map((item) =>
    //     item.id === id ? { ...item, accountStatus: !item.accountStatus } : item
    //   )
    // );
  };

    
  const openClinicianPopup = (row: any) => {
    setClinicianDetails(row);
    setCliniciantDetailsPopup(true);
  };

  const closeClinicianPopup = () => {
    setCliniciantDetailsPopup(false);
    setClinicianDetails(null); 
  };

  const openEditModal = (row: any) => {
    setSelectedRow(row);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRow(null);
  };

  const handleDelete = ( id: any) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (id: string) => {
    const route = `/admin/therapists/${id}`; 
    try {
      const response = await DeleteClinician(route); 
      if (response.status === 200) {
        toast.success("Clinician deleted successfully");
      } else {
        toast.error("Failed to delete Clinician");
      }
    } catch (error) {
      console.error("Error deleting Clinician", error);
      toast.error("An error occurred while deleting the Clinician");
    }
    setIsDeleteModalOpen(false);
    mutate()
  };

  const handleDeleteCancel = () => { 
    handleModalClose();
  };
  const openAssignTaskModal = (row: any) => {
    //setTaskId(id);
    setSelectedRow(row);
    setIsAssignTaskModalOpen(true);

    console.log('hiiiiiiiiiiiiiiii');
  };

  const closeAssignTaskModal = () => {
    setIsAssignTaskModalOpen(false);
    setSelectedRow(null);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (selectedRow) {
      const { name, value } = event.target;
      setSelectedRow({ ...selectedRow, [name]: value });
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement form submit logic here
    closeEditModal();
    closeAssignTaskModal();
  };

  return (
    <div>
    <div className="table-common overflo-custom">
      <table className="">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Training</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Member Since</th>
            <th>No of Appointments</th>
            {/* <th>Account Status</th> */}
            <th>Actions</th>
            <th>Assign Task</th>
            <th>Status</th>
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
    ) :therapistsDataArray?.length > 0 ? (
          therapistsDataArray?.map((row: any) => (
            <tr key={row?._id}>
              <td>{row?._id}</td>
              <td> <p className=" inline-block font-gothamMedium text-center leading-[normal] rounded-3xl py-[3px] px-[10px] text-[#26395E] bg-[#CCDDFF] text-[10px] ">
              {row?.status}</p></td>
              <td><p className=" font-gothamMedium text-center leading-[normal] rounded-3xl py-[3px] px-[10px] text-[#A85C03] bg-[#fffdd1] text-[10px] ">
              {row?.training}</p>
              </td>
              <td>{row?.firstName} {row?.lastName} </td>
              <td>{row?.phoneNumber}</td>
              <td>{row?.otherDetailsOfTherapist?.addressLine1} {row?.otherDetailsOfTherapist?.addressLine2}, {row?.otherDetailsOfTherapist?.state}
              </td>
              <td>{row?.createdAt}</td>
              <td>{row?.appointments.length}</td>
              {/* <td>
               <div className="toggle-checkbox relative">
               <input
                  type="checkbox"
                  checked={row.accountStatus}
                  onChange={() => handleToggleStatus(row?._id)}
                  className="absolute opacity-0 z-[1] w-full h-full "
                />
                <span className="indicator ">
                  <span className="dot"></span>
                </span>
               </div>
              </td> */}
              <td>
                <div className="flex gap-2">
                  <button onClick={() => openClinicianPopup(row)}><ViewIcon /> </button>
                <button
                  onClick={() => openEditModal(row)}
                  className=""
                > <EditIcon />
                </button>
                <button
                 onClick={() => handleDelete(row?._id)}
                > <DeleteIcon />
                </button>
                </div>
              </td>
              <td>
                <button
                  onClick={() => openAssignTaskModal(row)}
                  className="font-gothamMedium rounded-3xl py-[2px] px-[10px] text-[#26395E] bg-[#CCDDFF] text-[10px] "
                >
                  Assign Task
                </button>
              </td>
              <td> 
                <select
                  name="status2"
                  value={row.status2}
                  onChange={handleInputChange}
                  className="w-auto border-none h-auto bg-transparent p-0"
                >
                  <option value="Status">Status</option>
                  <option value="Applicant Reviewed">Applicant Reviewed</option>
                  <option value="Interview Pending">Interview Pending</option>
                  <option value="Incomplete Application">
                    Incomplete Application
                  </option>
                  <option value="Doesn't Meet Qualifications">
                    Doesnt Meet Qualifications
                  </option>
                </select>
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
        containerClassName={'inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]'}
        pageClassName={'text-[#26395e] '}  //list item
        pageLinkClassName ={'py-2 px-4 inline-block'} //anchor tag
        activeClassName={'bg-[#26395e] rounded-[5px] text-white'} //active anchor
        previousLinkClassName={'py-2 px-4 inline-block'}
        nextLinkClassName={'py-2 px-4 inline-block'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Delete Clinician"
        className="modal max-w-[584px] mx-auto bg-white rounded-xl w-full p-5 bg-flower"
        overlayClassName="overlay"
      >
          <Image src={deleteCross} alt='delete' height={174} width={174} className="mx-auto" />
        <h2 className="text-[20px] text-center leading-normal mt-[-20px]">Are you sure you want to Delete?</h2>
   <div className="flex items-center justify-center gap-6 mt-8">
   <button 
          type="button"
          onClick={()=> handleDeleteConfirm(deleteId as string)}
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

      {selectedRow && (
        <EditClinicianModal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
         row={selectedRow}
        />
      )}
      {selectedRow && (
        <AssignTaskModal
          isOpen={isAssignTaskModalOpen}
          onRequestClose={closeAssignTaskModal}
         row={selectedRow}
        />
      )}
    {clinicianDetails && (
  <ClinicianDetailsPopup
    isOpen={cliniciantDetailsPopup}
    onRequestClose={closeClinicianPopup}
    row={clinicianDetails}
  />
)}
    </div>
  );
};

export default ClinicianTable;
