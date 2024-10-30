"use client";
import React, { useState } from 'react'; 
import CustomSelect from './CustomSelect';
import { USStates } from '@/data/UsStatesData';
import { toast } from 'sonner';
import { updateClientsDetails } from '@/services/admin/admin-service';
import { SingleValue } from 'react-select';
import { mutate } from 'swr';

interface PersonalInformationTabProps {
  row: any;  
  mutate: any;
}
interface OptionType {
  value: string;
  label: string;
}

const PersonalInformationTab: React.FC<PersonalInformationTabProps> = ({ row, mutate }) => {

  const [formData, setFormData] = useState({
    serviceSubscribed: row?.serviceSubscribed || '',
    insuranceCoverage: row?.insuranceCoverage || '',
    firstName: row?.firstName || '',
    lastName: row?.lastName || '',
    dob: row?.dob ? row?.dob.split('T')[0] : '', 
    phoneNumber: row?.phoneNumber || '',
    email: row?.email || '',
    password: row?.password || '',
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
  
  const handleSelectChange = (selectedOption: any) => {
    const value = selectedOption ? (selectedOption as OptionType).value : '';
    setFormData((prev) => ({
      ...prev,
      state: value, 
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      const response = await updateClientsDetails(`/admin/clients/${row._id}`, formData);
      if (response.status === 200) {
        toast.success('Client details updated successfully');
        mutate(); 
      } else {
        toast.error('Failed to update client details');
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error updating client details:', error);
      toast.error('Error updating client details');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="add-clinician flex flex-wrap gap-[30px]">
          <div className="md:!w-[calc(50%-30px)]">
            <label className="block mb-2">What type of service are you looking for?</label>
            <select name="serviceSubscribed" value={formData.serviceSubscribed} onChange={handleChange}>
              <option value="">--Select--</option>
              <option value="me">Me</option>
              <option value="us">Us</option>
              <option value="teen">Teen</option>
            </select>
          </div>
          <div className="md:!w-[calc(50%-30px)]">
            <label className="block mb-2">Want to check how much insurance will pay for?</label>
            <select name="insuranceCoverage" value={formData.insuranceCoverage} onChange={handleChange}>
              <option value="" disabled>--Select--</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="through EAP">Through EAP</option>
            </select>
          </div>
          <div className="selector">
            <label className="block mb-2">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
          </div>
          <div className="selector">
            <label className="block mb-2">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
          </div>
          <div className="selector">
            <label className="block mb-2">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </div>
          <div className='selector'>
            <label className="block mb-2">Phone</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+1234567890" />
          </div>
          <div className='selector'>
            <label className="block mb-2">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" />
          </div>
          <div className='selector'>
            <label className="block mb-2">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="******" />
          </div>
          <div className='selector'>
            <label className="block mb-2">City</label>
           <input type="text" name="city" value={formData.city} onChange={handleChange}/>
          </div>
          <div className='selector custom-select'>
          <CustomSelect
        name="state"
        value={USStates.find(option => option.value === formData.state) || null} 
        options={USStates}
        onChange={handleSelectChange} 
        placeholder="Select State"
      />
          </div>
          <div className='selector'>
            <label className="block mb-2">Zip Code</label>
            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="12345" />
          </div>
          <div className='selector'>
            <label htmlFor="address1" className="block mb-2">Address line 1</label>
            <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
          </div>
          <div className='selector'>
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
