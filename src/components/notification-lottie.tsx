'use client'
import Lottie from 'react-lottie';
import animationData from "@/lotties/notification.json";
import { useState, useTransition } from 'react';
import { NotificationIcon } from '@/utils/svgicons';
import { updateReadStatus } from '@/services/therapist/therapist-service.';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
interface LottieProps {
  data: any;
  id?: any
}
export const LottieNotification: React.FC<LottieProps> = ({ data, id }) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const otherAlert = data?.otherAlerts
  const newAlert = data?.newChatAlerts;
  const alertsArray = [...otherAlert, ...newAlert];

  const hasUnreadAlerts = alertsArray.some((alert) => !alert.read);

  const handleNotificationClick = () => {
    setShowAlertModal(!showAlertModal);
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
  const customStyles = {
    margin: '0',

  }
  const handleRead = () => {
    startTransition(async () => {
      try {
        const unreadAlertIds = alertsArray
          .filter(alert => !alert.read)
          .map(alert => alert._id);

        const response = await updateReadStatus(`/therapist/notifications/${id}`, unreadAlertIds);

        if (response?.status === 200) {
          const updatedAlerts = alertsArray.map(alert => ({
            ...alert,
            read: true
          }));
          setShowAlertModal(false);
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

  return (
    <div className='relative'>
      {hasUnreadAlerts ? (
        <div onClick={handleNotificationClick}>
          <Lottie options={defaultOptions} style={customStyles} height={60} width={60} />
        </div>
      ) : (
        <div onClick={handleNotificationClick} className="cursor-pointer">
          <NotificationIcon />
        </div>
      )}
      {showAlertModal && (
        <div className='absolute right-0 top-full mt-2 w-[300px] bg-white rounded-lg z-10 shadow-md border'>
          <div className="max-h-[500px] overflow-y-auto overflo-custom ">
            <div className='bg-[#283C63] rounded-t-lg flex justify-between items-center px-3 py-3 border-b border-[#ccc] '>
              <h5 className='text-[#fff] text-sm '>Notifications
                {/* {alertsArray.length}  */}
              </h5>
              <button onClick={handleRead} className="text-xs text-[#fff] underline ">Mark all as Read</button>

            </div>
            {alertsArray.length > 0 ? (
              <ul className=' my-2 '>
                {alertsArray.map((row) => (
                  <li key={row?._id}
                    className={` text-[#686c78] text-xs border-b  px-3 last:border-b-0 py-2  ${row?.read ? 'text-' : 'font-bol bg-[#EBF3F8] '}`}>
                    {row?.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No new alerts</p>
            )}

          </div>
        </div>
      )}
    </div>
  )
}

