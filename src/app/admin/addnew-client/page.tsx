"use client";
import React, { useState } from 'react';
import { ButtonArrow } from "@/utils/svgicons";
import Image from 'next/image';
import success from "@/assets/images/succes.png";

const Page = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    // Show the notification
    setNotification("Client Added Successfully");

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Add New Client
      </h1>
      <div className="bg-white rounded-[10px] w-full p-5">
        <form onSubmit={handleSubmit}>
          <div className="add-clinician flex flex-wrap gap-[30px]">
            <div className="md:!w-[calc(50%-30px)]">
              <label className="block mb-2">What type of service are you looking for?</label>
              <select name="assignedClinician" value="" className="">
                <option value="">--Select--</option>
                <option value="Clinician 1">Clinician 1</option>
                <option value="Clinician 2">Clinician 2</option>
                <option value="Clinician 3">Clinician 3</option>
              </select>
            </div>
            <div className="md:!w-[calc(50%-30px)]">
              <label className="block mb-2">Want to check how much insurance will pay for?</label>
              <select name="assignedPeerSupport" value="" className="">
                <option value="">--Select--</option>
                <option value="Peer 1">Peer 1</option>
                <option value="Peer 2">Peer 2</option>
                <option value="Peer 3">Peer 3</option>
              </select>
            </div>
            <div className="">
              <label className="block mb-2">First Name</label>
              <input type="text" name="firstName" id="firstName" placeholder="John" />
            </div>
            <div className="">
              <label className="block mb-2">Last Name</label>
              <input type="text" name="lastName" id="lastName" placeholder="Doe" />
            </div>
            <div className="">
              <label className="block mb-2">Date of Birth</label>
              <input type="date" name="dob" id="dob" />
            </div>
            <div>
              <label className="block mb-2">Phone</label>
              <input type="tel" name="phone" id="phone" placeholder="+1234567890" />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input type="email" name="email" id="email" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <input type="password" name="password" id="password" placeholder="******" />
            </div>
            <div>
              <label className="block mb-2">Confirm Password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" placeholder="******" />
            </div>
            <div>
              <label className="block mb-2">City</label>
              <select name="city" id="city" className="">
                <option value="">Select</option>
                <option value="City 1">City 1</option>
                <option value="City 2">City 2</option>
                <option value="City 3">City 3</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">State</label>
              <select name="state" id="state" className="">
                <option value="">Select</option>
                <option value="State 1">State 1</option>
                <option value="State 2">State 2</option>
                <option value="State 3">State 3</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Zip Code</label>
              <input type="text" name="zipCode" id="zipCode" placeholder="12345" />
            </div>
            <div>
              <label htmlFor="address1" className="block mb-2">Address line 1</label>
              <input type="text" name="address1" id="address1" />
            </div>
            <div>
              <label htmlFor="address2" className="block mb-2">Address line 2</label>
              <input type="text" name="address2" id="address2" />
            </div>
          </div>
          <div className="mt-[30px] flex justify-end">
            <button type="submit" className="button px-[30px]">Add Now <ButtonArrow /></button>
          </div>
        </form>
      </div>
      {notification && (
        <div className="fixed inset-0 grid place-items-center w-full h-full bg-gray-500 bg-opacity-75">
          <div className="bg-white text-[#283C63] py-[60px] rounded-[20px] shadow-lg max-w-[584px] w-full">
            <Image src={success} alt="success" height={130} width={115} className="mx-auto" />
            <h2 className="text-center mt-[40px]">{notification}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
