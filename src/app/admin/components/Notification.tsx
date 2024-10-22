import React, { useEffect } from "react";
import Image from 'next/image';
import success from "@/assets/images/succes.png"; // Make sure the success image path is correct

interface NotificationProps {
  message: string | null;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer); 
    }
  }, [message, onClose]);

  if (!message) return null; 

  return (
    <div className="fixed inset-0 grid place-items-center w-full h-full bg-gray-500 bg-opacity-75">
      <div className="bg-white bg-flower text-[#283C63] py-[60px] rounded-[20px] shadow-lg max-w-[584px] w-full">
        <Image src={success} alt="success" height={130} width={115} className="mx-auto" />
        <h2 className="text-center mt-[40px]">{message}</h2>
      </div>
    </div>
  );
};

export default Notification;
