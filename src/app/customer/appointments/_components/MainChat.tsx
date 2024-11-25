import React from 'react';
import Image from 'next/image';
import imgg from "@/assets/images/banner.jpg"

const MainChat = (messages:any) => {

    
    return (
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
        {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${msg.sender === userId ? "text-right" : "text-left"}`}
              >
                <p className="p-3 rounded-lg shadow-md bg-[#E7F8F6] inline-block max-w-[70%]">
                  <strong>{msg.sender}:</strong> {msg.message}
                </p>
              </div>
            ))}
        </div>

        {/* Input Box */}
        <form>
          <div className="bg-white p-[10px] rounded-[10px] border border-[#AEAEAE]  m-3 w-[calc(100%-24px)] left-0  right-0 ">
            <input
              type="text"
              placeholder="Message Alison Kennedy..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              onKeyPress={handleTyping}
              onKeyUp={handleStopTyping}
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
                onClick={handleSendMessage}
              > <MessageSend />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
}

export default MainChat;
