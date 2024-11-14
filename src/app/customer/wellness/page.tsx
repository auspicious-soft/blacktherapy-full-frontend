"use client";

import AttachmentsWellness from '@/app/customer/components/AttachmentsWellness';
import PreviousAppointments from '@/app/customer/components/PreviousAppointments';
import UpcomingAppointments from '@/app/customer/components/UpcomingAppointments';
import VideosWellness from '@/app/customer/components/VideosWellness';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getClientWellness, getClientAppointments } from '@/services/client/client-service';
import { useSession } from 'next-auth/react';

const Page = () => {
  const session = useSession();
  const [activeTab, setActiveTab] = useState('Previous Appointments');
  const [shouldFetchWellness, setShouldFetchWellness] = useState(false);
  const [shouldFetchAppointments, setShouldFetchAppointments] = useState(false);
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (activeTab === 'Videos' || activeTab === 'Attachments') {
      setShouldFetchWellness(true);
    } else {
      setShouldFetchWellness(false);
    }

    if (activeTab === 'Previous Appointments' || activeTab === 'Upcoming Appointments') {
      setShouldFetchAppointments(true);
    } else {
      setShouldFetchAppointments(false);
    }
  }, [activeTab]);

  const { data, isLoading, mutate, error } = useSWR(shouldFetchWellness ? `/client/${session?.data?.user?.id}/wellness` : null, getClientWellness);
  console.log('data: ', data);
  const { data: appointmentsData, isLoading: appointmentsIsLoading, mutate: appointmentsMutate, error: appointmentsError } = useSWR(shouldFetchAppointments ? `/client/appointment/${session?.data?.user?.id}` : null, getClientAppointments)

  const total = data?.data?.total ?? 0;
  const rowsPerPage = data?.data?.limit ?? 0;
  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Previous Appointments':
        return <div><PreviousAppointments isLoading={appointmentsIsLoading} /></div>;
      case 'Upcoming Appointments':
        return <div><UpcomingAppointments isLoading={appointmentsIsLoading} /></div>;
      case 'Videos':
        return <VideosWellness data={data?.data} isLoading={isLoading} rowPerPage={rowsPerPage} total = {total} handlePageClick={handlePageClick} />;
      case 'Attachments':
        return <div><AttachmentsWellness isLoading={isLoading} /></div>;
      default:
        return null;
    }
  };

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

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