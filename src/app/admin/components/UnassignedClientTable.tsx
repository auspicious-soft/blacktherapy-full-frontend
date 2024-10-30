import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { ButtonArrow, ViewIcon } from '@/utils/svgicons';
import ClientsAssignmentPopup from './ClientsAssignmentPopup';
import { useRouter } from 'next/navigation';
import ReactLoading from 'react-loading';
import UpdateAssignments from './UpdateAssignments';

export interface TableData {
  id: number;
  client: string;
  assignedClinician: string;
  assignedPeerSupport: string;
  status: string;
  message?: string;
  workshop?: string;
  video?: string;
}
interface UnassignedPageProps {
  appointmentsData: any
  setQuery: any;
  mutate: any;
  isLoading: boolean
}


const UnassignedClientTable: React.FC<UnassignedPageProps> = ({ setQuery, appointmentsData, mutate, isLoading }) => {

  const total = appointmentsData?.total ?? 0;
  const unassignedData = appointmentsData?.data;
  const [currentRow, setCurrentRow] = useState<TableData | null>(null);
  const [formData, setFormData] = useState({
    assignedClinician: '',
    assignedPeerSupport: '',
    message: '',
    workshop: '',
    video: '',
  });
  const [assignmentClientsPopup, setAssignmentClientsPopup] = useState(false);
  const [updateAssignment, setUpdateAssignment] = useState(false);

  const [assignmentDetails, setAssignmentDetails] = useState<{
    id: number;
    client: string;
  } | null>(null);

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
    setAssignmentDetails(null); // Clear the selected client details
  };

  const openModal = (row: any) => {
    setCurrentRow(row);
    setUpdateAssignment(true);
  };




  return (
    <div>
      <div className="table-common overflo-custom">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Assigned Clinician</th>
              <th>Assigned Peer Support</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unassignedData?.length > 0 ? (
              unassignedData?.map((row: any) => (
                <tr key={row._id}>
                  <td>{row._id}</td>
                  <td>{row.clientName}</td>
                  <td>
                    {row.therapistId && row.therapistId.firstName && row.therapistId.lastName
                      ? `${row.therapistId.firstName} ${row.therapistId.lastName}`
                      : "No Clinician Assigned"}
                  </td>
                  <td>
                    {row.peerSupportIds && row.peerSupportIds.length > 0 ? (
                      <span>{row.peerSupportIds[0].id}</span>  // Display only the first error
                    ) : (
                      'No peer supports assigned'
                    )}
                  </td>
                  <td>
                    <button onClick={() => openModal(row)} className="font-gothamMedium rounded-3xl py-[2px] px-[10px] text-[#26395E] bg-[#CCDDFF] text-[10px]">
                      Update Assignment
                    </button>
                  </td>
                  <td>
                    <button onClick={() => openAssignmentsPopup(row)}><ViewIcon /> </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className='w-full flex justify-center p-3 items-center' colSpan={4} >{isLoading ? <ReactLoading type={'spin'} color={'#26395e'} height={'20px'} width={'20px'} /> : <p className='text-center'>No data found</p>}</td>
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
          pageClassName={'text-[#26395e] '}
          pageLinkClassName={'py-2 px-4 inline-block'}
          activeClassName={'bg-[#26395e] rounded-[5px] text-white'}
          previousLinkClassName={'py-2 px-4 inline-block text-[#26395e] border-r border-[#d5dce9]'}
          nextLinkClassName={'py-2 px-4 inline-block text-[#26395e] border-l border-[#d5dce9]'}
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

export default UnassignedClientTable;
