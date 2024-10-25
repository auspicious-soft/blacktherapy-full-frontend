'use client'
import DashboardCard from "@/app/admin/components/DashboardCard";
import { getAdminDashboardStats } from "@/services/admin/admin-service";
import {
  OverviewIcon1,
  OverviewIcon2,
  OverviewIcon3, 
  OverviewIcon4,
  OverviewIcon5,
  OverviewIcon6,
  OverviewIcon7,
  OverviewIcon8,
} from "@/utils/svgicons";
import { useSession } from "next-auth/react";
import useSWR from "swr";


const Home = () => {
  const session = useSession()
 const {data , error, isLoading} =  useSWR(`/admin/dashboard?id=${session?.data?.user?.id}`, getAdminDashboardStats)
  const finalData:any = data?.data
  const OverviewData = [
    {
      id: "1",
      icon: <OverviewIcon1 />,
      title: "Active Clinician",
      value: finalData?.data?.activeClinicians,
    },
    {
      id: "2",
      icon: <OverviewIcon2 />,
      title: "New Clinician",
      value: finalData?.data?.newClinicians,
    },
    {
      id: "3",
      icon: <OverviewIcon3 />,
      title: "Active Client",
      value: finalData?.data?.activeClients,
    },
    {
      id: "4",
      icon: <OverviewIcon4 />,
      title: "Unassigned Clients",
      value: finalData?.data?.unassignedClients,
    },
    {
      id: "5",
      icon: <OverviewIcon5 />,
      title: "Clinician Approved",
      value: finalData?.data?.cliniciansApproved,
    },
    {
      id: "6",
      icon: <OverviewIcon6 />,
      title: "Total Payment Requests",
      value: finalData?.data?.totalPaymentRequests,
    },
    {
      id: "7",
      icon: <OverviewIcon7 />,
      title: "Pending Payment Requests",
      value: finalData?.data?.pendingPaymentRequests,
    },
    {
      id: "8",
      icon: <OverviewIcon8 />,
      title: "Pending Clinical Reviews",
      value: finalData?.data?.pendingClinicalReviews,
    },
  ];
  return (
    <>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Welcome
      </h1>
      <h2 className="mb-[30px]">Overview</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[15px] md:gap-[30px]">
        {OverviewData.map((card) => (
          <DashboardCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            value={card.value ?? 0}
          />
        ))}
      </div>
    </>
  )
}
export default Home
