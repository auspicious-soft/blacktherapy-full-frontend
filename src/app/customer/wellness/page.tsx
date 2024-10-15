"use client";

import AttachmentsWellness from '@/app/customer/components/AttachmentsWellness';
import PreviousAppointments from '@/app/customer/components/PreviousAppointments';
import UpcomingAppointments from '@/app/customer/components/UpcomingAppointments';
import VideosWellness from '@/app/customer/components/VideosWellness';
import { useState } from 'react';
const Page = () => {
    const [activeTab, setActiveTab] = useState('Previous Appointments');

    const renderTabContent = () => {
      switch (activeTab) {
        case 'Previous Appointments':
          return <div><PreviousAppointments /></div>; 
        case 'Upcoming Appointments':
          return <div><UpcomingAppointments /></div>;
        case 'Videos':
          return <div><VideosWellness /></div>; 
        case 'Attachments':
          return <div><AttachmentsWellness /></div>;
        default:
          return null;
      }
    };
  return (
    <>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Wellness Portal
      </h1>
      <div>
    <div className='flex items-center justify-between mb-5 '>
    <div className="tabs flex flex-wrap gap-[5px] lg:gap-[20px]">
        {['Previous Appointments', 'Upcoming Appointments', 'Videos', 'Attachments'].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : '!bg-transparent border-[1px] !border-[#283c63] !text-[#283c63]'} bg-[#283c63] text-[#fff] rounded-[6px] mt-0 text-[14px] py-[8px] px-[16px] lg:px-[32px] lg:py-[12px] `}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        <button className='button !mt-0'>Request Appointment</button>
      </div>
    </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div> 
    </>
  );
};
export default Page;
