"use client";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import PervIcon from "@/assets/images/pervicon.png";
import NextIcon from "@/assets/images/nexticon.png";
import Therapist1 from "@/assets/images/therapist1.jpg";
import Therapist2 from "@/assets/images/therapist2.jpg";
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
  const data = wholeData?.data
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);


  const openVideoModal = (video: string) => {
    const videoId = video.split('v=')[1]
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`
    setSelectedVideo(embedUrl);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-[15px] lg:gap-[24px]">
        {isLoading ? (
          <ReactLoading type={'spin'} color={'#26395e'} height={'20px'} width={'20px'} />
        )
          :
          data?.map((obj: any, index: any) => {
            console.log('image: ', obj);
            return (
              <div key={index}>
                <div
                  className="cursor-pointer relative"
                  onClick={() => openVideoModal(obj.src)}
                >
                 <Link href={obj.attachment} className="text-black">Open Attachement</Link>
                </div>
                <div>
                  <h5 className="mt-[14px] mb-[5px]">{obj.title}</h5>
                  <p>{obj.description}</p>
                </div>
              </div>
            )
          }
          )}
      </div>

      {data?.length > 0 && <div className="text-right reactpaginate">
        <ReactPaginate
          previousLabel={<Image src={PervIcon} alt="PervIcon" />}
          nextLabel={<Image src={NextIcon} alt="NextIcon" />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(total / rowsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={
            "inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]"
          }
          pageClassName={"text-[#26395e]"} // List item
          pageLinkClassName={"py-2 px-4 inline-block"} // Anchor tag
          activeClassName={"bg-[#26395e] rounded-[5px] text-white"} // Active anchor
          previousLinkClassName={"py-2 px-4 inline-block"}
          nextLinkClassName={"py-2 px-4 inline-block"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>}

      <Modal isOpen={selectedVideo !== null} onClose={closeVideoModal}>
        {selectedVideo && (
          <div>
            <Image
              src={selectedVideo}
              alt="Selected Video"
              className="w-full rounded-[20px] object-cover"
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default AttachmentsWellness;
