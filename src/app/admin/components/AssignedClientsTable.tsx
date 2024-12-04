import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ClientsAssignmentPopup from "./ClientsAssignmentPopup";
import UpdateAssignments from "./UpdateAssignments";
import ReactLoading from 'react-loading';
export interface TableData {
  id: number;
  client: string;
  assignedClinician: string;
  assignedPeerSupport: string;
  status: string;
  message?: string;
  workshop?: string;
  video?: string;
  dateAssigned?: string;
}

interface AssignedClientsTableProps {
  appointmentsData: any;
  setQuery: any;
  mutate: any;
  isLoading: boolean;
  error: any
}

const AssignedClientsTable: React.FC<AssignedClientsTableProps> = ({ error,appointmentsData, setQuery, mutate, isLoading }) => {
  const total = appointmentsData?.total ?? 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<TableData | null>(null);
  const [assignmentClientsPopup, setAssignmentClientsPopup] = useState(false);
  const [updateAssignment, setUpdateAssignment] = useState(false);
  const [assignmentDetails, setAssignmentDetails] = useState<{
    id: number;
    client: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    assignedClinician: "",
    assignedPeerSupport: "",
    message: "",
    workshop: "",
    video: "",
  });

  const assignedData = appointmentsData?.data;
  const rowsPerPage = 10;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }

  const openAssignmentsPopup = (row: any) => {
    setAssignmentDetails(row);
    setAssignmentClientsPopup(true);
  };

  const closeAssignmentsPopup = () => {
    setAssignmentClientsPopup(false);
    setAssignmentDetails(null);
  };

  const openModal = (row: any) => {
    setCurrentRow(row);
    setUpdateAssignment(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };




  return (
    <div>
      <div className="table-common overflo-custom">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Assigned Clinician</th>
              <th>Assigned Peer Support</th>
              <th>Assigned Date</th> {/* Added column for date */}
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
                <td colSpan={5} className="text-center text-red-500 ">
                  Error loading Clinician data.
                </td>
              </tr>
            ) : assignedData?.length > 0 ? (

              assignedData?.map((row: any) => {
                return (
                  <tr key={row?._id}>
                    <td onClick={() => openAssignmentsPopup(row)} className='hover:underline font-bold cursor-pointer'>{row?.firstName} {row?.lastName}</td>
                    <td>{row?.therapistId?.firstName} {row?.therapistId?.lastName}</td>
                    <td>
                      {row?.peerSupportIds && row?.peerSupportIds.length > 0 ?
                        (
                          row?.peerSupportIds.map((peer: any, index: number) => (
                            peer.error ? (
                              <span key={peer.id}>
                                {peer.error}
                                {index < row?.peerSupportIds.length - 1 ? ', ' : ''}
                              </span>
                            ) : (
                              <span key={peer?.id}>
                                {peer?.firstName} {peer?.lastName}
                                {index < row?.peerSupportIds.length - 1 ? ', ' : ''}
                              </span>
                            )
                          ))
                        ) :
                        (
                          'No peer supports assigned'
                        )}
                    </td>
                    <td>{new Date(row?.updatedAt).toLocaleDateString('en-US')}</td>
                    {/* <td className="">{row.assignedDate ? new Date(row.assignedDate).toLocaleDateString() : 'N/A'}</td> Display date */}
                    <td className="">
                      <button
                        onClick={() => openModal(row)}
                        className="font-gothamMedium rounded-3xl py-[2px] px-[10px] text-[#26395E] bg-[#CCDDFF] text-[10px] "
                      >
                        Update Assignment
                      </button>
                    </td>
                    {/* <td>
                      <button
                        onClick={() => openAssignmentsPopup(row)}><ViewIcon /></button>
                    </td> */}
                  </tr>
                )
              }
            )
            )
              :
              <tr>
                <td className='w-full flex justify-center p-3 items-center' colSpan={4} >{isLoading ? <ReactLoading type={'spin'} color={'#26395e'} height={'20px'} width={'20px'} /> : <p className='text-center'>No data found</p>}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <div className="text-right">
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
          pageClassName={"text-[#26395e] "}
          pageLinkClassName={"py-2 px-4 inline-block"}
          activeClassName={"bg-[#26395e] rounded-[5px] text-white"}
          previousLinkClassName={
            "py-2 px-4 inline-block text-[#26395e] border-r border-[#d5dce9]"
          }
          nextLinkClassName={
            "py-2 px-4 inline-block text-[#26395e] border-l border-[#d5dce9]"
          }
        />
      </div>

      <UpdateAssignments
        isOpen={updateAssignment}
        onRequestClose={() => setUpdateAssignment(false)}
        row={currentRow}
        mutate={mutate}
      />

      {assignmentDetails && (
        <ClientsAssignmentPopup
          isOpen={assignmentClientsPopup}
          onRequestClose={closeAssignmentsPopup}
          row={assignmentDetails}
        />
      )}
    </div>
  );
};

export default AssignedClientsTable;
