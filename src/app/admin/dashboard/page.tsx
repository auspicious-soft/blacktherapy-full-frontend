'use client'
import DashboardCard from "@/app/admin/components/DashboardCard";
import { getAdminAlerts, getAdminDashboardStats, updateAdminAlerts } from "@/services/admin/admin-service";
import {
  NotificationIcon,
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
import ReactLoading from 'react-loading';
import AlertsTable from "../components/AlertsTable";
import { useState, useTransition } from "react";
import { LottieNotification } from "@/components/notification-lottie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ClientNotifications } from "@/components/ClientNotifications";
const Home = () => {
  const session = useSession()
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const {data , error, isLoading} =  useSWR(`/admin/dashboard?id=${session?.data?.user?.id}`, getAdminDashboardStats)
  const finalData:any = data?.data

  const {data: alertsData, error: alertError, isLoading: alertLoadig} = useSWR(`/admin/notifications`, getAdminAlerts)
  
  const alertsArray = alertsData?.data?.data

  const handleRead = () => {
    startTransition(async () => {
      try {
        const unreadAlertIds = alertsArray
          .filter((alert:any) => !alert.read)
          .map((alert:any) => alert._id);

        const response = await updateAdminAlerts(`/admin/notifications` ,unreadAlertIds);

        if (response?.status === 200) {
          const updatedAlerts = alertsArray.map((alert:any) => ({
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
      <div className=" flex items-center justify-between mb-[25px] lg:mb-[50px]">
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em]  lg:text-[40px] ">
        Welcome
      </h1>
      <ClientNotifications 
      alerts={alertsArray}
       handleRead={handleRead}
      isLoading={isPending}
    />
    </div>
    

      <h2 className="mb-[30px] select-none">Overview</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[15px] md:gap-[30px]">
        {OverviewData.map((card) => (
          <DashboardCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            value={card.value ?? <ReactLoading type={'spin'} color={'#26395e'} height={'20px'} width={'20px'} />}
          />
        ))}
      </div>
      <AlertsTable/>
    </>
  );
}
export default Home
