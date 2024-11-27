import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrlOfS3 } from '@/utils';
import { CiFileOn } from 'react-icons/ci';

const NotificationChat = (props: any) => {
  const { messages } = props

  return (
    <div className="bg-white overflow-y-auto overflo-custom p-5 rounded-[20px]  ">
      <h3 className="leading-[normal] mb-5">Care Team Messages</h3>
      {
        messages.length > 0 &&
        messages?.map((msg: any, index: number) => {
          const messageDate = new Date(msg.createdAt)
          return (
            <React.Fragment key={index}>
              <div key={msg._id} className="bg-[#EBF3F8] rounded-lg p-3 mb-3">
                <div className="flex gap-2 border-b border-white pb-2">
                  <Image
                    src={getImageUrlOfS3(msg?.sender?.profilePic)}
                    height={30}
                    width={30}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="">
                      <p className="font-bold"> {msg?.sender?.firstName} {msg?.sender?.lastName} (Peer Support Team)</p>
                      <p><b>Available : </b> {msg?.sender?.currentAvailability?.map((avail: any) => `${avail}`).join(', ')}  [ {msg.sender.startTime} - {msg.sender.endTime} ]</p>
                    </div>
                    <p className='p-2'> {msg.message}</p>
                    {msg?.attachment && (
                      <div className="flex items-center justify-center w-full">
                        {msg?.fileType?.includes('image') ? (
                          <Link href={getImageUrlOfS3(msg?.attachment)} target='_blank'>
                            <Image width={300} height={300} src={getImageUrlOfS3(msg?.attachment)} alt="Preview" className="w-full h-60 object-cover rounded" />
                          </Link>
                        ) : (
                          <div>
                            <Link href={getImageUrlOfS3(msg?.attachment)} target='_blank' className='flex gap-x-2'>
                              {msg.fileName} <CiFileOn className='text-white w-5  h-5 items-center' />
                            </Link>
                          </div>

                        )}
                      </div>
                    )}
                  </div>
                </div>
                <p className="border-b border-white pb-2 my-3">{msg.description}</p>
                <div className="text-black text-[11px]">
                  {messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {messageDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      {
        messages.length === 0 &&
        <div className="text-center text-gray-600 my-2 font-bold">
          No messages
        </div>
      }
    </div>
  );
}

export default NotificationChat;
