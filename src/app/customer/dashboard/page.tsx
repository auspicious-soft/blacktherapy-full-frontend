'use client'
import DashboardAssignment from "@/app/customer/components/DashboardAssignment";
import DashboardCard from "@/app/customer/components/DashboardCard";
import { getClientAppointments, getProfileService, getSubscriptionById } from "@/services/client/client-service";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";


const Home = () => {
  const [query, setQuery] = useState('page=1&limit=10')
  const session = useSession()
  const { data, isLoading } = useSWR(`/client/appointment/${session?.data?.user?.id}?${query}`, getClientAppointments)
  const { data: user } = useSWR(`/client/${session?.data?.user?.id}`, getProfileService)
  const appointmentsData = data?.data
  const apData = appointmentsData?.data

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

  const { data: subsData } = useSWR(userPlanOrSubscriptionId ? `${userPlanOrSubscriptionId}` : null, getSubscriptionById)
  previousBilled.amount = String(`$${(subsData as any)?.plan.amount / 100}`)
  return (
    <>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Welcome {session?.data?.user?.name} !
      </h1>
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
      <DashboardAssignment total={appointmentsData?.total} data={appointmentsData?.data} rowsPerPage={appointmentsData?.limit} isLoading={isLoading} error={appointmentsData?.error} setQuery={setQuery} />
    </>
  );
};
export default Home

