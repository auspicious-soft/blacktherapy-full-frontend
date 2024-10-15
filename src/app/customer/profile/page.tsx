"use client";
import React, { useState } from "react";
import Image from "next/image";
import previmg2 from "@/assets/images/previmg.png";
import { ButtonArrow, EditImgIcon } from "@/utils/svgicons";
import success from "@/assets/images/succes.png";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phoneNumber: string;
  state: string;
  city: string;
  address: string; // Explicitly define repeatDays as an array of strings
};

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    state: "",
    city: "",
    address: "", // Initialize as an empty array
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData((prevData) => ({
          ...prevData,
          image: result,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerFileInputClick = () => {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //console.log("Form Data Submitted: ", formData);

    setNotification("Payment Request Submitted");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        My Profile
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-[20px] p-5 md:p-[30px]">
          <div className="custom relative w-[177px] h-[177px] mb-[30px] md:mb-[50px]">
            <input
              className="absolute top-0 left-0 h-full w-full opacity-0 p-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <div className="relative h-full">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={177}
                  height={177}
                  className="rounded-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={triggerFileInputClick}
                  className="absolute bottom-[16px] right-1"
                >
                  <EditImgIcon />
                </button>
              </div>
            ) : (
              <div className="grid place-items-center h-full w-full">
                <div>
                  <Image
                    src={previmg2}
                    alt="upload"
                    width={177}
                    height={177}
                    className="rounded-full"
                  />
                  <p className="absolute bottom-[16px] right-1 pointer-events-none">
                    <EditImgIcon />
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="profile-form grid md:flex flex-wrap gap-5 md:gap-[30px]">
            <div className="md:w-[calc(50%-15px)]">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(50%-15px)]">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(50%-20px)]">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(20%-20px)]">
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(30%-20px)]">
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(60%-20px)]">
              <input
                type="text"
                name="address"
                placeholder="Home Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(20%-20px)]">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(20%-20px)]">
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">State</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>
          <div className="mt-[30px] ">
            <button type="submit" className="button px-[30px]">
              Update <ButtonArrow />{" "}
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
