import React from 'react';
import Image from 'next/image';
import imgg from "@/assets/images/banner.jpg"
import { FileUpload, MessageSend, PhotoUpload } from '@/utils/svgicons';

const MainChat = (props: any) => {
  const { prompt, setPrompt, handleSendMessage, handleTyping, handleStopTyping, messages, userId, roomId, containerRef, recieverDetails } = props;

  return (
    <div className="flex rel relative overflow-hidden flex-col  bg-white border rounded-[20px]">
      {/* Header */}
      <div className="flex items-center bg-[#26395E] rounded-t-[20px] text-white p-4">
        <div className="flex items-center space-x-3">
          <Image src={imgg} height={200} width={200}
            alt="User Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="text-lg font-semibold text-white">{recieverDetails?.firstName} {recieverDetails?.lastName}</h2>
            <p className="text-sm text-white ">{recieverDetails?.isOnline ? 'Active Now' : 'Offline'}</p>
          </div>
        </div>
        <div className="ml-auto">
          <button className="text-white text-xl">⋮</button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white overflow-y-auto overflo-custom p-4 relative" ref={containerRef}>
        {messages.map((msg: any, index: number) => (
          <div
            key={index}
            className={`mb-2 ${(msg.sender._id || msg.sender) === userId ? "text-right" : "text-left"}`}
          >
            <div className={`p-3 rounded-lg shadow-md ${(msg.sender._id || msg.sender) === userId ? "bg-[#26395e]" : "bg-[#b4deee]"} inline-block max-w-[70%]`}>
              {msg.message}
            </div>
              <div className="text-black text-[11px]">
                {new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}

              </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form>
        <div className="bg-white p-[10px] rounded-[10px] border border-[#AEAEAE]  m-3 w-[calc(100%-24px)] left-0  right-0 ">
          <input
            required
            type="text"
            placeholder="Message Alison Kennedy..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage()
              }
            }}
            onKeyDownCapture={handleTyping}
            onKeyUpCapture={handleStopTyping}
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
            <button onClick={handleSendMessage}> <MessageSend /></button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MainChat;
