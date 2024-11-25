'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FileUpload, MessageSend, PhotoUpload } from "@/utils/svgicons";
import io from 'socket.io-client';
import NotificationChat from "../../_components/NotificationChat";
import MainChat from "../../_components/MainChat";


const Page = () => {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [prompt, setPrompt] = useState("");
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState<string>("");

   useEffect(() => {
    const socketInstance = io("http://localhost:8000"); 
    setSocket(socketInstance);

    socketInstance.emit("joinRoom", { sender: userId, roomId });

    socketInstance.on("connect", () => {
      console.log("Connected to socket server.");
    });
    return () => {
      socketInstance.disconnect();
    };
  }, [userId, roomId]);
  const handleSendMessage = () => {
    if (socket && prompt.trim() !== '') {
      socket.emit('message', { sender: userId, roomId, prompt, attachment: null });
      setPrompt('');
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
  };
  useEffect(() => {
    if (socket) {
      // Receive messages
      socket.on("message", (data: any) => {
        setMessages((prevMessages: any) => [...prevMessages, data]);
      });

      socket.on("typing", (userId: any ) => {
        console.log(`User ${userId} is typing...`);
      });

      socket.on("stopTyping", ( userId: any ) => {
        console.log(`User ${userId} stopped typing.`);
      });
    }
  }, [socket]);
    

    
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
      <div className=" h-[calc(100vh-168px)] grid grid-cols-[minmax(0,_4fr)_minmax(0,_8fr)] gap-[31px] ">
       <NotificationChat/>
      <MainChat messages ={messages } />
      </div>
    </div>
  );
};
export default Page;

