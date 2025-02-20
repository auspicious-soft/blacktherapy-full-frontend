import React from 'react'
import { SoapInterface } from './soap'

const PieNote = (props: SoapInterface) => {
  const { selectedRow: formData, setSelectedRow: setFormData } = props;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-3 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Pie Note Form</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Client&apos;s Name</label>
            <input
              disabled
              type="text"
              name="clientName"
              value={formData?.clientName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter client's name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client&apos;s DOB</label>
            <input
              type="date"
              name="clientDob"
              value={formData?.clientDob}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Diagnoses</label>
            <input
              type="text"
              name="diagnoses"
              value={formData?.diagnoses}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter diagnoses"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPT Code</label>
            <input
              type="text"
              name="cptCode"
              value={formData?.cptCode}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter CPT code"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Service</label>
            <input
              type="date"
              name="dateOfService"
              value={formData?.dateOfService}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Provider Name</label>
            <input
              type="text"
              name="providerName"
              value={formData?.providerName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter provider name"
              required
            />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">PROBLEM</h3>
          <textarea
            name="problem"
            value={formData?.problem || ""}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            placeholder="Enter problem"
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">INTERVENTION</h3>
          <textarea
            name="intervention"
            value={formData?.intervention || ""}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            placeholder="Enter intervention"
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">EVALUATION</h3>
          <textarea
            name="evaluation"
            value={formData?.evaluation || ""}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            placeholder="Enter evaluation"
          />
        </div>
      </div>
    </div>
  );
};

export default PieNote;