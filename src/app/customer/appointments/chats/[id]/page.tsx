'use client'
import Image from "next/image";
import React, { useState } from "react";
import imgg from "@/assets/images/banner.jpg"

interface Message {
  id: number;
  text: string;
  key: "left" | "right";
  time: string;
}

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", key: "left", time: "07:00 AM" },
    { id: 2, text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", key: "right", time: "07:00 AM" },
    { id: 3, text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", key: "left", time: "07:00 AM" },
    { id: 4, text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", key: "right", time: "07:00 AM" },
  ]);

  const [inputMessage, setInputMessage] = useState("");

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
  };

  return (
    <div className="flex rel relative overflow-hidden flex-col h-screen bg-blue-50">
      {/* Header */}
      <div className="flex items-center bg-blue-600 text-white p-4">
        <div className="flex items-center space-x-3">
            <Image src={imgg} height={200} width={200}
            alt="User Avatar" className="w-10 h-10 rounded-full"/>
            <div>
            <h2 className="text-lg font-semibold">Alison Kennedy</h2>
            <p className="text-sm">Active Now</p>
          </div>
        </div>
        <div className="ml-auto">
          <button className="text-white text-xl">⋮</button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.key === "left" ? "justify-start" : "justify-end"} mb-4`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.key === "left"
                  ? "bg-white shadow-md"
                  : "bg-blue-500 text-white shadow-md"
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs text-gray-500 mt-2 text-right">{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="bg-white p-4 border-t border-gray-200 sticky bottom-0 w-full left-0     right-0 flex items-center space-x-3">
        <input
          type="text"
          placeholder="Message Alison Kennedy..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default Page;

