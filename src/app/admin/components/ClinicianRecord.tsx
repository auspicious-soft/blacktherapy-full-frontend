import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { AddEmployeeRecordData, GetEmployeeRecordsData } from '@/services/admin/admin-service';
import Modal from 'react-modal';
import { CloseIcon } from '@/utils/svgicons';
import { toast } from 'sonner';

interface ClinicianRecordProps {
  rowId: any;
}

const TSGEmployeeDetails = ({ record }: { record: any }) => (
  <div className='bg-[#EBF4F9] rounded-[10px] p-5 mb-[15px]'>
    <h3 className="text-[18px] leading-[normal] mb-6">TSG Employee</h3>
    <div className='grid grid-cols-[minmax(0,_5fr)_minmax(0,_7fr)] gap-[30px]'>
      <label>Employment Status
        <p className='text-[#283C63] text-[18px] underline font-gothamMedium leading-[normal] mt-1'>
          {record?.employmentStatus || "Withdrawn"}
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
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.companyAssignedToTo}</p>
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
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.officeNumberOtherOther}</p>
      </label>
      <label>Ring Central Extension
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.ringCentralExtension}</p>
      </label>
      <label>Company Email Address
        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] mt-1'>{record?.companyEmailAddressAddress}</p>
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
          {record.medicaidChecksAllowedAllowed ? 'Yes' : 'No'}
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { data, error, isLoading, mutate } = useSWR(`/admin/therapists/employee-records/${rowId}`, GetEmployeeRecordsData, {
    revalidateOnFocus: false,
  });
  const employeeRecord = data?.data?.data;

  const [formData, setFormData] = useState({
    assignedEmployeeId: '',
    tsgEmployeeName: '',
    tsgEmployeeOwner: '',
    assignedOffice: '',
    companyAssignedTo: '',
    position: '',
    ringCentralExtension: '',
    supervisor: '',
    officeNumberOther: '',
    medicaidChecksAllowed: '',
    officeAssignedOther: '',
    companyEmailAddress: '',
    zohoCRM: '',
    axisCare: '',
    simplePractice: '',
    employeeEmail: ''
  });


  useEffect(() => {
    if (employeeRecord?.length > 0) {
      setFormData({
        assignedEmployeeId: employeeRecord[0].assignedEmployeeId || '',
        tsgEmployeeName: employeeRecord[0].tsgtsgEmployeeName || '',
        tsgEmployeeOwner: employeeRecord[0].tsgtsgEmployeeOwner || '',
        assignedOffice: employeeRecord[0].assignedOffice || '',
        companyAssignedTo: employeeRecord[0].companyAssignedToTo || '',
        position: employeeRecord[0].position || '',
        ringCentralExtension: employeeRecord[0].ringCentralExtension || '',
        supervisor: employeeRecord[0].supervisor || '',
        officeNumberOther: employeeRecord[0].officeNumberOtherOther || '',
        medicaidChecksAllowed: employeeRecord[0].medicaidChecksAllowedAllowed ? 'Yes' : 'No',
        officeAssignedOther: employeeRecord[0].officeAssignedOther || '',
        companyEmailAddress: employeeRecord[0].companyEmailAddressAddress || '',
        zohoCRM: employeeRecord[0].zohoCRM || '',
        axisCare: employeeRecord[0].axisCare || '',
        simplePractice: employeeRecord[0].simplePractice || '',
        employeeEmail: employeeRecord[0].employeeEmail || ''
      });
    }
  }, [employeeRecord]);


 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData(prevData => ({
    ...prevData,
    [name]: value === "true" ? true : value === "false" ? false : value,
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response= await AddEmployeeRecordData( `admin/therapists/employee-records/${rowId}`,formData); // Call your POST API
      if (response.status === 201) {
        toast.success('Service Assignment details added successfully');
        mutate();
        setModalIsOpen(false)
      } else {
        toast.error('Failed to add Service Assignment details');
      }
    } catch (error) {
      console.error('Error adding Service Assignment details:', error);
      toast.error('Error adding Service Assignment details');
    }
  };


    return (
      <div>
        {employeeRecord?.length > 0 ? (
          <div>
            {/* Render existing records */}
            <TSGEmployeeDetails record={employeeRecord[0]} />
            <EmploymentInformation record={employeeRecord[0]} />
            <EmployeeAccessSystem record={employeeRecord[0]} />
            {/* <button
              className="!text-sm !h-[40px] !px-[30px] button"
              onClick={() => setModalIsOpen(true)}
            >
              Edit Record
            </button> */}
          </div>
        ) : (
          <div>
            <p>No data found</p>
            <button
              className="!text-sm !h-[40px] !px-[30px] button"
              onClick={() => setModalIsOpen(true)}
            >
              Add New
            </button>
          </div>
        )}
  

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
              <input type="text"  name="assignedEmployeeId" value={formData.assignedEmployeeId} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">TSG Employee Name</label>
              <input
                type="text"
                name="tsgEmployeeName"
                value={formData.tsgEmployeeName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2">TSG Employee Owner</label>
              <input
                type="text"
                name="tsgEmployeeOwner"
                value={formData.tsgEmployeeOwner}
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
              <input type="text"  name="companyAssignedTo" value={formData.companyAssignedTo} onChange={handleChange} />
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
              <input type="text"  name="officeNumberOther" value={formData.officeNumberOther} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">Medicaid Checks Allowed</label>
              <select name="medicaidChecksAllowed" value={formData.medicaidChecksAllowed}
               onChange={handleChange} id="">
                <option value="">select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Office Assigned Other</label>
              <input type="text"  name="officeAssignedOther" value={formData.officeAssignedOther} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2">Company Email Address</label>
              <input type="text"  name="companyEmailAddress" value={formData.companyEmailAddress} onChange={handleChange} />
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
