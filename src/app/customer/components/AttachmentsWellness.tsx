"use client";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import PervIcon from "@/assets/images/pervicon.png";
import NextIcon from "@/assets/images/nexticon.png";
import Therapist1 from "@/assets/images/therapist1.jpg";
import Therapist2 from "@/assets/images/therapist2.jpg";
import React, { useState, ReactNode } from "react";
import { YoutubeIcon } from "@/utils/svgicons";

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

const AttachmentsWellness = () => {
  const [selectedVideo, setSelectedVideo] = useState<typeof Therapist1 | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const images = [
    {
      id: 1,
      src: Therapist1,
      Title: "Name of the video here",
      dis: "Enhance your well-being with expert-led videos on yoga, meditation.",
    },
    {
      id: 2,
      src: Therapist2,
      Title: "Name of the video here",
      dis: "Enhance your well-being with expert-led videos on yoga, meditation.",
    },
    {
      id: 3,
      src: Therapist1,
      Title: "Name of the video here",
      dis: "Enhance your well-being with expert-led videos on yoga, meditation.",
    },
    {
      id: 4,
      src: Therapist2,
      Title: "Name of the video here",
      dis: "Enhance your well-being with expert-led videos on yoga, meditation.",
    },
    {
      id: 5,
      src: Therapist1,
      Title: "Name of the video here",
      dis: "Enhance your well-being with expert-led videos on yoga, meditation.",
    },
    {
      id: 6,
      src: Therapist2,
      Title: "Name of the video here",
      dis: "Enhance your well-being with expert-led videos on yoga, meditation.",
    },
    {
      id: 7,
      src: Therapist1,
      Title: "Name of the video here",
      dis: "Enhance your well-being with expert-led videos on yoga, meditation.",
    },
    {
      id: 8,
      src: Therapist2,
      Title: "Name of the video here",
      dis: "Enhance your well-being with expert-led videos on yoga, meditation.",
    },
    {
      id: 9,
      src: Therapist1,
      Title: "Name of the video here",
      dis: "Enhance your well-being with expert-led videos on yoga, meditation.",
    },
  ];

  const openVideoModal = (image: typeof Therapist1) => {
    setSelectedVideo(image);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  // ReactPaginate
  const rowsPerPage = 6;
  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = images.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-[15px] lg:gap-[24px]">
        {currentRows.map((image, index) => (
          <div key={index}>
            <div
              className="cursor-pointer relative"
              onClick={() => openVideoModal(image.src)}
            >
              <Image
                src={image.src}
                alt={image.Title}
                className="w-full rounded-[20px] aspect-[1/0.8] object-cover"
              />
            </div>
            <div> 
              <h5 className="mt-[14px] mb-[5px]">{image.Title}</h5>
              <p>{image.dis}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right reactpaginate">
        <ReactPaginate
          previousLabel={<Image src={PervIcon} alt="PervIcon" />}
          nextLabel={<Image src={NextIcon} alt="NextIcon" />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(images.length / rowsPerPage)}
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
      </div>

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
