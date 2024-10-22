"use client";
import { GetPaymentsData } from "@/services/admin/admin-service";
import { ButtonArrow } from "@/utils/svgicons";
import React, { useState } from "react";
import Modal from "react-modal";
import useSWR from "swr";
import ReactPaginate from 'react-paginate';
import { useRouter } from "next/navigation";

interface PaymentData {
  id: string;
  therapistName: string;
  requestType: string;
  serviceProvider: string; 
  clientName: string;
  serviceDate: string;
  durationHours: number;
  paymentStatus: string;
  submissionDate: string;
  note?: string; 
}

const Page: React.FC = () => { 
  
  const [activeTab, setActiveTab] = useState("pending");
  const [query, setQuery] = useState('')
  const {data , error, isLoading} =  useSWR(`/admin/payment-requests?status=${activeTab === 'pending' ? 'pending' : activeTab === 'approved' ? 'approved' : 'rejected'}&${query}`, GetPaymentsData)
  const router = useRouter();
  const paymentsData = data?.data?.data;
  const total = data?.data?.total ?? 0;

  const [selectedPaymentID, setSelectedPaymentID] = useState<string | null>(null);

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [approveDetails, setApproveDetails] = useState({
    note: "",
    status: "",
    amount: "",
    date: "",
    time: "",
    paymentmethod: "",
    details: "",

  });
  const [rejectNote, setRejectNote] = useState("");

  const rowsPerPage = 10;

  const handlePageClick = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected + 1; 
    setQuery(`page=${selectedPage}&limit=${rowsPerPage}`);
  };
  
  const handleApprove = (payment: any) => {
    setSelectedPaymentID(payment);
    setShowApproveModal(true);
  };

  const handleReject = (id: string) => {
    console.log('id:', id);
    setSelectedPaymentID(id);
    setShowRejectModal(true);
  };

  const approvePayment = () => {
    // if (selectedPayment) {
    //   const updatedPayments = paymentsData.map((p: any) =>
    //     p.id === selectedPayment.id
    //       ? { ...selectedPayment, ...approveDetails, paymentStatus: "approved" }
    //       : p
    //   );
    //   setShowApproveModal(false);
    //   setSelectedPayment(null);
    // }

    console.log("hghgh");
  };


  const rejectPayment = (id: string) => {
    // if (selectedPayment) {
    //   const updatedPayments = paymentsData.map((p: any) =>
    //     p.id === selectedPayment.id
    //       ? { ...selectedPayment, note: rejectNote, paymentStatus: "rejected" }
    //       : p
    //   );
    //   setShowRejectModal(false);
    //   setSelectedPayment(null);
    // }

    console.log("llll");
  };

  return (
    <div>
        <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Payment Requests
      </h1>
      <div className=" grid gap-3 md:gap-0 md:flex md:space-x-5 mb-4">
        <button
          className={`h-[46px] py-3 px-4 text-sm rounded-[5px] border border-[#283c63] ${activeTab === 'pending' ? 'active bg-[#283c63] !text-white' : ''} text-[#26395e]`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Payments
        </button>
        <button
          className={`h-[46px] py-3 px-4 text-sm rounded-[5px] border border-[#283c63] ${activeTab === 'approved' ? 'active bg-[#283c63] !text-white' : ''} text-[#26395e]`}
          onClick={() => setActiveTab("approved")}
        >
          Approved Payments
        </button>
        <button
          className={`h-[46px] py-3 px-4 text-sm rounded-[5px] border border-[#283c63] ${activeTab === 'rejected' ? 'active bg-[#283c63] !text-white' : ''} text-[#26395e]`}
          onClick={() => setActiveTab("rejected")}
        >
          Rejected Payments
        </button>
      </div>
      <div className="table-common overflo-custom">
        <table className="">
          <thead>
            <tr>
              <th>ID</th>
              <th>Therapist Name</th>
              <th>Request Type</th>
              <th>Service Provider </th>
              <th>Client Name</th>
              <th>Service Date</th>
              <th>Duration Hours</th>
              <th>Payment Status</th>
              <th>Submission Date</th>
              {activeTab === "rejected" && <th>Note</th>}
              {(activeTab === "pending" || activeTab === "rejected") && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
          {isLoading ? (
      <tr>
        <td colSpan={activeTab === 'rejected' ? 11 : 10} className="">
          Loading... 
        </td>
      </tr>
    ) : error ? (
      <tr>
        <td colSpan={activeTab === 'rejected' ? 11 : 10} className="text-center text-red-500">
          Error loading payments data.
        </td>
      </tr>
    ) :paymentsData?.length > 0 ? (
            paymentsData?.map((payment: any) => (
              <tr key={payment?._id}>
                <td>{payment?._id}</td>
                <td>{payment?.therapistId?.firstName} {payment?.therapistId?.lastName}</td>
                <td>{payment?.requestType}</td>
                <td>{payment?.servicesProvided}</td>
                <td>{payment?.clientId?.firstName} {payment?.clientId?.lastName}</td>
                <td>{payment?.serviceDate}</td>
                <td>{payment?.duration}</td>
                <td className="text-center">
                  <p
                    className={
                      payment?.status === "pending"
                        ? "bg-[#CBFFB2] text-[#42A803] rounded-3xl py-[2px] px-[10px] text-[10px]"
                        : payment?.status === "approved"
                        ? "bg-[#FFFDD1] text-[#A85C03] rounded-3xl py-[2px] px-[10px] text-[10px]"
                        : "bg-[#FFD9D9] text-[#C00] rounded-3xl py-[2px] px-[10px] text-[10px]"
                    }
                  >
                    {payment?.status}
                  </p>
                </td>
                <td>{payment?.createdAt}</td>
                {activeTab === "rejected" && <td>{payment?.rejectNote}</td>}
                {activeTab === "pending" && (
                  <td>
                    <select
                      className="border-none bg-transparent p-0 h-auto"
                      onChange={(e) =>
                        e.target.value === "Approve"
                          ? handleApprove(payment?._id)
                          : handleReject(payment)
                      }
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Action
                      </option>
                      <option value="Approve">Approve</option>
                      <option value="Reject">Reject</option>
                    </select>
                  </td>
                )}
                {activeTab === "rejected" && (
                  <td>
                    <button onClick={() => handleApprove(payment)}>
                      Re-Approve
                    </button>
                  </td>
                )}
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

      {/* Approve Modal */}
      <Modal
        isOpen={showApproveModal}
        onRequestClose={() => setShowApproveModal(false)}
        contentLabel="Approve Payment"
        className="bg-white w-[90%] max-w-[668px] max-h-[90vh] overflow-scroll overflo-custom   "
        overlayClassName="w-full h-full fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <div className="">
          <h2 className="text-white bg-[#283C63] py-8 font-gothamMedium px-[50px]  ">Approve Payment #123</h2>
         <div className="py-[40px] px-[60px] ">
         <div className="mb-4">
            <label className="block mb-2">Progress Note/Assessment Submitted & Approved?</label>
            <input
              type="text"
              value={approveDetails.note}
              onChange={(e) =>
                setApproveDetails({ ...approveDetails, note: e.target.value })}  />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Status Of Payment Request</label>
            <input
              type="text"
              value={approveDetails.status}
              onChange={(e) =>
                setApproveDetails({ ...approveDetails, status: e.target.value })}  />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Payout Amount</label>
            <input
              type="number"
              value={approveDetails.amount}
              onChange={(e) =>
                setApproveDetails({ ...approveDetails, amount: e.target.value })}  />
          </div>
         <div className="mb-4">
            <label className="block mb-2">Date</label>
            <input
              type="date"
              value={approveDetails.date}
              onChange={(e) =>
                setApproveDetails({ ...approveDetails, date: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Time</label>
            <input
              type="time"
              value={approveDetails.time}
              onChange={(e) =>
                setApproveDetails({ ...approveDetails, time: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Payout Method</label>
            <input
              type="text"
              value={approveDetails.paymentmethod}
              onChange={(e) =>
                setApproveDetails({ ...approveDetails, paymentmethod: e.target.value })}  />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Details about Payment</label>
            <input
              type="text"
              value={approveDetails.details}
              onChange={(e) =>
                setApproveDetails({ ...approveDetails, details: e.target.value })}  />
          </div>
          <div className="flex gap-5 justify-end">
          <button
            onClick={() => setShowApproveModal(false)}
            className="button"
          >Close </button>
          <button
            onClick={approvePayment}
            className="button"
          > Approve <ButtonArrow /> </button>
          </div>
         </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onRequestClose={() => setShowRejectModal(false)}
        contentLabel="Reject Payment"
        className="bg-white w-[90%] max-w-[668px] max-h-[90vh] overflow-scroll overflo-custom   "
        overlayClassName="w-full h-full fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <div className="">
        <h2 className="text-white bg-[#283C63] py-8 font-gothamMedium px-[50px]  ">Reject Note</h2>
          <div className="py-[40px] px-[60px] ">
          <div className="mb-4">
            <label className="block mb-2 text-[#707070]">Note</label>
            <textarea
              rows={4}
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
         <div className="flex gap-5 justify-end mt-[40px]">
         <button
            onClick={() => setShowRejectModal(false)}
            className="button"
          >
            Close
          </button>
          <button
            onClick={()=> rejectPayment(selectedPaymentID as string)}
            className="button"
          > Submit <ButtonArrow/>
          </button>
         </div>
      
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
