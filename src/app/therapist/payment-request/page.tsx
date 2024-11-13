"use client";
import React, { startTransition, useState } from "react";
import { ButtonArrow } from "@/utils/svgicons";
import Image from 'next/image';
import success from "@/assets/images/succes.png";
import { addPaymentsData } from "@/services/therapist/therapist-service.";
import { toast } from "sonner";

const Page = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    requesterName: "",
    email: "",
    requestType: "",
    servicesProvided: "",
    clientName: "",
    serviceDate: "",
    serviceTime: "",
    duration: "",
    progressNotes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      startTransition(async () => {
        try {
          const response = await addPaymentsData('/therapist/payment-requests', formData);
          if (response?.status === 201) {
            setNotification("Payment Request Submitted");
            setFormData({
              requesterName: "",
              email: "",
              requestType: "",
              servicesProvided: "",
              clientName: "",
              serviceDate: "",
              serviceTime: "",
              duration: "",
              progressNotes: "",
            });
          } else {
            toast.error("Failed to add wellness entry");
          }
        } catch (error) {
          console.error("Error adding wellness entry:", error);
          toast.error("An error occurred while adding the wellness entry");
        }
      });
    };

  return (
    <>
      <h1 className="mb-[20px] md:mb-[50px]">Payment Requests</h1>
      <div className="bg-white rounded-[10px] w-full md:p-[40px] p-5">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-[30px]">
            <div>
              <label className="block mb-2">Requester&apos;s Name</label>
              <input
                type="text"
                name="requesterName"
                placeholder="John"
                value={formData.requesterName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="loremipsum@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Request Type</label>
              <input
                type="text"
                name="requestType"
                placeholder="Request Type"
                value={formData.requestType}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Services Provided</label>
              <input
                type="text"
                name="servicesProvided"
                placeholder="Services Provided"
                value={formData.servicesProvided}
                onChange={handleInputChange}
              />
             
            </div>
            <div>
              <label className="block mb-2">Client Name</label>
              <input
                type="text"
                name="clientName"
                placeholder="Client Name"
                value={formData.clientName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Date of Services Provided</label>
              <input
                type="date"
                name="serviceDate"
                value={formData.serviceDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-[30px] mt-[30px]">
            <div className="md:w-[calc(20%-15px)] w-[calc(50%-15px)]">
              <label className="block mb-2">Time of Services Provided</label>
              <input
                type="time"
                name="serviceTime"
                value={formData.serviceTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="md:w-[calc(20%-15px)] w-[calc(50%-15px)]">
              <label className="block mb-2">Duration (Hours)</label>
              <input
                type="text"
                name="duration"
                placeholder="e.g., 2 hours"
                value={formData.duration}
                onChange={handleInputChange}
              />
            </div>
            <div className="md:w-[calc(60%-30px)] w-full">
              <label className="block mb-2">Progress Notes and/or Assessments Submitted & Approved?</label>
              <input
                type="text"
                name="progressNotes"
                placeholder="Progress Notes"
                value={formData.progressNotes}
                onChange={handleInputChange}
              />
              
            </div>
          </div>
          <div className="mt-[30px] flex justify-end">
            <button type="submit" className="button px-[30px]">
              Submit<ButtonArrow />
            </button>
          </div>
        </form>
        {notification && (
          <div className="fixed inset-0 grid place-items-center w-full h-full bg-gray-500 bg-opacity-75">
            <div className="bg-white text-[#283C63] py-[60px] rounded-[20px] shadow-lg max-w-[584px] w-full">
              <Image src={success} alt="success" height={130} width={115} className="mx-auto" />
              <h2 className="text-center mt-[40px]">{notification}</h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
