import React, { useEffect } from 'react';
import Image from 'next/image';
import imgg from "@/assets/images/banner.jpg"
import { CloseIcon, FileAttachment, FileUpload, MessageSend, PhotoUpload } from '@/utils/svgicons';
import { formatDate, getImageUrlOfS3 } from '@/utils';
import Link from 'next/link';
import { CiFileOn } from "react-icons/ci";


const MainChat = (props: any) => {
  const {titleText, isRecieverOnline, imagePreview, setImagePreview, filePreview, setFilePreview, prompt, setPrompt, isPending, file, setFile, handleSendMessage, handleTyping, handleStopTyping, messages, userId, roomId, containerRef, recieverDetails } = props
 


  useEffect(() => {
    if (file) {
      if (file.type.includes('image')) {
        setImagePreview(URL.createObjectURL(file))
        setFilePreview(null)
      }
      else {
        setFilePreview(file.name)
        setImagePreview(null)
      }
    }
  }, [file])


  let lastDate: string | null = null;

  return (
    <div className="flex flex-grow rel relative overflow-hidden flex-col  bg-white border rounded-[20px]">
      {/* Header */}
      <div className="flex items-center bg-[#26395E] rounded-t-[20px] text-white p-4">
        <div className="flex items-center space-x-3">
          <Image src={imgg} height={200} width={200}
            alt="User Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="text-lg font-semibold text-white"> {`${titleText?.clientName}`}</h2>
            {/* <p className="text-sm text-white ">{isRecieverOnline ? 'Active Now' : 'Offline'}</p> */}
          </div>
        </div>
        {/* <div className="ml-auto">
          <button className="text-white text-xl">⋮</button>
        </div> */}
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white overflow-y-auto overflo-custom p-4 relative" ref={containerRef}>
        {messages?.map((msg: any, index: number) => {
          const messageDate = new Date(msg.createdAt)
          const formattedDate = formatDate(messageDate)
          const showDateDivider = formattedDate !== lastDate
          lastDate = formattedDate

          return (
            <React.Fragment key={index}>
              {showDateDivider && (
                <div className="text-center text-gray-600 my-2 font-bold">
                  {formattedDate}
                </div>
              )}
              {/* <div className={`mb-2 ${(msg.sender._id || msg.sender) === userId ? "text-right" : "text-left"}`}> */}

              <div className={`mb-2 ${(msg.reciever) === 'support' ? "text-left " : "text-right"}`}>
                <div className={`px-3 py-2 text-sm leading-[normal] text-[#686C78] rounded-lg shadow-md ${(msg.reciever) === 'support' ? "bg-[#CCE9FA]" : "bg-[#E7F8F6]"} inline-block max-w-[70%]`}>
                  {msg?.message}
                  {msg?.attachment && (
                    <div className="flex items-center justify-center">
                      {msg.fileType.includes('image') ? (
                        <Link href={getImageUrlOfS3(msg?.attachment)} target='_blank'>
                          <Image width={300} height={300} src={getImageUrlOfS3(msg?.attachment)} alt="Preview" className="w-60 h-60 object-cover rounded" />
                        </Link>
                      ) : (
                        <div>
                          <Link href={getImageUrlOfS3(msg?.attachment)} target='_blank' className='flex gap-x-2'>
                            {msg.fileName} <CiFileOn className='text-white w-5  h-5 items-center' />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="text-[#849DA8] mt-[3px] text-xs">
                  {messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Input Box */}
      <form>
        <div className="bg-white p-[10px] rounded-[10px] border border-[#AEAEAE]  m-3 w-[calc(100%-24px)] left-0  right-0 ">
          <input
            required
            type="text"
            placeholder={`Message ${titleText?.clientName}...`}
            // placeholder={recieverDetails 
            //   ? `Message to ${recieverDetails?.firstName} ${recieverDetails?.lastName}...` 
            //   : 'Messages...'}
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
              <label htmlFor="" className="relative cursor-pointer">
                <input type="file" className="file-inputs cursor-pointer"
                  onChange={(e) => setFile(e?.target?.files ? e.target.files[0] : null)} />
                <FileUpload />
              </label>
              {imagePreview && (
                <div className='relative'>
                  <p onClick={() => {
                    setImagePreview(null)
                    setFilePreview(null)
                    setFile(null)
                  }} className='absolute -top-4 border right-1 shadow-lg cursor-pointer w-1 h-1 text-white text-xs'><CloseIcon /></p>
                  <Image width={300} height={300} src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded" />
                </div>
              )}
              {filePreview && (
                <div className='relative'>
                  <p onClick={() => {
                    setImagePreview(null)
                    setFilePreview(null)
                    setFile(null)
                  }} className='absolute -top-2 border right-2 shadow-lg cursor-pointer w-1 h-1 text-white text-xs'><FileAttachment /></p>
                  <div className="bg-[#f5f5f5] p-2 rounded-lg">
                    <p>{filePreview}</p>
                    <p className="text-xs text-gray-500">File size: {file.size} bytes</p>
                  </div>
                </div>
              )}
            </div>
            <button disabled={isPending} onClick={handleSendMessage}> <MessageSend /></button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MainChat;