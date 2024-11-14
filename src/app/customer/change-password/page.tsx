"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ButtonArrow } from "@/utils/svgicons";
import success from "@/assets/images/succes.png";
import { toast } from "sonner";
import { changePasswordService } from "@/services/client/client-service";
import { useSession } from "next-auth/react";

type FormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const session = useSession()
  const [isPending, startTransition] = React.useTransition();
  const [notification, setNotification] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New Password does not match');
      return
    }
    if (formData.newPassword === formData.oldPassword) {
      toast.error('New Password cannot be same as old password');
      return
    }
    startTransition(async () => {
      try {
        const resss = await changePasswordService(`/client/update-password/${session?.data?.user?.id}`, { currentPassword: formData.oldPassword, newPassword: formData.newPassword })
        if (resss?.data?.success) {
          setNotification("Password changed successfully");
          setTimeout(() => {
            setNotification(null);
            window.location.href = '/customer/dashboard'
          }, 3000)
        }
      } catch (error) {
        const { response: { data: { message } } } = error as any
        toast.error(message ? message : 'An error occurred');
      }

    })
  };

  return (
    <div>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Change Password
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-[20px] p-5 md:p-[30px]">
          <div className="profile-form grid gap-[20px]">
            <div className="">
              <input
                type="text"
                name="oldPassword"
                placeholder="Old Password"
                value={formData.oldPassword}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <input
                type="text"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <input
                type="text"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-[30px] ">
            <button type="submit" className="button px-[30px]">
              {!isPending ? 'Save' : 'Saving...'} <ButtonArrow />
            </button>
          </div>
        </div>
      </form>
      {notification && (
        <div className="fixed inset-0 grid place-items-center w-full h-full bg-gray-500 bg-opacity-75">
          <div className="bg-white text-[#283C63] py-[60px] rounded-[20px] shadow-lg max-w-[584px] w-full">
            <Image
              src={success}
              alt="success"
              height={130}
              width={115}
              className="mx-auto"
            />
            <h2 className="text-center mt-[40px]">{notification}</h2>
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;
