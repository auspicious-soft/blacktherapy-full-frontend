import React from 'react';
import Image from 'next/image';
import imgg from "@/assets/images/banner.jpg"
import Link from 'next/link';
import { formatDate, getImageUrlOfS3 } from '@/utils';
import { CiFileOn } from 'react-icons/ci';
import { useSession } from 'next-auth/react';


const notifications = [
  {
    id: 1,
    title: "Care Coordinators",
    subtitle: "Available 24/7",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nihil voluptatem provident explicabo ut fugiat at et tempora aliquid quia?",
    footer: "From You: BMI 47",
  },
  {
    id: 2,
    title: "Care Managers",
    subtitle: "Available 9 AM - 5 PM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nihil voluptatem provident explicabo ut fugiat at et tempora aliquid quia?",
    footer: "From You: BMI 28",
  },
  {
    id: 3,
    title: "Support Team",
    subtitle: "Available 24/7",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nihil voluptatem provident explicabo ut fugiat at et tempora aliquid quia?",
    footer: "From You: BMI 32",
  },
];
const NotificationChat = (props: any) => {
  const { messages } = props
  const session = useSession()
  const userId = session?.data?.user?.id as string;
  let lastDate: string | null = null;

  return (
    <div className="bg-white overflow-y-auto overflo-custom p-5 rounded-[20px]  ">
      <h3 className="leading-[normal] mb-5">Care Team Messages</h3>
      {messages?.map((msg: any, index: number) => {
        const messageDate = new Date(msg.createdAt)
        const formattedDate = formatDate(messageDate)
        lastDate = formattedDate

        return (
          <React.Fragment key={index}>
            <div key={msg._id} className="bg-[#EBF3F8] rounded-lg p-3 mb-3">
              <div className="flex gap-2 border-b border-white pb-2">
                <Image
                  src={getImageUrlOfS3(msg.profilePic)}
                  height={40}
                  width={40}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-bold">{msg.title}</p>
                  <p>{msg.subtitle}</p>
                </div>
              </div>
              <p className="border-b border-white pb-2 my-3">{msg.description}</p>
              <p>{msg.footer}</p>
            </div>
            <div className={`mb-2 ${(msg.sender._id || msg.sender) === userId ? "text-right" : "text-left"}`}>
              <div className={`p-3 rounded-lg shadow-md ${(msg.sender._id || msg.sender) === userId ? "bg-[#26395e]" : "bg-[#b4deee]"} inline-block max-w-[70%]`}>
                {msg.message}
                {msg.attachment && (
                  <div className="flex items-center justify-center">
                    {msg.fileType.includes('image') ? (
                      <Link href={getImageUrlOfS3(msg.attachment)} target='_blank'>
                        <Image width={300} height={300} src={getImageUrlOfS3(msg.attachment)} alt="Preview" className="w-60 h-60 object-cover rounded" />
                      </Link>
                    ) : (
                      <div>
                        <Link href={getImageUrlOfS3(msg.attachment)} target='_blank' className='flex gap-x-2'>
                          {msg.fileName} <CiFileOn className='text-white w-5  h-5 items-center' />
                        </Link>
                      </div>

                    )}
                  </div>
                )}
              </div>
              <div className="text-black text-[11px]">
                {messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default NotificationChat;
