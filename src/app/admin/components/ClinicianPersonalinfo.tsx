import React from 'react';

interface ClinicianPersonalinfoProps {
    row: any;
}

const ClinicianPersonalinfo:React.FC<ClinicianPersonalinfoProps> = ({row}) => {


    return (
        <div>
            <div className='grid md:grid-cols-3 gap-4 md:gap-[30px]'>
            <div>
            <label className="block mb-2">Gender</label>
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] '>{row?.otherDetailsOfTherapist?.gender}</p>
            </div>
            <div>
            <label className="block mb-2">Date of Birth</label>
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] '>{row?.otherDetailsOfTherapist?.dob.split('T')[0]}</p>
            </div>
            <div>
            <label className="block mb-2">Email ID</label>
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] '>{row?.email}</p>
            </div>
            <div>
            <label className="block mb-2">Phone Number</label>
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] '>{row?.phoneNumber}</p>
            </div>
            <div>
            <label className="block mb-2">Location</label>
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] '>
            {row?.otherDetailsOfTherapist?.addressLine1} {row?.otherDetailsOfTherapist?.addressLine2} {row?.otherDetailsOfTherapist?.state}
                 </p>
            </div>
            </div>
            <div className='mt-5 md:mt-10 '>
            <label className=" mb-2 mr-[10px]">No of appointments:</label>
            <span className='text-[#283C63] text-sm font-gothamMedium leading-[normal] '>{row?.appointments.length}</span>
            </div>
        </div>
    );
}

export default ClinicianPersonalinfo;
