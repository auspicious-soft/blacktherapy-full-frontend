"use client";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import PervIcon from "@/assets/images/pervicon.png";
import NextIcon from "@/assets/images/nexticon.png";
import React, { useState, ReactNode } from "react";
import { YoutubeIcon } from "@/utils/svgicons";
import ReactLoading from "react-loading";
import Link from "next/link";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[94%] max-w-[1200px] shadow-lg relative max-h-[90vh] overflow-y-auto py-[25px] px-[15px] lg:p-[40px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &#x2715;
        </button>
        {children}
      </div> 
    </div>
  );
};

const AttachmentsWellness = (props: any) => {
  const { handlePageClick, data: wholeData, total, rowsPerPage, isLoading } = props;
  const data = wholeData?.data;
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const openVideoModal = (video: string) => {
    const videoId = video.split('v=')[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    setSelectedVideo(embedUrl);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const renderAttachment = (obj: any) => {
    const fileExtension = obj.attachment.split('.').pop();

    if (fileExtension === 'pdf' || fileExtension ==='docx') {
      return (
        <Link href={obj.attachment} className="" target="_blank">
        <div className="grid place-items-center h-[273px] border rounded-[20px] bg-[#e0f2fc] border-[#CCE9FA] ">
          <div className="rounded-full bg-[#26395E] w-[100px] h-[100px] flex items-center justify-center">
            <span className="text-white text-lg font-bold uppercase">{fileExtension}</span>
          </div>
        
        </div>
      </Link>
      );
    } else if (fileExtension === 'mp4') {
      return (
        <div
          className="cursor-pointer relative"
          onClick={() => openVideoModal(obj.attachment)}
        >
          <Image
            src={obj.thumbnail || "/default-video-thumbnail.png"} // Provide a default thumbnail if none is available
            alt="Video Thumbnail"
            width={300}
            height={200}
            className="rounded-lg object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <YoutubeIcon />
          </div>
        </div>
      );
    } else if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
      return (
        <Image
          src={obj.attachment}
          alt="Image"
          width={300}
          height={200}
          className="rounded-lg object-cover"
        />
      );
    } else {
      return null; // Handle other file types as needed
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-[15px] lg:gap-[24px]">
        {isLoading ? (
          <ReactLoading type={'spin'} color={'#26395e'} height={'20px'} width={'20px'} />
        ) : (
          data?.map((obj: any, index: any) => (
            <div key={index} className="">
              {renderAttachment(obj)}
              <div className="">
                <h5 className="my-4 leading-[normal] text-[#26395E]">{obj.title}</h5>
                <p className="text-sm leading-[normal]">{obj.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {data?.length > 0 && (
        <div className="text-right reactpaginate">
          <ReactPaginate
            previousLabel={<Image src={PervIcon} alt="PervIcon" />}
            nextLabel={<Image src={NextIcon} alt="NextIcon" />}
            breakLabel={"..."}
            pageCount={Math.ceil(total / rowsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]"
            pageClassName="text-[#26395e]"
            pageLinkClassName="py-2 px-4 inline-block"
            activeClassName="bg-[#26395e] rounded-[5px] text-white"
            previousLinkClassName="py-2 px-4 inline-block"
            nextLinkClassName="py-2 px-4 inline-block"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}

      <Modal isOpen={selectedVideo !== null} onClose={closeVideoModal}>
        {selectedVideo && (
          <iframe
            src={selectedVideo}
            className="w-full rounded-[20px] object-cover"
            height="500"
            allowFullScreen
          />
        )}
      </Modal>
    </>
  );
};

export default AttachmentsWellness;
