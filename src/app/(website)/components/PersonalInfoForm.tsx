"use client"
import CustomSelect from '@/app/admin/components/CustomSelect';
import { USStates } from '@/data/UsStatesData';
import React, { useState } from 'react';

interface PerfonalInfoFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}
interface OptionType {
  value: string;
  label: string;
}
const PersonalInfoForm: React.FC<PerfonalInfoFormProps> = ({formData, setFormData }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (selectedOption: any) => {
    const value = selectedOption ? (selectedOption as OptionType).value : "";
    setFormData((prev: any) => ({ ...prev, state: value }));
  };

  return (
    <div>
      <h2 className='section-title text-center mb-4'>Fill Personal Information</h2>
      
      <div className="personal-profile grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-4">
        <InputField required name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} />
        <InputField required name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} />
        <InputField required type="date" name="dob" label="Date of Birth" value={formData.dob} onChange={handleChange} />
        <InputField required name="phoneNumber" label="Phone" value={formData.phoneNumber} onChange={handleChange} />
        <InputField required type="password" name="password" label="Password" value={formData.password} onChange={handleChange} />
        <InputField required type="password" name="confirmPassword" label="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        <InputField required type="email" name="email" label="Email" value={formData.email} onChange={handleChange} />
        <InputField required name="addressLine1" label="Address Line 1" value={formData.addressLine1} onChange={handleChange} />
        <InputField required name="addressLine2" label="Address Line 2" value={formData.addressLine2} onChange={handleChange} />
        <InputField required name="city" label="City" value={formData.city} onChange={handleChange} />
        <CustomSelect  required name="State" value={ (USStates as any).find((option: any) => option.value === formData?.state) || null }
        options={USStates as any} onChange={handleSelectChange} placeholder="Select State" />
        <InputField required name="zipCode" label="Zip Code" value={formData.zipCode} onChange={handleChange} />

        {/* <SelectField name="location" label="Location" value={formData.location} onChange={handleChange} options={['Guam', 'Location2', 'Location3']} /> */}
      </div>
      {/* <button onClick={clientFormSubmit} className=" button absolute right-0 bottom-[-56px] md:bottom-[-70px] ">Finish</button> */}
      </div>
  );
};

interface InputFieldProps {
  name: string;
  label: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ name, label, value, type = 'text', onChange, required = false }) => (
  <div className='grid'>
    <label className="text-[15px] md:text-lg text-[#283C63] mb-2" htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required} 
      className="text-sm md:text-base text-[#686C78] py-[10px] px-4 border border-[#dbe0eb] rounded-[20px]"
      placeholder={label}
    />
  </div>
);

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ name, label, value, onChange, options }) => (
  <div className='grid'>
    <label className="text-[15px] md:text-lg text-[#283C63] mb-2" htmlFor={name}>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="text-sm md:text-base text-[#686C78] border border-[#dbe0eb] rounded-[20px] px-4 py-[10px]"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default PersonalInfoForm;
