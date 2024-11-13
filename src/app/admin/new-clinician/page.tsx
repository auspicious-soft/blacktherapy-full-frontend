"use client";
import React, {ChangeEvent, FormEvent, useState, useTransition} from "react";
import { ButtonArrow } from "@/utils/svgicons";
import Image from 'next/image';
import success from "@/assets/images/succes.png";
import Notification from "../components/Notification";
import { toast } from "sonner";
import { AddNewTherapist } from "@/services/admin/admin-service";

interface FormData {
  firstName: string;
  lastName: string; 
  phoneNumber: number;
  email: string;
  password: string;
}

const Page = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: 0 ,
    email: "",
    password: "",
  });


  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement & { files: FileList };
    setFormData({
      ...formData,
      [name]: name === "phoneNumber" ? Number(value) : value, // Convert phoneNumber to number
    });
  };
  
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const response = await AddNewTherapist('/admin/therapists',formData); 
        if (response?.status === 201) {
          setNotification("Therapist Added Successfully");
          // toast.success("Wellness entry added successfully");
          setFormData({
            firstName: "",
            lastName: "",
            phoneNumber: 0,
            email: "",
            password: "",
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
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Add New Clinician
      </h1>
      <div className=" bg-white rounded-[10px] w-full p-5">
      <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-[30px] ">
            <div className="">
              <label className="block mb-2">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} placeholder="John" onChange={handleInputChange} required/>
            </div>
            <div className="">
              <label className="block mb-2">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" required/>
            </div>
            <div>
              <label className="block mb-2">Mobile Number</label>
              <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="+12346987" required/>
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="emailaddress@mail.com" required/>
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="******" required/>
            </div>
          </div>
         <div className='mt-[30px] flex justify-end '>
         <button type="submit" className="button px-[30px]" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Submit'}<ButtonArrow />
            </button>
         </div>
        </form>
        <Notification message={notification} onClose={() => setNotification(null)} />
      </div>
    </>
  );
};
export default Page;
 