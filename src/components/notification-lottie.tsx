'use client'
import Lottie from 'react-lottie';
import animationData from "@/lotties/notification.json";
import { useState, useTransition } from 'react';
import { NotificationIcon } from '@/utils/svgicons';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteSingleAlert } from '@/services/admin/admin-service';
import { MdDelete } from "react-icons/md";
import { updateReadStatus } from '@/services/therapist/therapist-service.';

interface LottieProps {
  data: any;
  id?: any
}

export const LottieNotification: React.FC<LottieProps> = ({ data, id }) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const otherAlert = data?.otherAlerts;
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
  };

  const customStyles = {
    margin: '0',
  };

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
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteSingleAlert(`/therapist/notifications/${id}`);
      if (response?.status === 200) {
        toast.success('Notification deleted successfully');
        router.refresh();
      } else {
        toast.error('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast.error('An error occurred while deleting notification');
    }
  };

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
              <h5 className='text-[#fff] text-sm '>Notifications</h5>
              <button onClick={handleRead} className="text-xs text-[#fff] underline ">Mark all as Read</button>
            </div>
            {alertsArray.length > 0 ? (
              <ul className='my-2'>
                {alertsArray.map((row) => (
                  <li key={row?._id} className={`flex items-center justify-between w-full text-[#686c78] text-xs border-b px-3 last:border-b-0 py-2 ${row?.read ? '' : 'font-bold bg-[#EBF3F8]'}`}>
                    <div className='flex justify-between w-full gap-3'>
                      <div>
                        {row?.message}
                        <span className='min-w-[20%] '>{new Date(row?.createdAt).toLocaleDateString('en-US')}</span>
                      </div>
                    <button onClick={() => handleDelete(row._id)} className='mr-2 text-red-500'>
                      <MdDelete size={20} />
                    </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 p-4" >No new alerts</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};