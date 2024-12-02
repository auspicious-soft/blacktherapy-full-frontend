'use client' 
import Lottie from 'react-lottie';
import animationData from "@/lotties/notification.json";
import { useState } from 'react';
import { NotificationIcon } from '@/utils/svgicons';
interface LottieProps {
  data?: any;
}
export const LottieNotification:React.FC<LottieProps> = ({data}) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
    const otherAlert = data?.otherAlerts
    const newAlert = data?.newChatAlerts;
    const alertsArray =[...otherAlert, ...newAlert];
    console.log('alertsArray:', alertsArray);
    
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

  return (
    <div className='relative'>
       {hasUnreadAlerts ? (
      <div onClick={handleNotificationClick}>
    <Lottie options={defaultOptions} style={customStyles} height={60} width={60}  />
      </div>
       ) : (
        <div onClick={handleNotificationClick} className="cursor-pointer">
          <NotificationIcon />
        </div>
      )}
    {showAlertModal && (
            <div className="absolute right-0 top-full mt-2 w-[300px] bg-white shadow-lg rounded-lg border p-4 z-10">
              <h3 className="font-bold mb-3">Notifications</h3>
              {alertsArray.length > 0 ? (
                <ul>
                  {alertsArray.map((row) => (
                    <li key={row?._id} className="border-b py-2 last:border-b-0">
                      {row?.message}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No new alerts</p>
              )}
              <button 
                // onClick={handleNotificationClick} 
                className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          )}
    </div>
  )
}

