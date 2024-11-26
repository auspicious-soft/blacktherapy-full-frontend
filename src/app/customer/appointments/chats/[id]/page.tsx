/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { use, useEffect, useState } from "react";
import io from 'socket.io-client';
import NotificationChat from "../../_components/NotificationChat";
import MainChat from "../../_components/MainChat";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getAppointmentDetails, getChatHistory } from "@/utils";

const Page = () => {
  const session = useSession();
  const [messages, setMessages] = useState<any>([]);
  const [prompt, setPrompt] = useState("");
  const userId = session?.data?.user?.id as string;
  const [socket, setSocket] = useState<any>(null);
  const params = useParams();
  const roomId = params.id as string
  const [isPeerSupport, setIsPeerSupported] = useState(false);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_URL as string)
    setSocket(socketInstance)
    socketInstance.on("connect", () => {
      console.log("Connected to chat socket server.");
      socketInstance.emit('joinRoom', { sender: userId, roomId });
    })

    socketInstance.on("message", (data: any) => {
      console.log('data: ', data);
      setMessages((prevMessages: any) => [...prevMessages, data]);
    });

    socketInstance.on("typing", (userId: any) => {
      console.log(`User ${userId} is typing...`);
    });

    socketInstance.on("stopTyping", (userId: any) => {
      console.log(`User ${userId} stopped typing.`);
    });

    return () => {
      socketInstance.disconnect();
    }
  }, [userId, roomId])

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      const response = await getAppointmentDetails(roomId)
      setIsPeerSupported(response?.data?.therapistId !== userId)
    }
    const fetchChatHistory = async () => {
      const response = await getChatHistory(roomId)
      setMessages(response?.data)
    }
    fetchAppointmentDetails()
    fetchChatHistory()
  }, [isPeerSupport])

  const handleSendMessage = () => {
    console.log(prompt)
    if (socket && prompt.trim() !== '') {
      socket.emit('message', {
        sender: userId, roomId, message: prompt, attachment: null, ...(isPeerSupport && { isCareMsg: true })
      });
      setPrompt('')
    }
  };

  const handleTyping = () => {
    if (socket) {
      socket.emit('typing', { roomId, userId });
    }
  };

  const handleStopTyping = () => {
    if (socket) {
      socket.emit('stopTyping', { roomId, userId });
    }
  }

  useEffect(() => {
    document.body.classList.add("chat-open");

    return () => {
      document.body.classList.remove("chat-open");
    };
  }, []);

  return (
    <div>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Messages
      </h1>
      <div className="h-[calc(100vh-168px)] grid grid-cols-[minmax(0,_4fr)_minmax(0,_8fr)] gap-[31px]">
        <NotificationChat />
        <MainChat messages={messages} handleSendMessage={handleSendMessage}
          prompt={prompt} setPrompt={setPrompt}
          userId={userId} roomId={roomId}
          handleTyping={handleTyping} handleStopTyping={handleStopTyping}
        />
      </div>
    </div>
  );
};

export default Page;