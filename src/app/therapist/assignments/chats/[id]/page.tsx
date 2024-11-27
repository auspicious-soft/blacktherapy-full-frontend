/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';
import NotificationChat from "../../_components/NotificationChat";
import MainChat from "../../_components/MainChat";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getAppointmentDetails, getChatHistory } from "@/utils";
import { generateSignedUrlOfAppointment } from "@/actions";
import { toast } from "sonner";

const Page = () => {
  const session = useSession()
  const userId = session?.data?.user?.id as string;
  const [isPending, startTransition] = React.useTransition()
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any>([]);
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<any>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const [filePreview, setFilePreview] = React.useState<string | null>(null)
  const [socket, setSocket] = useState<any>(null);
  const params = useParams();
  const roomId = params.id as string
  const [isPeerSupport, setIsPeerSupported] = useState(false)
  containerRef.current?.scrollTo(0, containerRef.current?.scrollHeight)
  const [recieverDetails, setRecieverDetails] = useState<any>(null)
  const [isRecieverOnline, setIsRecieverOnline] = useState(false)

  useEffect(() => {
    if (!recieverDetails) return  // Necessary condition to prevent errors and unexpected behavior
    const socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
      path: '/api/socket.io/',
      withCredentials: true,
      transports: ['webtransport'], // Specify transport methods
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to chat socket server.");
      socketInstance.emit('joinRoom', { sender: userId, roomId })
      socketInstance.emit('checkOnlineStatus', { userId: recieverDetails?._id })
    })

    socketInstance.on("message", (data: any) => {
      setMessages((prevMessages: any) => [...prevMessages, data]);
      setTimeout(() => {
        containerRef.current?.scrollTo(0, containerRef.current?.scrollHeight + 100);
      }, 3000);
    });

    socketInstance.on("typing", (userId: any) => {
      console.log(`User ${userId} is typing...`);
    });

    socketInstance.on("stopTyping", (userId: any) => {
      console.log(`User ${userId} stopped typing.`);
    });

    socketInstance.on("onlineStatus", (data: any) => {
      setIsRecieverOnline(data.isOnline)
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [userId, roomId, recieverDetails?._id])

  useEffect(() => {
    if (socket && recieverDetails?._id) {
      socket.emit('checkOnlineStatus', { userId: recieverDetails?._id })
    }
  }, [socket])

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      const response = await getAppointmentDetails(roomId)
      setIsPeerSupported(response?.data?.clientId?._id !== userId)
      setRecieverDetails(response?.data?.clientId)
    }
    const fetchChatHistory = async () => {
      const response = await getChatHistory(roomId)
      setMessages(response?.data)
    }
    fetchAppointmentDetails()
    fetchChatHistory()

  }, [isPeerSupport, prompt, file])

  const handleSendMessage = async () => {
    startTransition(async () => {
      let fileKey = null
      let fileType = null
      if (socket) {
        if (file) {
          const signedUrl = await generateSignedUrlOfAppointment((file as File).name, file.type, session?.data?.user?.email as string)
          const uploadResponse = await fetch(signedUrl, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
            cache: 'no-store'
          })
          if (!uploadResponse.ok) {
            toast.error('Something went wrong. Please try again')
            return
          }
          fileKey = `appointments/${session?.data?.user?.email}/my-appointment-files/${(file as File).name}`
        }
        socket.emit('message', {
          sender: userId, roomId, message: prompt, attachment: fileKey, fileType: file?.type, fileName: file?.name, ...(isPeerSupport && { isCareMsg: true })
        })
        setPrompt('')
        setFile(null)
        setImagePreview(null)
        setFilePreview(null)
      }
      setTimeout(() => {
        containerRef.current?.scrollTo(0, containerRef.current?.scrollHeight);
      }, 1000)
    })
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
        <MainChat containerRef={containerRef} messages={messages} handleSendMessage={handleSendMessage}
          prompt={prompt} setPrompt={setPrompt}
          file={file} setFile={setFile}
          userId={userId} roomId={roomId}
          handleTyping={handleTyping} handleStopTyping={handleStopTyping}
          recieverDetails={recieverDetails}
          isRecieverOnline={isRecieverOnline}
          isPending={isPending}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          filePreview={filePreview}
          setFilePreview={setFilePreview}
        />
      </div>
    </div>
  );
};

export default Page;