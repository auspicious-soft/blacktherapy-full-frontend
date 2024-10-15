
import { CloseIcon } from '@/utils/svgicons';
import React, { useState } from 'react';
import Modal from 'react-modal';

 // For accessibility with Next.js

const ClinicianRecord = () => {
  // State for modal visibility
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    employmentStatus: 'Withdrawn',
    employeeName: 'dsfasdas',
    employeeOwner: 'sdfsfsd',
    employeeId: 'sdfaas',
    companyAssigned: 'dsfs',
    position: 'dsfasdas',
    assignedOffice: 'sdfsfsd',
    supervisor: 'sdfaas',
    officeNumber: 'sdfsfsd',
    ringCentralExtension: 'sdfaas',
    companyEmail: 'sdfsfsd',
    medicaidChecks: 'Yes',
    axisCare: 'yes',
    simplePractice: 'NA',
    zohoCRM: 'NA',
    employeeEmail: 'abs@gmail.com'
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalIsOpen(false); // Close the modal after updating data
  };

  return (
    <div className="">
        <div className='flex justify-end mb-[30px]'>
      <button
        className="!text-sm !h-[40px] !px-[30px] button"
        onClick={() => setModalIsOpen(true)}
      >
        Add New
      </button></div>

      {/* Display the data */}
      <div className="mt-">
        <div className='bg-[#EBF4F9] rounded-[10px] p-5 mb-[15px] '>
          <h3 className="text-[18px] leading-[normal] mb-6">TSG Employee</h3>
          <div className='grid grid-cols-[minmax(0,_5fr)_minmax(0,_7fr)] gap-[30px] '>
          <label htmlFor="">Employment Status
            <p className='text-[#283C63] text-[18px] underline font-gothamMedium leading-[normal] mt-1'>{formData.employmentStatus}</p>
          </label>
          <label htmlFor="">TSG Employee Name
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.employeeName}</p>
          </label>
          <label htmlFor="">TSG Employee Owner
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.employeeOwner}</p>
          </label>
          <label htmlFor="">Assigned Employee ID
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.employeeId}</p>
          </label>
          </div>
        </div>

        <div className='bg-[#EBF4F9] rounded-[10px] p-5 mb-[15px] '>
          <h3 className="text-[18px] leading-[normal] mb-6">Employment Information</h3>
          <div className='grid grid-cols-[minmax(0,_5fr)_minmax(0,_7fr)] gap-[30px] '>
          <label htmlFor="">Company Assigned To
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.companyAssigned}</p>
          </label>
          <label htmlFor="">Position
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.position}</p>
          </label>
          <label htmlFor="">Assigned Office
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.assignedOffice}</p>
          </label>
          <label htmlFor="">Supervisor
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.supervisor}</p>
          </label>
          <label htmlFor="">Office Number/Other
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.officeNumber}</p>
          </label>
          <label htmlFor="">Ring Central Extension
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.ringCentralExtension}</p>
          </label>
          <label htmlFor="">Company Email Address
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.companyEmail}</p>
          </label>
          </div>
        </div>

        <div className='bg-[#EBF4F9] rounded-[10px] p-5 mb-[15px] '>
          <h3 className="text-[18px] leading-[normal] mb-6">TSG Employee</h3>
          <div className='grid grid-cols-[minmax(0,_5fr)_minmax(0,_7fr)] gap-[30px] '>
          <label htmlFor="">Medicaid Checks Allowed?
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.medicaidChecks}</p>
          </label>
          <label htmlFor="">Axis Care
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.axisCare}</p>
          </label>
          <label htmlFor="">Simple Practice
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.simplePractice}</p>
          </label>
          <label htmlFor="">Zoho CRM
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.zohoCRM}</p>
          </label>
          <label htmlFor="">Employee Email
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{formData.employeeEmail}</p>
          </label>
          </div>
        </div>

      </div>

      {/* Modal for editing fields */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Item"
        className="modal max-w-[1180px] mx-auto rounded-[20px] w-full  max-h-[90vh] overflow-scroll overflo-custom "
        overlayClassName="w-full h-full p-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
    <div className="flex items-center justify-between rounded-t-[20px]  p-5 md:py-[25px] md:px-[35px] bg-[#283C63]  ">
        <h2 className="font-gothamMedium text-white">Edit Employment Info</h2>
        <button onClick={() => setModalIsOpen(false)}><CloseIcon /> </button>
    </div>  
        <div className='bg-white p-5 md:px-[35px] md:py-10'>
          <form onSubmit={handleSubmit} className="">
           <div className='grid md:grid-cols-2  gap-4 md:gap-[30px] '>
            <div>
              <label className="block mb-2">Assigned Employee ID</label>
              <input type="text"  name="employeeId" value={formData.employeeId} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">TSG Employee Name</label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2">TSG Employee Owner</label>
              <input
                type="text"
                name="employeeOwner"
                value={formData.employeeOwner}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2">Assigned Office</label>
              <input
                type="text"
                name="assignedOffice"
                value={formData.assignedOffice}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2">Company Assigned To</label>
              <input type="text"  name="companyAssigned" value={formData.companyAssigned} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">Position</label>
              <input type="text"  name="position" value={formData.position} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">Ring Central Extension</label>
              <input type="text"  name="ringCentralExtension" value={formData.ringCentralExtension} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">Supervisor</label>
              <input type="text"  name="supervisor" value={formData.supervisor} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">Office Number/Other </label>
              <input type="text"  name="officeNumber" value={formData.officeNumber} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">Medicaid Checks Allowed</label>
              <input type="text"  name="medicaidChecks" value={formData.medicaidChecks} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">Office Assigned Other</label>
              <input type="text"  name="assignedOffice" value={formData.assignedOffice} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">Company Email Address</label>
              <input type="text"  name="companyEmail" value={formData.companyEmail} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">Zoho CRM</label>
              <input type="text"  name="zohoCRM" value={formData.zohoCRM} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">Axis Care</label>
              <input type="text"  name="axisCare" value={formData.axisCare} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">Simple Pactice</label>
              <input type="text"  name="simplePractice" value={formData.simplePractice} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">Employee Email</label>
              <input type="text"  name="employeeEmail" value={formData.employeeEmail} onChange={handleChange} />
            </div>

            </div>
            {/* Add more fields as necessary */}
            <div className='mt-5 md:mt-10 flex justify-end'>
            <button
              type="submit"
              className="button !px-[30px]"
            >Submit
            </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ClinicianRecord;
