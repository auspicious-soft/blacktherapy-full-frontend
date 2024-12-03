'use client'
import DashboardAssignment from "@/app/customer/components/DashboardAssignment";
import DashboardCard from "@/app/customer/components/DashboardCard";
import { ClientNotifications } from "@/components/ClientNotifications";
import { getClientAppointments, getClientsAlerts, getProfileService, getSubscriptionById, updateClientReadStatus } from "@/services/client/client-service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import useSWR from "swr";


const Home = () => {
  const [query, setQuery] = useState('page=1&limit=10')
  const session = useSession()
  const router = useRouter();
  const { data, isLoading } = useSWR(`/client/appointment/${session?.data?.user?.id}?${query}`, getClientAppointments, { revalidateOnFocus: false })
  const { data: user } = useSWR(`/client/${session?.data?.user?.id}`, getProfileService, { revalidateOnFocus: false })
  const appointmentsData = data?.data
  const apData = appointmentsData?.data

  
  const [isPending, startTransition] = useTransition();
  const {data: alertsData, isLoading: alertsLoading} = useSWR (`/client/notifications/${session?.data?.user?.id}`, getClientsAlerts)
  console.log('alertsData:', alertsData);
  const otherAlert = alertsData?.data?.data?.otherAlerts
  console.log('otherAlert:', otherAlert);
  const newAlert = alertsData?.data?.data?.newChatAlerts;
  console.log('newAlert:', newAlert);

   const alertsArray =[...otherAlert, ...newAlert];
   console.log('alertsArray:', alertsArray);
    
   const handleRead = () => {
    startTransition(async () => {
      try {
        const unreadAlertIds = alertsArray
          .filter(alert => !alert?.read)
          .map(alert => alert?._id);

        const response = await updateClientReadStatus(`/client/notifications/${session?.data?.user?.id}` ,unreadAlertIds);

        if (response?.status === 200) {
          const updatedAlerts = alertsArray.map(alert => ({
            ...alert,
            read: true
          }));
          //setShowAlertModal(false);
          router.refresh();
          toast.success('All notifications marked as read');
        } else {
          toast.error('Failed to mark notifications as read');
        }
      } catch (error) {
        console.error('Error marking notifications as read:', error);
        toast.error('An error occurred while marking notifications');
      }
    });
  }
  const PreviousAppointment = apData?.filter((item: any) => item?.status !== 'Pending' && (item?.updatedAt < new Date().toISOString()))
    .sort((a: any, b: any) => new Date(b.updatedAt).getDate() - new Date(a.updatedAt).getDate()) || [];

  const NextAppointment = apData?.filter((item: any) => item?.status === 'Pending')
    .sort((a: any, b: any) => new Date(a.updatedAt).getDate() - new Date(b.updatedAt).getDate()) || [];

  const nextAppointment = NextAppointment.length > 0 ? {
    date: new Date(NextAppointment[0]?.appointmentDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
    chat: NextAppointment[0]?.message ? 'Yes' : 'No',
    videoChat: NextAppointment[0]?.video ? 'Yes' : 'No',
  } : {
    date: 'No upcoming appointment',
    chat: null,
    videoChat: null,
  };

  const previousAppointment = PreviousAppointment.length > 0 ? {
    date: new Date(PreviousAppointment[0]?.appointmentDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
    chat: PreviousAppointment[0]?.message,
    videoChat: PreviousAppointment[0]?.video,
  } : {
    date: 'No past appointment',
    chat: null,
    videoChat: null,
  };

  let previousBilled = {
    amount: 'N/A',
  }
  const userPlanOrSubscriptionId = user?.data?.data?.planOrSubscriptionId
  const isChatAllowed = user?.data?.data?.chatAllowed
  const isVideoCount = user?.data?.data?.videoCount

  const { data: subsData } = useSWR(userPlanOrSubscriptionId ? `${userPlanOrSubscriptionId}` : null, getSubscriptionById)
  previousBilled.amount = String(`$${(subsData as any)?.plan.amount / 100}`)
  

  return (
    <>
      <div className="flex justify-between items-center mb-[25px] lg:mb-[50px]">
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] lg:text-[40px] ">
        Welcome {session?.data?.user?.name} !
      </h1>
      <ClientNotifications 
      alerts={alertsArray}
      handleRead={handleRead}
      isLoading={isPending}
    />
      </div>
      <div className="banner-client rounded-[10px]">
        <h2 className="text-[#fff] py-[50px] px-[15px] lg:py-[78px] lg:px-[110px]">
          Welcome to  The <br />
          Black Therapy Network
        </h2>
      </div>
      <DashboardCard
        nextAppointment={nextAppointment}
        previousAppointment={previousAppointment}
        previousBilled={previousBilled}
      />
      <DashboardAssignment isChatAllowed = {isChatAllowed} isVideoCount ={isVideoCount} total={appointmentsData?.total} data={appointmentsData?.data} rowsPerPage={appointmentsData?.limit} isLoading={isLoading} error={appointmentsData?.error} setQuery={setQuery} />
    </>
  );
};
export default Home

