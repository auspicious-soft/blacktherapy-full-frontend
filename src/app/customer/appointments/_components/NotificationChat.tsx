import React from 'react';
import Image from 'next/image';
import imgg from "@/assets/images/banner.jpg"


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
const NotificationChat = () => {
    return (
        <div className="bg-white overflow-y-auto overflo-custom p-5 rounded-[20px]  ">
        <h3 className="leading-[normal] mb-5">Care Team Messages</h3>
        {notifications.map((message) => (
      <div key={message.id} className="bg-[#EBF3F8] rounded-lg p-3 mb-3">
        <div className="flex gap-2 border-b border-white pb-2">
          <Image
            src={imgg}
            height={40}
            width={40}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-bold">{message.title}</p>
            <p>{message.subtitle}</p>
          </div>
        </div>
        <p className="border-b border-white pb-2 my-3">{message.description}</p>
        <p>{message.footer}</p>
      </div>
    ))}
      </div>
    );
}

export default NotificationChat;
