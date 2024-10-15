import { CloseIcon } from '@/utils/svgicons';
import React, { useState } from 'react';
import Modal from 'react-modal';

// Initial data for the table
const initialData = [
  {
    insuranceVerified: 'Yes',
    scaleDiscount: 'Yes',
    billingStatus: 'Current Balance',
    scaleTermsNote: 'dshfjsfobdas',
    lastInsuranceCheck: 'Yes',
    simplePractice: 'Yes',
    name: '',
    userRole: '',
    date: '',
  },
];

const BillingInformationTab: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    insuranceVerified: '',
    scaleDiscount: '',
    billingStatus: '',
    scaleTermsNote: '',
    lastInsuranceCheck: '',
    simplePractice: '',
    name: '',
    userRole: '',
    date: '',
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData([...data, formData]); // Add new data to the table
    setFormData({
      insuranceVerified: '',
      scaleDiscount: '',
      billingStatus: '',
      scaleTermsNote: '',
      lastInsuranceCheck: '',
      simplePractice: '',
      name: '',
      userRole: '',
      date: '',
    });
    closeModal();
  };

  return (
    <div className="">
    <div className='flex justify-end mb-[22px]'>  <button
        onClick={openModal}
        className="!text-sm !h-[40px] !px-[30px] button">Add New</button></div>
<div className='table-common overflo-custom'>
      <table>
        <thead>
          <tr>
            <th>Insurance Verified</th>
            <th>Scale/Discount</th>
            <th>Billing Status</th>
            <th>Scale Terms/Note</th>
            <th>Last Insurance Check</th>
            <th>Simple Practice</th>
            <th>Name</th>
            <th>User Role</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.insuranceVerified}</td>
              <td>{row.scaleDiscount}</td>
              <td>{row.billingStatus}</td>
              <td>{row.scaleTermsNote}</td>
              <td>{row.lastInsuranceCheck}</td>
              <td>{row.simplePractice}</td>
              <td>{row.name}</td>
              <td>{row.userRole}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Entry"
        className="modal max-w-[810px] mx-auto rounded-[20px] w-full  max-h-[90vh] overflow-scroll overflo-custom "
        overlayClassName="w-full h-full p-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        //ariaHideApp={false}
      >
        <div className="flex items-center justify-between rounded-t-[20px]  p-5 md:py-[25px] md:px-[35px] bg-[#283C63]  ">
        <h2 className="font-gothamMedium !text-white">Add New</h2>
        <button onClick={closeModal}>
          <CloseIcon />{" "}
        </button>
      </div>
        <form onSubmit={handleSubmit} className='bg-white p-5 md:px-[35px] md:py-10'>
          <div className="grid md:grid-cols-2 gap-4 md:gap-[30px] ">
            <div>
              <label className="block mb-2">Insurance Verified</label>
              <input
                type="text"
                name="insuranceVerified"
                value={formData.insuranceVerified}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Scale/Discount</label>
              <input
                type="text"
                name="scaleDiscount"
                value={formData.scaleDiscount}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Billing Status</label>
              <input
                type="text"
                name="billingStatus"
                value={formData.billingStatus}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Scale Terms/Note</label>
              <input
                type="text"
                name="scaleTermsNote"
                value={formData.scaleTermsNote}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Last Insurance Check</label>
              <input
                type="text"
                name="lastInsuranceCheck"
                value={formData.lastInsuranceCheck}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Entered into Simple Practice</label>
              <input
                type="text"
                name="simplePractice"
                value={formData.simplePractice}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">User Role:</label>
              <input
                type="text"
                name="userRole"
                value={formData.userRole}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Date:</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='mt-10 flex justify-end'><button type="submit" className="button">Update</button></div>
        </form>
      </Modal>
    </div>
  );
};

export default BillingInformationTab;
