import React, { useState } from 'react';

interface ClientInterfaceProps {
  row: any;
}

const ClientsInsurenceTab: React.FC<ClientInterfaceProps> = ({ row }) => {
  const [formData, setFormData] = useState({
    insuranceCompanyName: row?.insuranceCompany?.insuranceCompanyName || '',
    memberOrSubscriberId: row?.insuranceCompany?.memberOrSubscriberId || ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    // Handle form submission here (e.g., sending data to backend)
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
