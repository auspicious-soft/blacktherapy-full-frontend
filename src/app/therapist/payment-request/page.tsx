"use client";
import React, {useState} from "react";
import { ButtonArrow } from "@/utils/svgicons";
import Image from 'next/image';
import success from "@/assets/images/succes.png";


const Page = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    // Show the notification
    setNotification("Payment Request Submitted");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  return (
    <>
      <h1 className=" mb-[20px] md:mb-[50px]">
      Payment Requests
      </h1>
      <div className=" bg-white rounded-[10px] w-full md:p-[40px] p-5">
      <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-[30px] ">
            <div className="">
              <label className="block mb-2">Requesters Name</label>
              <input type="text" name="" id="" placeholder="John"/>
            </div>
            <div className="">
              <label className="block mb-2">Email Address</label>
              <input type="email" name="" id="" placeholder="loremipsum@gmail.com"/>
            </div>
            <div className="">
              <label className="block mb-2">Request Type</label>
              <select name="assignedClinician" value="" className="">
                <option value="">--Select--</option>
                <option value="Clinician 1">Clinician 1</option>
                <option value="Clinician 2">Clinician 2</option>
                <option value="Clinician 3">Clinician 3</option>
              </select>
            </div>
            <div className="">
              <label className="block mb-2">Services Provided</label>
              <select name="assignedClinician" value="" className="">
                <option value="">--Select--</option>
                <option value="Clinician 1">Clinician 1</option>
                <option value="Clinician 2">Clinician 2</option>
                <option value="Clinician 3">Clinician 3</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Client Name</label>
              <input type="text" name="" id="" placeholder=""/>
            </div>
            <div>
              <label className="block mb-2">Date of Services Provided</label>
              <input type="date" name="" id="" placeholder=""/>
            </div>
          </div>
          <div className="flex flex-wrap gap-[30px] mt-[30px]">
          <div className="md:w-[calc(20%-15px)] w-[calc(50%-15px)]">
              <label className="block mb-2">Time of Services Provided</label>
              <input type="time" name="" id="" placeholder=""/>
            </div>
            <div className="md:w-[calc(20%-15px)] w-[calc(50%-15px)]">
              <label className="block mb-2">Duration (Hours)</label>
              <input type="time" name="" id="" placeholder=""/>
            </div>
            <div className="md:w-[calc(60%-30px)] w-full">
              <label className="block mb-2">Progress Notes and/or Assessments Submitted & Approved?</label>
              <select name="assignedClinician" value="" className="">
                <option value="">--Select--</option>
                <option value="Clinician 1">Clinician 1</option>
                <option value="Clinician 2">Clinician 2</option>
                <option value="Clinician 3">Clinician 3</option>
              </select>
            </div>
          </div>
         <div className='mt-[30px] flex justify-end '>
         <button type="submit" className="button px-[30px]">Submit<ButtonArrow /> </button>
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
