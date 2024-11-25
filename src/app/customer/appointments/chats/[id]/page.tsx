'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import imgg from "@/assets/images/banner.jpg"
import { FileUpload, MessageSend, PhotoUpload } from "@/utils/svgicons";

interface Message {
  id: number;
  text: string;
  key: "left" | "right";
  time: string;
}
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
const Page = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", key: "left", time: "07:00 AM" },
    { id: 2, text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", key: "right", time: "07:00 AM" },
    { id: 3, text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", key: "left", time: "07:00 AM" },
    { id: 4, text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", key: "right", time: "07:00 AM" },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    document.body.classList.add("chat-open");

    return () => {
      document.body.classList.remove("chat-open");
    };
  }, []);

  const onTyping = (e:any) => {
    setInputMessage(e.target.value)
  }
  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        text: inputMessage,
        key: "right",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    setInputMessage("");
  }

  return (
    <div>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
      Messages
      </h1>
      <div className=" h-[calc(100vh-168px)] grid grid-cols-[minmax(0,_4fr)_minmax(0,_8fr)] gap-[31px] ">
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
        <div className="flex rel relative overflow-hidden flex-col  bg-white border rounded-[20px]">
        {/* Header */}
        <div className="flex items-center bg-[#26395E] rounded-t-[20px] text-white p-4">
          <div className="flex items-center space-x-3">
            <Image src={imgg} height={200} width={200}
              alt="User Avatar" className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="text-lg font-semibold text-white">Alison Kennedy</h2>
              <p className="text-sm text-white ">Active Now</p>
            </div>
          </div>
          <div className="ml-auto">
            <button className="text-white text-xl">⋮</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 bg-white overflow-y-auto overflo-custom p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.key === "left" ? "justify-start" : "justify-end"} mb-4`}
            >
              <div
                className={`max-w-[70%]  rounded-[10px] ${message.key === "left"
                  ? ""
                  : ""
                  }`}
              >
                <p className={`p-3 rounded-[10px] ${message.key === "left"
                  ? "bg-[#E7F8F6] shadow-md"
                  : "bg-[#CCE9FA]  shadow-md"
                  }`}>{message.text}</p>

                <p className={`text-xs text-[#849DA8] mt-[3px] ${message.key === "left"
                  ? "text-left"
                  : "text-right"
                  }`}>{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <form>
          <div className="bg-white p-[10px] rounded-[10px] border border-[#AEAEAE]  m-3 w-[calc(100%-24px)] left-0  right-0 ">
            <input
              type="text"
              placeholder="Message Alison Kennedy..."
              value={inputMessage}
              onChange={(e) => onTyping(e)}
              className="w-full pb-3 pt-0 px-0 border-none text-base"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <label htmlFor="" className="relative">
                  <input type="image" src="" alt="" className="file-inputs" />
                  <PhotoUpload />
                </label>
                <label htmlFor="" className="relative cursor-pointer">
                  <input type="file" name="" id="" className="file-inputs cursor-pointer" />
                  <FileUpload />
                </label>
              </div>
              <button
                onClick={sendMessage}
              > <MessageSend />
              </button>
            </div>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};
export default Page;

