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
    setNotification("Therapist Registeration Successful");

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  return (
    <>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Add New Clinician
      </h1>
      <div className=" bg-white rounded-[10px] w-full p-5">
      <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-[30px] ">
            <div className="">
              <label className="block mb-2">First Name</label>
              <input type="text" name="" id="" placeholder="John"/>
            </div>
            <div className="">
              <label className="block mb-2">Last Name</label>
              <input type="text" name="" id="" placeholder="Doe"/>
            </div>
            <div>
              <label className="block mb-2">Mobile Number</label>
              <input type="number" name="" id="" placeholder="+12346987"/>
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input type="email" name="" id="" placeholder="emailaddress@mail.com"/>
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <input type="password" name="" id="" placeholder="******"/>
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
