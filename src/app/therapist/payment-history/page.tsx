"use client"
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import SearchBar from '@/app/therapist/components/SearchBar';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 4;

  const data = [
    { id: '#001', requester: 'Sandra Lew', type: 'Payment', provider: 'Nurse (RN) Assessment', client: 'Bernard Katelyn', dateTime: '21/07/2023, 10:00 PM', notes: 'Yes-Approved & Entered into the System', submissionDate: '21/07/2023', status: 'Approved (QP, OD)', notesStatus: 'No Note' },
    { id: '#002', requester: 'Sandra Lew', type: 'Reimbursement', provider: 'Peer Support Service', client: 'Cooper Talon', dateTime: '21/07/2023, 10:00 PM', notes: 'Yes-Approved & Entered into the System', submissionDate: '21/07/2023', status: 'Reject (Admin)', notesStatus: 'No Note' },
    { id: '#003', requester: 'Sandra Lew', type: 'Payment', provider: 'Nurse (RN) Assessment', client: 'Bernard Katelyn', dateTime: '21/07/2023, 10:00 PM', notes: 'Yes-Approved & Entered into the System', submissionDate: '21/07/2023', status: 'Approved (QP, OD)', notesStatus: 'No Note' },
    { id: '#004', requester: 'Sandra Lew', type: 'Reimbursement', provider: 'Peer Support Service', client: 'Cooper Talon', dateTime: '21/07/2023, 10:00 PM', notes: 'Yes-Approved & Entered into the System', submissionDate: '21/07/2023', status: 'Reject (Admin)', notesStatus: 'No Note' },
    { id: '#005', requester: 'Sandra Lew', type: 'Payment', provider: 'Nurse (RN) Assessment', client: 'Bernard Katelyn', dateTime: '21/07/2023, 10:00 PM', notes: 'Yes-Approved & Entered into the System', submissionDate: '21/07/2023', status: 'Approved (QP, OD)', notesStatus: 'No Note' },
    { id: '#006', requester: 'Sandra Lew', type: 'Reimbursement', provider: 'Peer Support Service', client: 'Cooper Talon', dateTime: '21/07/2023, 10:00 PM', notes: 'Yes-Approved & Entered into the System', submissionDate: '21/07/2023', status: 'Reject (Admin)', notesStatus: 'No Note' },
    // Add more dummy data as needed
  ];

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const filteredData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <div>
      <h1 className=' mb-[20px] md:mb-[50px]'>Payment History</h1>
      <div className='flex justify-end mb-[30px]'>
        <SearchBar />
      </div>
      <div className="table-common overflo-custom">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Requestor&apos;s Name</th>
              <th>Request Type</th>
              <th>Services Provider</th>
              <th>Client Name</th>
              <th>Date & Time</th>
              <th>Progress Notes</th>
              <th>Notes</th>
              <th>Submission Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.requester}</td>
                <td>{item.type}</td>
                <td>{item.provider}</td>
                <td>{item.client}</td>
                <td>{item.dateTime}</td>
                <td>{item.notes}</td>
                <td>{item.notesStatus}</td>
                <td>{item.submissionDate}</td>
                {/* <td className={`py-2 px-4 border ${item.status.startsWith('Approved') ? 'text-green-500' : 'text-red-500'}`}>{item.status}</td> */}
                <td>
                <p className='font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px]  text-[#42A803] bg-[#CBFFB2]'>{item.status}</p> 
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right">
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(data.length / rowsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'inline-flex mt-8 rounded border border-[#d5dce9]'}
        pageClassName={'text-[#26395e] '}
        pageLinkClassName={'py-2 px-4 inline-block'}
        activeClassName={'bg-[#26395e] rounded text-white'}
        previousLinkClassName={'py-2 px-4 inline-block text-[#26395e] '}
        nextLinkClassName={'py-2 px-4 inline-block text-[#26395e] '}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />
      </div>
    </div>
  );
};

export default Page;
