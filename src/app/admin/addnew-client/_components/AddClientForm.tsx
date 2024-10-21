'use client';
import { AddNewClient } from "@/services/admin/admin-service";
import { ButtonArrow } from "@/utils/svgicons";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

type FormDataType = {
  serviceSubscribed: string;
  firstName: string;
  lastName: string;
  dob: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  insuranceCoverage: string;
  city: string;
  state: string;
  zipCode: string;
  addressLine1: string;
  addressLine2: string;
};

const AddClientForm = () => {
  const [formData, setFormData] = useState<FormDataType>({
    serviceSubscribed: "",
    firstName: "",
    lastName: "",
    dob: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    insuranceCoverage: "",
    city: "",
    state: "",
    zipCode: "",
    addressLine1: "",
    addressLine2: "",
  });
  
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      ...restFormData
    } = formData;

    if (!formData.serviceSubscribed || !formData.insuranceCoverage) {
      return toast.warning("Please select service type and insurance coverage");
    }

    if (!firstName || !lastName || !email || !password) {
      return toast.warning("Please fill in all required fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    startTransition(async () => {
      try {
        const formDataToSubmit = {
          ...restFormData,
          password,
          firstName,
          lastName,
          email,
        };

        const response = await AddNewClient(formDataToSubmit);

        if (response?.status === 201) {
          toast.success("Client added successfully");
          setFormData({
            serviceSubscribed: "",
            firstName: "",
            lastName: "",
            dob: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
            insuranceCoverage: "",
            city: "",
            state: "",
            zipCode: "",
            addressLine1: "",
            addressLine2: "",
          });
        } else {
          toast.error("Failed to add client");
        }
      } catch (error) {
        console.error("Error adding client:", error);
        toast.error("An error occurred while adding the client");
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name as keyof FormDataType]: value, // Assert name as a key of FormDataType
    }));
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
              <label className="block mb-2">
                What type of service are you looking for?
              </label>
              <select
                name="serviceSubscribed"
                value={formData.serviceSubscribed}
                onChange={handleInputChange}
                required
              >
                <option value="">--Select--</option>
                <option value="me">Me</option>
                <option value="us">Us</option>
                <option value="teen">Teen</option>
              </select>
            </div>
            <div className="md:!w-[calc(50%-30px)]">
              <label className="block mb-2">
                Want to check how much insurance will pay for?
              </label>
              <select
                name="insuranceCoverage"
                value={formData.insuranceCoverage}
                onChange={handleInputChange}
                required
              >
                <option value="">--Select--</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="through EAP">Through EAP</option>
              </select>
            </div>
            <div className="">
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
                required
              />
            </div>
            <div className="">
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                id="lastName"
                placeholder="Doe"
                required
              />
            </div>
            <div className="">
              <label className="block mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                id="dob"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Phone</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                id="phone"
                placeholder="+1234567890"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                id="email"
                placeholder="email@example.com"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                id="password"
                placeholder="******"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                id="confirmPassword"
                placeholder="******"
                required
              />
            </div>
            <div>
              <label className="block mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                id="city"
                placeholder="City"
                required
              />
            </div>
            <div>
              <label className="block mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                id="state"
                placeholder="State"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                id="zipCode"
                placeholder="Zip Code"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Address Line 1</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                id="addressLine1"
                placeholder="Address Line 1"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Address Line 2</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                id="addressLine2"
                placeholder="Address Line 2"
              />
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center bg-[#283C63] hover:bg-[#1B2838] text-white font-semibold py-2 px-4 rounded"
            >
              <span className="mr-2">{isPending ? "Loading..." : "Add Client"}</span>
              <ButtonArrow />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientForm;
