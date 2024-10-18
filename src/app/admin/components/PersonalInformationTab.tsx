"use client";
import React, { useState } from 'react';

interface PersonalInformationTabProps {
  row: any; 
}

const PersonalInformationTab: React.FC<PersonalInformationTabProps> = ({ row }) => {

  const [formData, setFormData] = useState({
    serviceSubscribed: row?.serviceSubscribed || '',
    insuranceCoverage: row?.insuranceCoverage || '',
    firstName: row?.firstName || '',
    lastName: row?.lastName || '',
    dob: row?.dob ? row?.dob.split('T')[0] : '', // Handling date format
    phoneNumber: row?.phoneNumber || '',
    email: row?.email || '',
    password: '',
    confirmPassword: '',
    city: row?.city || '',
    state: row?.state || '',
    zipCode: row?.zipCode || '',
    addressLine1: row?.addressLine1 || '',
    addressLine2: row?.addressLine2 || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    // Handle form submission here, e.g., send data to API
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="add-clinician flex flex-wrap gap-[30px]">
          <div className="md:!w-[calc(50%-30px)]">
            <label className="block mb-2">What type of service are you looking for?</label>
            <select name="serviceSubscribed" value={formData.serviceSubscribed} onChange={handleChange}>
              <option value="">--Select--</option>
              <option value="Clinician 1">Clinician 1</option>
              <option value="Clinician 2">Clinician 2</option>
              <option value="Clinician 3">Clinician 3</option>
            </select>
          </div>
          <div className="md:!w-[calc(50%-30px)]">
            <label className="block mb-2">Want to check how much insurance will pay for?</label>
            <select name="insuranceCoverage" value={formData.insuranceCoverage} onChange={handleChange}>
              <option value="">--Select--</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="">
            <label className="block mb-2">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
          </div>
          <div className="">
            <label className="block mb-2">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
          </div>
          <div className="">
            <label className="block mb-2">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-2">Phone</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+1234567890" />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" />
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="******" />
          </div>
          <div>
            <label className="block mb-2">Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="******" />
          </div>
          <div>
            <label className="block mb-2">City</label>
            <select name="city" value={formData.city} onChange={handleChange}>
              <option value="">Select</option>
              <option value="City 1">City 1</option>
              <option value="City 2">City 2</option>
              <option value="City 3">City 3</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">State</label>
            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select</option>
              <option value="California">California</option>
              <option value="State 2">State 2</option>
              <option value="State 3">State 3</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Zip Code</label>
            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="12345" />
          </div>
          <div>
            <label htmlFor="address1" className="block mb-2">Address line 1</label>
            <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="address2" className="block mb-2">Address line 2</label>
            <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
          </div>
        </div>
        <div className="mt-[30px] flex justify-end">
          <button type="submit" className="button !px-[30px]">Update</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformationTab;
