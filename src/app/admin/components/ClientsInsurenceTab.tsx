import { updateClientsDetails } from '@/services/admin/admin-service';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface ClientInterfaceProps {
  row: any;
  mutate: any;
}

const ClientsInsurenceTab: React.FC<ClientInterfaceProps> = ({ row, mutate }) => {
  const [formData, setFormData] = useState({
    insuranceCompanyName: row?.insuranceCompany?.insuranceCompanyName || '',
    memberOrSubscriberId: row?.insuranceCompany?.memberOrSubscriberId || ''
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      await updateClientsDetails(`/admin/clients/${row._id}`, formData); 
      toast.success('Client details updated successfully');
      mutate(); 
    } catch (error) {
      console.error('Error updating client details:', error);
      toast.error('Error updating client details'); 
    }
  };  
  return (
    <div>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 md:gap-5">
        <div>
          <label className="block mb-2">Insurance Company</label>
          <select
            name="insuranceCompanyName"
            value={formData.insuranceCompanyName}
            onChange={handleInputChange}
            className=""
          >
            <option value="">--Select--</option>
            <option value="Insurance Company 1">Insurance Company 1</option>
            <option value="Insurance Company 2">Insurance Company 2</option>
            <option value="ABC Insurance">ABC Insurance</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Member ID</label>
          <input
            type="text"
            name="memberOrSubscriberId"
            value={formData.memberOrSubscriberId}
            onChange={handleInputChange}
            placeholder="Enter member ID"
            className=""
          />
        </div>
        <div className="mt-[10px] md:col-span-2 flex justify-end">
          <button type="submit" className="button !px-[30px]">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientsInsurenceTab;
