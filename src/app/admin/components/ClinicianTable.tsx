"use client";
import React, { useState, useTransition } from "react";
import ReactPaginate from "react-paginate";
import EditClinicianModal from "@/app/admin/components/EditClinicianModal";
import AssignTaskModal from "@/app/admin/components/AssignTaskModal";
import { DeleteIcon, EditIcon, ViewIcon } from "@/utils/svgicons";
import deleteCross from "@/assets/images/deleteCross.png";
import Modal from "react-modal";
import Image from "next/image";
import ClinicianDetailsPopup from "./ClinicianDetailsPopup";
import { DeleteClinician, GetEmployeeRecordsData, UpdateTherapistData, } from "@/services/admin/admin-service";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Tooltip } from 'react-tippy';



interface TherapistsDataProps {
  therapistsData: any;
  setQuery: any;
  error: any;
  isLoading: any;
  mutate: any;
}

const ClinicianTable: React.FC<TherapistsDataProps> = ({
  therapistsData,
  setQuery,
  isLoading,
  error,
  mutate,
}) => {
  const total = therapistsData?.total ?? 0;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(therapistsData);
  const [cliniciantDetailsPopup, setCliniciantDetailsPopup] = useState(false);
  const [clinicianDetails, setClinicianDetails] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<any>(null);
  const therapistsDataArray = therapistsData?.data;

  const rowsPerPage = 10;
  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`);
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
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

  const handleDelete = (id: any) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (id: string) => {
    const route = `/admin/therapists/${id}`;
    try {
      const response = await DeleteClinician(route);
      if (response.status === 200) {
        toast.success("Clinician deleted successfully");
        mutate();
      } else {
        toast.error("Failed to delete Clinician");
      }
    } catch (error) {
      console.error("Error deleting Clinician", error);
      toast.error("An error occurred while deleting the Clinician");
    }
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    handleModalClose();
  };
  const openAssignTaskModal = (row: any) => {
    setSelectedRow(row);
    setIsAssignTaskModalOpen(true);
  };

  const closeAssignTaskModal = () => {
    setIsAssignTaskModalOpen(false);
    setSelectedRow(null);
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

      startTransition(() => {
        const updatedRow = {
          ...therapistsDataArray.find((client: any) => client._id === id),
          [name]: value,
        };
        setSelectedRow(updatedRow);
      });
      (async () => {
        try {
          const response = await UpdateTherapistData(
            `/admin/therapists/${id}`,
            actionData
          );
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

  const fetchPositionData = async (id: string) => {
    try {
      const response = await GetEmployeeRecordsData(`/admin/therapists/employee-records/${id}`);
      if (response.status === 200) {
        const position = response?.data?.data[0].position;
        setTooltipContent(position);
      } else {
        setTooltipContent("Position data unavailable");
      }
    } catch (error) {
      console.error("Error fetching position data", error);
      setTooltipContent("Error loading data");
    }
  }
  return (
    <div>
      <div className="table-common overflo-custom">
        <table className="">
          <thead>
            <tr>
              <th title={(tooltipContent && tooltipContent as string) ?? ''}>Name</th>
              <th>Status</th>
              <th>Training</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Member Since</th>
              <th>No of Appointments</th>
              <th>Actions</th>
              <th>Assign Task</th>
              <th>Action Status</th>
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
            ) : therapistsDataArray?.length > 0 ? (
              therapistsDataArray?.map((row: any) => (
                <tr key={row?._id}>
                  <td onClick={() => openClinicianPopup(row)} className="hover:underline hover:font-bold relative"
                    data-tip
                    title={(tooltipContent && tooltipContent as string) ?? ''}
                    data-for={`tooltip-${row?._id}`}
                    onMouseEnter={() => {
                      setHoveredRow(row._id)
                      fetchPositionData(row?._id)
                    }}
                    onMouseLeave={() => {
                      setHoveredRow(null)
                      setTooltipContent(null)
                    }}
                  >
                    <p className={`cursor-pointer`}
                    >{row?.firstName} {row?.lastName}</p>
                    {(tooltipContent && tooltipContent as string) && (
                      <Tooltip
                        title="Welcome to React"
                        position="bottom"
                        trigger="focus"
                      >
                        {/* <p>
                          Click here to show popup
                        </p> */}
                      </Tooltip>
                    )}

                  </td>


                  <td>
                    <p className=" inline-block font-gothamMedium text-center leading-[normal] rounded-3xl py-[3px] px-[10px] text-[#26395E] bg-[#CCDDFF] text-[10px] ">
                      {row?.otherDetailsOfTherapist?.status ??
                        "Background Check Pending"}
                    </p>
                  </td>
                  <td>
                    <p className=" font-gothamMedium text-center leading-[normal] rounded-3xl py-[3px] px-[10px] text-[#A85C03] bg-[#fffdd1] text-[10px] ">
                      {row?.training}
                    </p>
                  </td>



                  <td>{row?.phoneNumber}</td>
                  <td>
                    {row?.otherDetailsOfTherapist?.addressLine1}
                    {row?.otherDetailsOfTherapist?.addressLine2},
                    {row?.otherDetailsOfTherapist?.state}
                  </td>
                  <td>{new Date(row?.createdAt).toLocaleDateString('en-US')}</td>
                  <td>{row?.appointments.length}</td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(row)} className="">
                        {" "}
                        <EditIcon />
                      </button>
                      <button
                        disabled={(session as any)?.user?.role !== "admin"}
                        onClick={() => handleDelete(row?._id)}
                      >
                        {" "}
                        <DeleteIcon />
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
                      name="status"
                      value={row?.otherDetailsOfTherapist?.status}
                      onChange={(event) => handleInputChange(event, row?._id)}
                      className="w-auto border-none h-auto bg-transparent p-0"
                    >
                      <option value="Applicant Reviewed">
                        Applicant Reviewed
                      </option>
                      <option value="Interview Pending">
                        Interview Pending
                      </option>
                      <option value="Incomplete Application">
                        Incomplete Application
                      </option>
                      <option value="Doesn't Meet Qualifications">
                        {" "}
                        Doesnt Meet Qualifications
                      </option>
                      <option value="Withdrawn">Withdrawn</option>
                      <option value="Follow-Up">Follow-Up</option>
                      <option value="Offer Sent">Offer Sent</option>
                      <option value="Offer Accepted">Offer Accepted</option>
                      <option value="Background Check Pending">
                        Background Check Pending
                      </option>
                      <option value="Credentialing Pending">
                        Credentialing Pending
                      </option>
                      <option value="Active">Active</option>
                      <option value="Terminated">Terminated</option>
                      <option value="Leave of Absence">Leave of Absence</option>
                      <option value="Vacation">Vacation</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Pending Termination">
                        Pending Termination
                      </option>
                      <option value="Probationary">Probationary</option>
                      <option value="Welcome Letter">Welcome Letter</option>
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
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Delete Clinician"
        className="rounded-lg w-full max-w-4xl mx-auto bg-white shadow-lg max-h-[90vh] overflow-auto"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <Image
          src={deleteCross}
          alt="delete"
          height={174}
          width={174}
          className="mx-auto"
        />
        <h2 className="text-[20px] text-center leading-normal mt-[-20px]">
          Are you sure you want to Delete?
        </h2>
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            type="button"
            onClick={() => handleDeleteConfirm(deleteId as string)}
            className="py-[10px] px-8 bg-[#CC0000] text-white rounded"
          >
            Yes, Delete
          </button>
          <button
            type="button"
            onClick={handleDeleteCancel}
            className="py-[10px] px-8 bg-[#283C63] text-white rounded"
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
          mutate={mutate}
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
