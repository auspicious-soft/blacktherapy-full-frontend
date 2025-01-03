"use client";
import { FaHandsHelping } from "react-icons/fa";
import AttachmentsWellness from '@/app/customer/components/AttachmentsWellness';
import PreviousAppointments from '@/app/customer/components/PreviousAppointments';
import UpcomingAppointments from '@/app/customer/components/UpcomingAppointments';
import VideosWellness from '@/app/customer/components/VideosWellness';
import { useState, useEffect, useTransition } from 'react';
import useSWR from 'swr';
import { getClientAppointments, getProfileService, postAnAppointment } from '@/services/client/client-service';
import { useSession } from 'next-auth/react';
import Modal from 'react-modal';
import { ButtonArrow } from '@/utils/svgicons';
import { toast } from "sonner";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const session = useSession()
  const { data: user } = useSWR(session?.data?.user?.id ? `/client/${session?.data?.user?.id}` : null, getProfileService, { revalidateOnFocus: false })
  const isChatAllowedByPaymentStatus = user?.data?.data?.chatAllowed
  const isVideoCountByPaymentStatus = user?.data?.data?.videoCount
  const video = user?.data?.data?.video
  const message = user?.data?.data?.message
  const [activeTab, setActiveTab] = useState('Previous Appointments');
  const [shouldFetchAppointments, setShouldFetchAppointments] = useState(false);
  const [query, setQuery] = useState('page=1&limit=10');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (activeTab === 'Previous Appointments' || activeTab === 'Upcoming Appointments') {
      setQuery(`appointmentType=${activeTab === 'Previous Appointments' ? 'past' : 'upcoming'}&page=1&limit=10`);
      setShouldFetchAppointments(true);
    } else {
      setShouldFetchAppointments(false);
    }
  }, [activeTab]);
  const { data: appointmentsData, isLoading: appointmentsIsLoading, mutate: appointmentsMutate, error } = useSWR((shouldFetchAppointments && session?.data?.user?.id) ? `/client/appointment/${session?.data?.user?.id}?${query}` : null, getClientAppointments, { revalidateOnFocus: false });



  const renderTabContent = () => {
    switch (activeTab) {
      case 'Previous Appointments':
        return <div><PreviousAppointments message={message} video={video} isChatAllowed={isChatAllowedByPaymentStatus} isVideoCount={isVideoCountByPaymentStatus} data={appointmentsData?.data} error={error} setQuery={setQuery} isLoading={appointmentsIsLoading} /></div>;
      case 'Upcoming Appointments':
        return <div><UpcomingAppointments message={message} video={video} isChatAllowed={isChatAllowedByPaymentStatus} isVideoCount={isVideoCountByPaymentStatus} data={appointmentsData?.data} error={error} isLoading={appointmentsIsLoading} /></div>;
      default:
        return null;
    }
  }

  const handleRequestAppointment = async (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await postAnAppointment(`/client/appointment`, {
          clientId: session?.data?.user?.id,
          appointmentDate: e.target['appointment-date'].value,
          appointmentTime: e.target['appointment-time'].value
        })
        if (response?.data?.success) {
          toast.success('Appointment Requested Successfully')
          appointmentsMutate()
          setOpenModal(false);
        }
        else if (response?.status === 204) {
          toast.error('Phone number is not valid please update it')
        }
        else {
          toast.error('Failed to request appointment');
        }
      } catch (error) {
        toast.error('An error occurred while requesting the appointment');
      }
    })
  }
  if (error) return <div className="text-red-500">Error: {error.message}</div>



  return (
    <>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Appointments
      </h1>
      <div>
        <div className='flex items-center justify-between mb-5 '>
          <div className="tabs flex flex-wrap gap-[5px] lg:gap-[20px]">
            {['Previous Appointments', 'Upcoming Appointments'].map((tab) => (
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
            <button className='button !mt-0' onClick={() => setOpenModal(true)}>Request Appointment</button>
          </div>
        </div>
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
      {openModal && (
        <Modal
          isOpen={openModal}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '100%',
              width: '500px',
              borderRadius: '10px',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
          onRequestClose={() => setOpenModal(false)} >
          <h1 className="text-center font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
            Request Appointment
          </h1>
          <FaHandsHelping className="text-[#283c63] text-[100px] text-center flex w-full" />
          <div className="bg-white rounded-[20px] p-5 md:p-[30px]">
            <div className=" text-center text-black w-full">
              Sure want to request an appointment?
            </div>
            <form onSubmit={handleRequestAppointment}>
              <div className="flex gap-4 mt-5" >
                <div className="flex-1">
                  <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700">Date</label>
                  <input required type="date" id="appointment-date" name="appointment-date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div className="flex-1">
                  <label htmlFor="appointment-time" className="block text-sm font-medium text-gray-700">Time</label>
                  <input required type="time" id="appointment-time" name="appointment-time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div className="flex items-center text-lg text-black gap-5 justify-between mt-5">
                <button className="button" onClick={() => setOpenModal(false)}>Cancel</button>
                <button type="submit" className="button">{isPending ? 'Requesting...' : 'Request'}<ButtonArrow /></button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Page;