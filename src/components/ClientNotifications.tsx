'use client' 
import { useState } from 'react';
import Lottie from 'react-lottie';
import { NotificationIcon } from '@/utils/svgicons';
import animationData from "@/lotties/notification.json";

// Define a more specific type for alerts


interface NotificationProps {
  alerts?: any[] | null;
  handleRead?: () => void;
  isLoading?: boolean;
}

export const ClientNotifications: React.FC<NotificationProps> = ({
    alerts = [], 
    handleRead, 
    isLoading = false
}) => {
  const [showAlertModal, setShowAlertModal] = useState(false);

  const hasUnreadAlerts = Array.isArray(alerts)? alerts.some((alert: any) => !alert.read): false;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className='relative'>
      <div 
        onClick={() => setShowAlertModal(!showAlertModal)} 
        className="cursor-pointer"
      >
        {hasUnreadAlerts ? (
          <Lottie 
            options={defaultOptions} 
            height={60} 
            width={60} 
            style={{ margin: '0' }}  
          />
        ) : (
          <NotificationIcon />
        )}
      </div>

      {showAlertModal && (
        <div className="absolute right-0 top-full mt-2 w-[300px] bg-white rounded-lg z-10">

          <div className='bg-[#283C63] rounded-t-lg flex justify-between items-center px-3 py-3 border-b border-[#ccc]'>
            <h5 className='text-[#fff] text-sm select-none'>
              Notifications
              {/* {unreadAlerts.length} */}
            </h5>
            {handleRead && (
              <button 
                onClick={()=> {
                  handleRead()
                  setShowAlertModal(!showAlertModal)
                }} 
                disabled={isLoading}
                className="text-xs text-[#fff] underline disabled:opacity-50"
              >
                {isLoading ? 'Updating...' : 'Mark all as Read'}
              </button>
            )}
          </div>

          {/* Notifications List */}
          {Array.isArray(alerts) && alerts.length > 0 ? (
            <div className='my-2'>
              {alerts.map((row: any) => (
                <div key={row._id} className={`border-b border-[#D9DCE2] mb- last:border-b-0  px-3 py-2 *:${row.read ? ' ' : 'font-bold bg-[#CCE9FA] '}`}>
                  <h4 className='text-base'>{row?.sender?.firstName} {row?.sender?.lastName} <span className='text-sm underline'> {row?.sender?.role}</span> </h4>
                <p 
                  
                  className={`
                    text-sm text-[#686c78] 
                    ${row.read 
                      ? ' ' 
                      : ' bg-[#CCE9FA] '}
                  `}
                >
                  {row?.message}
                  {/* {!row.read && (
                    <span className="ml-2 text-xs text-blue-500">(New)</span>
                  )} */}
                </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No new alerts</p>
          )}
        </div>
      )}
    </div>
  );
};