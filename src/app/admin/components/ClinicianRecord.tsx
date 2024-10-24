import React from 'react';
import useSWR from 'swr';
import { GetEmployeeRecordsData } from '@/services/admin/admin-service';

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
  const employeeRecord = data?.data?.data;


  return (
    <div>
      {employeeRecord?.length > 0 ? (
      <>
        <TSGEmployeeDetails record={employeeRecord?.[0]} />
        <EmploymentInformation record={employeeRecord?.[0]} />
        <EmployeeAccessSystem record={employeeRecord?.[0]} />
      </>
    ) : (
      <p>No data found</p> 
    )}
  </div>
  );
};

export default ClinicianRecord;
