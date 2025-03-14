import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import PervIcon from "@/assets/images/pervicon.png";
import NextIcon from "@/assets/images/nexticon.png";
import { ViewIcon } from "@/utils/svgicons";
import Modal from 'react-modal';
import { getImageUrlOfS3, nonMilitaryTime } from "@/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import profilePic from "@/assets/images/profile.png";
import ReactLoader from "@/components/ReactLoader";

export interface PreviousAppointmentsProps {
  data: any;
  error: any;
  isLoading: boolean;
  setQuery: any;
  isChatAllowed: boolean;
  isVideoCount: number;
  message: boolean;
  video: boolean;
}

const PreviousAppointments = (props: PreviousAppointmentsProps) => {
  const { data, error, isLoading, setQuery, isChatAllowed, isVideoCount, message, video } = props;
  const router = useRouter();
  const [careTeam, setCareTeam] = useState<any>();
  const previousData = data?.data;

  const total = data?.total ?? 0;
  const rowsPerPage = 10;
  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }
  const [teamPopupOpen, setTeamPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChat = (id: string) => {
    setLoading(true);
    isChatAllowed ? router.push(`/customer/appointments/chats/${id}`) : toast.error('Chat not allowed')
  }

  const handleViewTeam = (care: any) => {
    setCareTeam(care);
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
              <th>Appt Date</th>
              <th>Appt Time</th>
              <th>Chat With Clinician</th>
              <th>Video Chat</th>
              <th>Status</th>
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
              previousData?.map((item: any) => {
                const disableIfLessThan = new Date(item?.appointmentDate).toDateString() === new Date().toDateString() ? false : new Date(item?.appointmentDate) <= new Date()
                return (
                  <tr key={item?._id}>
                    <td>{new Date(item?.appointmentDate?.split('T')[0]).toLocaleDateString('en-US')}</td>
                    <td>{nonMilitaryTime(item.appointmentTime)}</td>

                    <td>
                      {message ? (
                        <button
                          disabled={disableIfLessThan || item?.status == 'Completed'}
                          onClick={() => handleChat(item._id)}
                          className={`font-gothamMedium cursor-pointer  inline-block text-center rounded-3xl py-[2px] px-[10px] text-[10px] ${isChatAllowed ? 'text-[#42A803] bg-[#CBFFB2]' : 'text-[#FFA234] bg-[#FFFCEC]'}`}
                        >
                          {isChatAllowed ? 'Start Chat' : 'Chat not allowed'}
                        </button>
                      ) : (
                        <p className="cursor-not-allowed">
                          No Chat
                        </p>
                      )}
                    </td>

                    <td>
                      {video ?
                        <button
                          disabled={item?.status === 'Completed' || disableIfLessThan || item?.status === 'Pending' || item?.status === 'Rejected'}
                          className={`cursor-pointer font-gothamMedium inline-block text-center rounded-3xl py-[2px] px-[10px] text-[10px] ${(isVideoCount > 0 || !disableIfLessThan) ? 'text-[#42A803] bg-[#CBFFB2]' : 'text-[#FFA234] bg-[#FFFCEC]'}`}>
                          {(isVideoCount > 0 || !disableIfLessThan) ? <div onClick={() => window.location.href = `/customer/appointments/video-chat/${item?._id}`}>{`Start Video`}</div> : 'Video chat limit reached for current plan'}
                        </button>
                        :
                        <p className="cursor-not-allowed">No Video</p>}
                    </td>

                    <td>
                      {item?.status}
                    </td>
                    <td>

                      <span className="cursor-pointer w-[26px] flex" onClick={() => handleViewTeam(item?.peerSupportIds)}>
                        <ViewIcon />
                      </span>
                    </td>
                  </tr>
                )
              })
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
      <Modal
        isOpen={teamPopupOpen}
        onRequestClose={handleCloseTeam}
        overlayClassName="w-full h-full p-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        className="modal max-w-[90%] py-[25px] px-[15px] lg:p-[40px] bg-white mx-auto rounded-[20px] w-full max-h-[90vh] overflow-auto"
      >
        <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
          Care Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[20px] lg:gap-y-[40px]">
          {careTeam?.map((therapist: any) => (
            <div key={therapist._id} className="">
              <Image
                src={therapist?.profilePic.includes('undefined') || !therapist?.profilePic ? profilePic : getImageUrlOfS3(therapist?.profilePic)} alt={therapist?.firstName}
                width={200}
                height={200}
                className="rounded-[20px] w-full aspect-square cover"
              />
              <h4 className="mt-4 font-gotham">{therapist?.firstName} {therapist?.lastName}</h4>
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

      {
        loading && <div className="text-white fixed inset-0 flex items-center justify-center bg-white bg-opacity-20 z-50">
          <ReactLoader />
        </div>
      }
    </>
  );
};
export default PreviousAppointments;
