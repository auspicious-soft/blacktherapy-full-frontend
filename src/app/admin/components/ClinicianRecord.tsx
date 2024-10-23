import React, { useState } from 'react';
import Modal from 'react-modal';
import useSWR from 'swr';
import { GetEmployeeRecordsData } from '@/services/admin/admin-service';
import { CloseIcon } from '@/utils/svgicons';

interface ClinicianRecordProps {
  rowId: any;
}

const TSGEmployeeDetails = ({ record }: { record: any }) => (
  <div className='bg-[#EBF4F9] rounded-[10px] p-5 mb-[15px]'>
    <h3 className="text-[18px] leading-[normal] mb-6">TSG Employee</h3>
    <div className='grid grid-cols-[minmax(0,_5fr)_minmax(0,_7fr)] gap-[30px]'>
      <label>Employment Status
        <p className='text-[#283C63] text-[18px] underline font-gothamMedium leading-[normal] mt-1'>
          {record.employmentStatus || "Withdrawn"}
        </p>
      </label>
      <label>TSG Employee Name
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.tsgEmployeeName}</p>
      </label>
      <label>TSG Employee Owner
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.tsgEmployeeOwner}</p>
      </label>
      <label>Assigned Employee ID
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.assignedEmployeeId}</p>
      </label>
    </div>
  </div>
);

const EmploymentInformation = ({ record }: { record: any }) => (
  <div className='bg-[#EBF4F9] rounded-[10px] p-5 mb-[15px]'>
    <h3 className="text-[18px] leading-[normal] mb-6">Employment Information</h3>
    <div className='grid grid-cols-[minmax(0,_5fr)_minmax(0,_7fr)] gap-[30px]'>
      <label>Company Assigned To
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.companyAssignedTo}</p>
      </label>
      <label>Position
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.position}</p>
      </label>
      <label>Assigned Office
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.assignedOffice}</p>
      </label>
      <label>Supervisor
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.supervisor}</p>
      </label>
      <label>Office Number/Other
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.officeNumberOther}</p>
      </label>
      <label>Ring Central Extension
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.ringCentralExtension}</p>
      </label>
      <label>Company Email Address
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.companyEmailAddress}</p>
      </label>
    </div>
  </div>
);

const EmployeeAccessSystem = ({ record }: { record: any }) => (
  <div className='bg-[#EBF4F9] rounded-[10px] p-5 mb-[15px]'>
    <h3 className="text-[18px] leading-[normal] mb-6">Employee Access & System</h3>
    <div className='grid grid-cols-[minmax(0,_5fr)_minmax(0,_7fr)] gap-[30px]'>
      <label>Medicaid Checks Allowed?
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>
          {record.medicaidChecksAllowed ? 'Yes' : 'No'}
        </p>
      </label>
      <label>Axis Care
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.axisCare}</p>
      </label>
      <label>Simple Practice
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.simplePractice}</p>
      </label>
      <label>Zoho CRM
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.zohoCRM}</p>
      </label>
      <label>Employee Email
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.employeeEmail}</p>
      </label>
    </div>
  </div>
);

const ClinicianRecord: React.FC<ClinicianRecordProps> = ({ rowId }) => {
  const { data, error, isLoading } = useSWR(`/admin/therapists/employee-records/${rowId}`, GetEmployeeRecordsData, {
    revalidateOnFocus: false,
  });

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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const employeeRecord = data?.data?.data?.[0]; 
  console.log('employeeRecord:', employeeRecord);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading employee records.</p>;

  const handleSubmit =()=>{
    console.log();
  }
  const handleChange =() =>{

  }
  return (
    <div>
      {employeeRecord && (
        <>
          <TSGEmployeeDetails record={employeeRecord} />
          <EmploymentInformation record={employeeRecord} />
          <EmployeeAccessSystem record={employeeRecord} />
        </>
      )}

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
