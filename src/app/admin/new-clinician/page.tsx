"use client";
import React, {useState} from "react";
import { ButtonArrow } from "@/utils/svgicons";
import Image from 'next/image';
import success from "@/assets/images/succes.png";
import Notification from "../components/Notification";

const Page = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    setNotification("Therapist Registeration Successful");
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
        <Notification message={notification} onClose={() => setNotification(null)} />
      </div>
    </>
  );
};
export default Page;
