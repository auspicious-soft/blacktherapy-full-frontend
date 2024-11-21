"use client"
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

interface BillingData {
  id: string;
  apptDate: string;
  renewalDate: string;
  chatWithClinician: string;
  videoChat: string;
  billingAmount: string;
}

const BillingDetails: React.FC = () => {
  // Dummy data
  const data: BillingData[] = [
    { id: '#123', apptDate: '26 July 2023', renewalDate: '04 Jan 2025', chatWithClinician: 'Yes', videoChat: 'Yes', billingAmount: '$25.00' },
    { id: '#124', apptDate: '26 July 2023', renewalDate: 'Renew Subscription', chatWithClinician: 'Yes', videoChat: 'Yes', billingAmount: '$25.00' },
    { id: '#125', apptDate: '26 July 2023', renewalDate: '04 Jan 2025', chatWithClinician: 'No', videoChat: 'No', billingAmount: '$25.00' },
    { id: '#126', apptDate: '26 July 2023', renewalDate: '04 Jan 2025', chatWithClinician: 'Yes', videoChat: 'Yes', billingAmount: '$25.00' },
    { id: '#127', apptDate: '26 July 2023', renewalDate: 'Renew Subscription', chatWithClinician: 'Yes', videoChat: 'Yes', billingAmount: '$25.00' },
    { id: '#128', apptDate: '26 July 2023', renewalDate: '04 Jan 2025', chatWithClinician: 'No', videoChat: 'No', billingAmount: '$25.00' },

  ];

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 2;

  // Pagination handler
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const paginatedData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <div>
    <div className="table-common overflo-custom">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Renewal Date</th>
            <th>Subscription Type</th>
            <th>Billing Amount</th>
          </tr>
        </thead>
        <tbody>
          {
          paginatedData.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.apptDate}</td>
              <td>{row.apptDate}</td>
              <td>{row.renewalDate}</td>
              <td>{row.chatWithClinician}</td>
              <td>{row.billingAmount}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
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
export default BillingDetails;
