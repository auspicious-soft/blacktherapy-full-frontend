import React from 'react';

const ClinicianPersonalinfo = () => {
    return (
        <div>
            <div className='grid md:grid-cols-3 gap-4 md:gap-[30px]'>
            <div>
            <label className="block mb-2">Gender</label>
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] '>Male</p>
            </div>
            <div>
            <label className="block mb-2">Date of Birth</label>
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] '>11/10/2023</p>
            </div>
            <div>
            <label className="block mb-2">Email ID</label>
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] '>asafeerali1246@gmail.com</p>
            </div>
            <div>
            <label className="block mb-2">Phone Number</label>
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] '>0929929</p>
            </div>
            <div>
            <label className="block mb-2">Location</label>
            <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal] '>null,Alaska,zxz</p>
            </div>
            </div>
            <div className='mt-5 md:mt-10 '>
            <label className=" mb-2 mr-[10px]">No of appointments:</label>
            <span className='text-[#283C63] text-sm font-gothamMedium leading-[normal] '>0</span>
            </div>
        </div>
    );
}

export default ClinicianPersonalinfo;
