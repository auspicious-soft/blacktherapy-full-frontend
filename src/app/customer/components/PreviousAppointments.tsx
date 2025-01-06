import React, { ReactNode, useState, CSSProperties } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import PervIcon from "@/assets/images/pervicon.png";
import NextIcon from "@/assets/images/nexticon.png";
import { ViewIcon } from "@/utils/svgicons";
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


const PreviousAppointments = (props: any) => {
  const { isLoading } = props
  const { data, error } = props;
  const { setQuery } = props;

  const previousData = data?.data;
  const total = data?.total ?? 0;
  const rowsPerPage = 10;
  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }
  const [teamPopupOpen, setTeamPopupOpen] = useState(false);

  const therapists = [
    { id: 1, name: "Therapist One", imageUrl: Therapist1 },
    { id: 2, name: "Therapist Two", imageUrl: Therapist2 },
    { id: 3, name: "Therapist Three", imageUrl: Therapist3 },
    { id: 4, name: "Therapist Three", imageUrl: Therapist3 },
    // Add more therapists here
  ];

  const handleViewTeam = () => {
    setTeamPopupOpen(true);
  };
  const handleCloseTeam = () => {
    setTeamPopupOpen(false);
  };
  return (
    <>
      <div className="table-common overflo-custom">
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
            {isLoading ? (
              <tr>
                <td colSpan={5} className="">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="text-center text-red-500 ">
                  Error loading data.
                </td>
              </tr>
            ) : previousData?.length > 0 ? (
              previousData?.map((item: any) => (
                <tr key={item?._id}>
                  <td>{item?._id}</td>
                  <td>{Number(item?.apptDate?.split(':')[0]) < 12 ? ' AM' : ' PM'}</td>
                  <td>{item.apptTime}</td>
                  <td>
                    <p className={`font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px] ${item.chat === 'Start Chat' ? ' text-[#42A803] bg-[#CBFFB2] ' : ' text-[#FFA234] bg-[#FFFCEC] '}`}>
                      {!item.message ? 'No chat' : <p className='cursor-pointer font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px]  text-[#42A803] bg-[#CBFFB2]'>Start Chat</p>}
                    </p>
                  </td>
                  <td>{!item.video ? 'No video' : <p className='cursor-pointer font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px]  text-[#42A803] bg-[#CBFFB2]'>Start Video</p>}</td>
                  <td>{item.billingAmount}</td>
                  <td>
                    <span className="cursor-pointer w-[26px] flex" onClick={handleViewTeam}>
                      <ViewIcon />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="w-full flex justify-center p-3 items-center"
                  colSpan={5}
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="text-right reactpaginate ">
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
