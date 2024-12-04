/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getAppointmentDetails, getChatHistory, getQueriesHistory, getTicketDetails } from "@/utils";
import { generateSignedUrlOfAppointment, generateSignedUrlOfQueries } from "@/actions";
import { toast } from "sonner";
import MainChat from "@/app/admin/tickets-page/_components/MainChat";


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
  containerRef.current?.scrollTo(0, containerRef.current?.scrollHeight)
  const [recieverDetails, setRecieverDetails] = useState<any>(null)
  const [isRecieverOnline, setIsRecieverOnline] = useState(false)
  const [isReciever, setIsReciever] = useState<any>(null);

  useEffect(() => {
    if (!recieverDetails) return  // Necessary condition to prevent errors and unexpected behavior
    const socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
      // path: '/api/socket.io/',
      withCredentials: true,
      transports: ['websocket'], // Specify transport methods
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to chat socket server.");
      socketInstance.emit('joinQueryRoom', { sender: userId, roomId })
      socketInstance.emit('checkOnlineStatus', { userId: recieverDetails })
    })

    socketInstance.on("queryMessage", (data: any) => {
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
  }, [userId, roomId, recieverDetails])

  useEffect(() => {
    const fetchTicketDetails = async () => {
      const response = await getTicketDetails(roomId);
      if (response) {
        setRecieverDetails(response?.data?.data?.sender);
        setIsReciever(response?.data?.data);
      }
    }

    const fetchQueriesHistory = async () => {
      const response = await getQueriesHistory(roomId)
      setMessages(response?.data)
    }

    fetchTicketDetails();
    fetchQueriesHistory();

  }, [file, roomId])

  const handleSendMessage = async () => {
    startTransition(async () => {
      let fileKey: any = null
      let fileType = null
      if (socket) {
        if (file) {
          const signedUrl = await generateSignedUrlOfQueries((file as File).name, file.type, session?.data?.user?.email as string)
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
          fileKey = `queries/${session?.data?.user?.email}/my-queries-files/${(file as File).name}`
        }
        socket.emit('queryMessage', {
          sender: userId, roomId, message: prompt, attachment: fileKey, fileType: file?.type, fileName: file?.name
        })
        setPrompt('')
        setFile(null)
        setImagePreview(null)
        setFilePreview(null)
      }
      file && window.location.reload()
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
        Queries #{isReciever?.title}
      </h1>

      <div className="h-[calc(100vh-168px)] flex gap-[31px]">
        <MainChat containerRef={containerRef} messages={messages} handleSendMessage={handleSendMessage}
          titleText={isReciever}
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