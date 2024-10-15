import React, { ReactNode, useState, CSSProperties } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import PervIcon from "@/assets/images/pervicon.png";
import NextIcon from "@/assets/images/nexticon.png";
import { ViewIcon} from "@/utils/svgicons";
import Therapist1 from "@/assets/images/therapist1.jpg";
import Therapist2 from "@/assets/images/therapist2.jpg";
import Therapist3 from "@/assets/images/therapist3.jpg";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
  }
  
  const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white w-[94%] max-w-[1200px] shadow-lg relative max-h-[90vh] overflo-custom py-[25px] px-[15px] lg:p-[40px]">
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


const PreviousAppointments = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [teamPopupOpen, setTeamPopupOpen] = useState(false);

    const therapists = [
        { id: 1, name: "Therapist One", imageUrl: Therapist1 },
        { id: 2, name: "Therapist Two", imageUrl: Therapist2 },
        { id: 3, name: "Therapist Three", imageUrl: Therapist3 },
        { id: 4, name: "Therapist Three", imageUrl: Therapist3 },
        // Add more therapists here
      ];

    const data = [
        {
          id: 1,
          apptDate: "26 July 2023",
          apptTime: "09:30 AM",
          chatWithClinician: "Yes",
          videoChat: "No",
          billingAmount: "$25.00",
        },
        {
          id: 2,
          apptDate: "26 July 2023",
          apptTime: "09:30 AM",
          chatWithClinician: "No",
          videoChat: "No",
          billingAmount: "$25.00",
        },
        {
          id: 3,
          apptDate: "26 July 2023",
          apptTime: "09:30 AM",
          chatWithClinician: "Yes",
          videoChat: "Yes",
          billingAmount: "$25.00",
        },
        // Add more data as needed
      ];
      // ReactPaginate
  const rowsPerPage = 10;
  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handleViewTeam = () => {
    setTeamPopupOpen(true);
  };
  const handleCloseTeam = () => {
    setTeamPopupOpen(false);
  };
  return (
    <>
      <div className="table-common">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Appt Date</th>
              <th>Appt Time</th>
              <th>Chat With Clinician</th>
              <th>Video Chat</th>
              <th>Billing Amount</th>
              <th>Care Team</th>
            </tr>
          </thead>
          <tbody> 
            {currentRows.map((item) => (
              <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.apptDate}</td>
              <td>{item.apptTime}</td>
              <td>{item.chatWithClinician}</td>
              <td> {item.videoChat}</td>
              <td>{item.billingAmount}</td>
              <td>
              <span className="cursor-pointer w-[26px] flex" onClick={handleViewTeam}>
                    <ViewIcon />
                  </span>
              </td>
            </tr>
             ))}
          </tbody>
        </table>
      </div>
      <div className="text-right reactpaginate ">
        <ReactPaginate
          previousLabel={<Image src={PervIcon} alt="PervIcon" />}
          nextLabel={<Image src={NextIcon} alt="NextIcon" />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(data.length / rowsPerPage)}
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

      {/* Renew Popup Component */}
      <Modal isOpen={teamPopupOpen} onClose={handleCloseTeam}>
        <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
          Care Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[20px] lg:gap-y-[40px]">
          {therapists.map((therapist) => (
            <div key={therapist.id} className="">
              <Image
                src={therapist.imageUrl}
                alt={therapist.name}
                className="rounded-[20px] w-full aspect-square cover"
              />
              <h4 className="mt-4 font-gotham">{therapist.name}</h4> 
            </div>
          ))}
        </div>
        <button
          className="button !bg-transparent !text-[#283c63] border-[#283c63] border-[1px]"
          type="button"
          onClick={handleCloseTeam}
        >
          Close
        </button>
      </Modal>
    </>
  );
};
export default PreviousAppointments;
