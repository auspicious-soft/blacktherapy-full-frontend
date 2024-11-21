// "use client"
// import React, { useState } from 'react';
// import ReactPaginate from 'react-paginate';

// export interface BillingData {
//   id: string;
//   startDate: string;
//   endDate: string;
//   renewalDate: string;
//   subscriptionType: string;
//   billingAmount: string;
// }
// interface BillingDetailsProps {
//   hasMore: boolean;
//   billingData: BillingData[]
// }

// const BillingDetails = (props: BillingDetailsProps) => {
//   const { hasMore, billingData } = props;

//   const [currentPage, setCurrentPage] = useState(0);
//   const rowsPerPage = 10

//   // Pagination handler
//   const handlePageClick = (selectedItem: { selected: number }) => {
//     setCurrentPage(selectedItem.selected);
//   };

//   const paginatedData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

//   return (
//     <div>
//       <div className="table-common overflo-custom">
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Renewal Date</th>
//               <th>Subscription Type</th>
//               <th>Billing Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {
//               paginatedData.map((row, index) => (
//                 <tr key={index}>
//                   <td>{row.id}</td>
//                   <td>{row.apptDate}</td>
//                   <td>{row.apptDate}</td>
//                   <td>{row.renewalDate}</td>
//                   <td>{row.chatWithClinician}</td>
//                   <td>{row.billingAmount}</td>
//                 </tr>
//               ))
//             }
//           </tbody>
//         </table>
//       </div>
//       <div className="text-right mt-4">
//         <ReactPaginate
//           previousLabel={'<'}
//           nextLabel={'>'}
//           breakLabel={'...'}
//           breakClassName={'break-me'}
//           pageCount={Math.ceil(data.length / rowsPerPage)}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageClick}
//           containerClassName={'inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]'}
//           pageClassName={'text-[#26395e]'}  // list item
//           pageLinkClassName={'py-2 px-4 inline-block'} // anchor tag
//           activeClassName={'bg-[#26395e] rounded-[5px] text-white'} // active anchor
//           previousLinkClassName={'py-2 px-4 inline-block'}
//           nextLinkClassName={'py-2 px-4 inline-block'}
//           disabledClassName={'opacity-50 cursor-not-allowed'}
//         />
//       </div>

//     </div>
//   );
// };
// export default BillingDetails;
