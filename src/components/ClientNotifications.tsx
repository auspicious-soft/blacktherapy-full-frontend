'use client'
import { MdDelete } from "react-icons/md";
import { useEffect } from 'react';
import { useState } from 'react';
import Lottie from 'react-lottie';
import { NotificationIcon } from '@/utils/svgicons';
import animationData from "@/lotties/notification.json";

// Define a more specific type for alerts

interface NotificationProps {
  alerts?: any[] | null;
  handleRead?: () => void;
  handleDelete?: (id: string) => void;
  isLoading?: boolean;
  handleClearAll?: () => void;
}

export const ClientNotifications: React.FC<NotificationProps> = ({ alerts = [], handleRead, handleDelete, isLoading = false, handleClearAll }) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(false);

  useEffect(() => {
    setHasUnreadAlerts(Array.isArray(alerts) ? alerts.some((alert: any) => !alert.read) : false);
  }, [hasUnreadAlerts, alerts]);

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
      <div onClick={() => setShowAlertModal(!showAlertModal)} className='cursor-pointer'>
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
        <div className='absolute right-0 top-full mt-2 w-[340px] bg-white rounded-lg z-10 shadow-md border'>
          <div className="max-h-[500px] overflow-y-auto overflo-custom ">

            <div className='bg-[#283C63] rounded-t-lg flex justify-between items-center px-3 py-3 border-b border-[#ccc]'>
              <h5 className='text-[#fff] text-sm select-none'>
                Notifications
                {/* {unreadAlerts.length} */}
              </h5>
              {handleRead && (
                <>
                  <button
                    onClick={() => {
                      handleRead()
                      setShowAlertModal(!showAlertModal)
                    }}
                    disabled={isLoading}
                    className="text-xs text-[#fff] underline disabled:opacity-50"
                  >
                    {isLoading ? 'Updating...' : 'Mark all as Read'}
                  </button>
                  <button
                    onClick={() => {
                      handleClearAll && handleClearAll()
                    }}
                    disabled={isLoading}
                    className="text-xs text-[#fff] underline disabled:opacity-50"
                  >
                    {isLoading ? 'Deleting...' : 'Delete All'}
                  </button>
                </>
              )}
            </div>

            {/* Notifications List */}
            {Array.isArray(alerts) && alerts.length > 0 ? (
              <div className=''>
                {alerts.map((row: any) => (
                  <div key={row._id} className={`border-b border-[#D9DCE2] mb- last:border-b-0  px-3 py-2 *:${row.read ? ' ' : 'font-bold bg-[#CCE9FA] '}`}>
                    <div className='flex items-center'>
                      <div className='flex justify-between w-full'>
                        <div className="w-full">
                          <h4 className='text-base'>{row?.sender?.firstName} {row?.sender?.lastName} <span className='text-sm underline pl-3'> {row?.sender?.role}</span> </h4>
                          <div className={`flex  justify-between w-[90%] text-sm text-[#686c78] ${row.read ? ' ' : ' bg-[#CCE9FA] '}`}>
                            <p className="font-semibold">{row?.message}</p>
                            <p className='min-w-[20%] '>{new Date(row?.createdAt).toLocaleDateString('en-US')} </p>
                          </div>
                        </div>
                        <button onClick={() => handleDelete && handleDelete(row._id)} className='mr-2 text-red-500'>
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No new alerts</p>
            )}
          </div>
        </div>
      )
      }
    </div >
  );
};