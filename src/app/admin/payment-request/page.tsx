"use client";
import { ButtonArrow } from "@/utils/svgicons";
import React, { useState } from "react";
import Modal from "react-modal";


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
  note?: string; // For rejected payments
}

const Page: React.FC = () => {
  const initialData: PaymentData[] = [
    {
      id: "123",
      therapistName: "Sarah Lee",
      requestType: "Payment",
      serviceProvider: "Psychotherapy (Individual)",
      clientName: "Sandra's Notice",
      serviceDate: "26 July 2023",
      durationHours: 1,
      paymentStatus: "Pending",
      submissionDate: "26 July 2023",
    },
    {
        id: "125",
        therapistName: "Sarah Lee",
        requestType: "Payment",
        serviceProvider: "Psychotherapy (Individual)",
        clientName: "Sandra's Notice",
        serviceDate: "26 July 2023",
        durationHours: 1,
        paymentStatus: "Pending",
        submissionDate: "26 July 2023",
      },
    {
      id: "3433",
      therapistName: "Sarah Lee",
      requestType: "Payment",
      serviceProvider: "Psychotherapy (Individual)",
      clientName: "Sandra's Notice",
      serviceDate: "26 July 2023",
      durationHours: 1,
      paymentStatus: "Approved",
      submissionDate: "26 July 2023",
    },
    {
      id: "124",
      therapistName: "Sarah Lee",
      requestType: "Payment",
      serviceProvider: "Psychotherapy (Individual)",
      clientName: "Sandra's Notice",
      serviceDate: "26 July 2023",
      durationHours: 1,
      paymentStatus: "Rejected",
      submissionDate: "26 July 2023",
      note: "Insufficient documentation",
    },
  ];

  const [activeTab, setActiveTab] = useState("pending");
  const [pendingPayments, setPendingPayments] = useState<PaymentData[]>(
    initialData.filter((p) => p.paymentStatus === "Pending")
  );
  const [approvedPayments, setApprovedPayments] = useState<PaymentData[]>(
    initialData.filter((p) => p.paymentStatus === "Approved")
  );
  const [rejectedPayments, setRejectedPayments] = useState<PaymentData[]>(
    initialData.filter((p) => p.paymentStatus === "Rejected")
  );
  const [selectedPayment, setSelectedPayment] = useState<PaymentData | null>(
    null
  );
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


  const handleApprove = (payment: PaymentData) => {
    setSelectedPayment(payment);
    setShowApproveModal(true);
  };

  const handleReject = (payment: PaymentData) => {
    setSelectedPayment(payment);
    setShowRejectModal(true);
  };

  const approvePayment = () => {
    if (selectedPayment) {
      setApprovedPayments([
        ...approvedPayments,
        { ...selectedPayment, ...approveDetails, paymentStatus: "Approved" },
      ]);
      setPendingPayments(
        pendingPayments.filter((p) => p.id !== selectedPayment.id)
      );
      setRejectedPayments(
        rejectedPayments.filter((p) => p.id !== selectedPayment.id)
      );
      setShowApproveModal(false);
      setSelectedPayment(null);
      setApproveDetails({    note: "",
        status: "",
        amount: "",
        date: "",
        time: "",
        paymentmethod: "",
        details: "", });
    }
  };

  const rejectPayment = () => {
    if (selectedPayment) {
      setRejectedPayments([
        ...rejectedPayments,
        { ...selectedPayment, note: rejectNote, paymentStatus: "Rejected" },
      ]);
      setPendingPayments(
        pendingPayments.filter((p) => p.id !== selectedPayment.id)
      );
      setShowRejectModal(false);
      setSelectedPayment(null);
      setRejectNote("");
    }
  };

  const reApprovePayment = (payment: PaymentData) => {
    setApprovedPayments([...approvedPayments, { ...payment, paymentStatus: "Approved" }]);
    setRejectedPayments(rejectedPayments.filter((p) => p.id !== payment.id));
  };

  const renderTableRows = (payments: PaymentData[]) => {
    return payments.map((payment) => (
      <tr key={payment.id}>
        <td>{payment.id}</td>
        <td>{payment.therapistName}</td>
        <td>{payment.requestType}</td>
        <td>{payment.serviceProvider}</td>
        <td>{payment.clientName}</td>
        <td>{payment.serviceDate}</td>
        <td>{payment.durationHours}</td>
        <td className="text-center">
        <p
          className={
            payment.paymentStatus === "Pending"
              ? "pending  inline-block font-gothamMedium rounded-3xl py-[2px] px-[10px] text-[#42A803] bg-[#CBFFB2] text-[10px] "
              : payment.paymentStatus === "Approved"
              ? "approved  inline-block font-gothamMedium rounded-3xl py-[2px] px-[10px] text-[#A85C03] bg-[#FFFDD1] text-[10px] "
              : "rejected  inline-block font-gothamMedium rounded-3xl py-[2px] px-[10px] text-[#C00] bg-[#FFD9D9] text-[10px] "
          }
        >
          {payment.paymentStatus}
        </p>
      </td>
        
        <td>{payment.submissionDate}</td>
        {activeTab === "rejected" && (
          <td>{payment.note} </td>
        )}
        {activeTab === "pending" && (
          <td>
            <select
            className="w-auto border-none h-auto bg-transparent p-0"
              onChange={(e) =>
                e.target.value === "Approve"
                  ? handleApprove(payment)
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
            <button onClick={() => reApprovePayment(payment)}>Re-Approve</button>
          </td>
        )}
      </tr>
    ));
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
            {activeTab === "pending" && renderTableRows(pendingPayments)}
            {activeTab === "approved" && renderTableRows(approvedPayments)}
            {activeTab === "rejected" && renderTableRows(rejectedPayments)}
          </tbody>
        </table>
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
            onClick={rejectPayment}
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
