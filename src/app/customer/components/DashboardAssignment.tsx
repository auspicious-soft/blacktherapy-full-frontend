"use client";
import React, { ReactNode, useState, CSSProperties } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import PervIcon from "@/assets/images/pervicon.png";
import NextIcon from "@/assets/images/nexticon.png";
import { ViewIcon, ButtonArrow, CloseIcon } from "@/utils/svgicons";
import demo from "@/assets/images/square.jpg";
import ReactLoading from "react-loading";
import router, { Router } from "next/router";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import { getImageUrlOfS3 } from "@/utils";
import { toast } from "sonner";


const DashboardAssignment = (props: any) => {
  const { total, data, rowsPerPage, isLoading, error, setQuery, isChatAllowed, isVideoCount, message, video } = props;
  const router = useRouter();
  const [renewPopupOpen, setRenewPopupOpen] = useState(false);
  const [teamPopupOpen, setTeamPopupOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);


  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  };

  const viewProfile = (therapist: any) => {
    router.push(
      `/customer/dashboard/care/${therapist.therapistId}?firstName=${therapist.firstName}&lastName=${therapist.lastName}`
    );
  };
  const handleViewTeam = (row: any) => {
    setSelectedAppointment(row.peerSupportIds);
    setTeamPopupOpen(true);
  };
  const handleCloseTeam = () => {
    setTeamPopupOpen(false);
  };
  const renewClosePopup = () => {
    setRenewPopupOpen(false);
  };

  const handleChat = (id: string) => {
    isChatAllowed ? router.push(`/customer/appointments/chats/${id}`) : toast.error('Chat not allowed')
  };

  return (
    <>
      <h3 className="mb-[20px]">Appointment details</h3>
      <div className="table-common overflo-custom">
        <table>
          <thead>
            <tr>
              <th>Appt Date</th>
              <th>Appt Time</th>
              <th>Chat With Clinician</th>
              <th>Video Chat</th>
              <th>Care Team</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className=""><ReactLoading type="spin" color="#26395e" height={20} width={20} /></td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="text-center text-red-500">Error loading data.</td>
              </tr>
            ) : data?.length > 0 ? (
              data?.map((row: any) => {
                const disableIfLessThan = new Date(row?.appointmentDate).toDateString() === new Date().toDateString() ? false : new Date(row?.appointmentDate) <= new Date()
                return (  
                  <tr key={row?._id}>
                    <td>{row?.appointmentDate ? new Date(row?.appointmentDate).toLocaleDateString('en-US') : 'No date Assigned'}</td>
                    <td>{row?.appointmentTime ? (row?.appointmentTime) : 'Not Assigned Yet'}{Number(row?.appointmentTime?.split(':')[0]) < 12 ? ' AM' : ' PM'}</td>
                    <td>
                      {message ? (
                        <button
                          disabled={row?.status === 'Completed' || disableIfLessThan}
                          onClick={() => handleChat(row._id)}
                          className={`font-gothamMedium cursor-pointer  inline-block text-center rounded-3xl py-[2px] px-[10px] text-[10px] ${isChatAllowed ? 'text-[#42A803] bg-[#CBFFB2]' : 'text-[#FFA234] bg-[#FFFCEC]'}`}
                        >
                          {isChatAllowed ? 'Start Chat' : 'Chat not allowed'}
                        </button>
                      ) : (
                        <button className="cursor-not-allowed">
                          No Chat
                        </button>
                      )}
                    </td>
                    <td>{video ?
                      <button disabled={row?.status === 'Completed' || disableIfLessThan} className={`cursor-pointer font-gothamMedium inline-block text-center rounded-3xl py-[2px] px-[10px] text-[10px] ${isVideoCount > 0 ? 'text-[#42A803] bg-[#CBFFB2]' : 'text-[#FFA234] bg-[#FFFCEC]'}`}>
                        {isVideoCount > 0 ?
                          <button onClick={() => window.location.href = `/customer/appointments/video-chat/${row?._id}`}>
                            {`Start Video (${isVideoCount})`}
                          </button>
                          :
                          'Video chat limit reached for current plan'
                        }
                      </button>
                      :
                      <p className="cursor-not-allowed">No Video</p>
                    }</td>
                    <td>
                      <span className="cursor-pointer w-[26px] flex" onClick={() => handleViewTeam(row)}>
                        <ViewIcon />
                      </span>
                    </td>
                    <td>{new Date(row?.createdAt).toLocaleDateString('en-US')}</td>
                  </tr>
                )
              }
              )
            ) : (
              <tr>
                <td className='w-full flex justify-center p-3 items-center' colSpan={5} >No data found</td>
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
        isOpen={renewPopupOpen}
        onRequestClose={renewClosePopup}
        contentLabel="Assign Task"
        className="modal max-w-[584px] mx-auto bg-white rounded-xl w-full p-5"
        overlayClassName="overlay">
        <div className="popup-content">
          <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
            Renew Plan
          </h1>
          <div className="">
            <h2>Select your Plan</h2>
            <form
              acceptCharset="UTF-8"
              action=""
              method="post"
              id="payment-form"
              className="space-y-8"
            >
              <div className="Plane-widget !mt-[10px]">
                <p className="max-w-[1000px] w-full">
                  Your previous plan is already selected. If you cannot change
                  your plan, please ignore this message. If you can make a
                  change, please select from the options below.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[15px]">
                  <div className="form-group card-label max-w-[430px] w-full">
                    <select name="about_plane" className="w-full">
                      <option value="Video , Messaging" selected>
                        Video , Messaging
                      </option>
                      <option value="Messaging">Messaging</option>
                      <option value="Video , Messaging , Workshops">
                        Video , Messaging , Workshops
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="payment-widget max-w-[840px] w-full">
                <h3>Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="form-group card-label">
                    <input
                      type="text"
                      id="card_name"
                      placeholder="Name on Card"
                      className="w-full"
                    />
                  </div>
                  <div className="form-group card-label">
                    <input
                      type="text"
                      id="cardNumber"
                      className="w-full"
                      placeholder=" Card Number"
                      maxLength={19}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="form-group card-label max-w-[230px] w-full">
                    <input
                      type="text"
                      id="cvc"
                      className="w-full"
                      placeholder="CVV"
                      maxLength={13}
                    />
                  </div>
                  <div className="form-group card-label max-w-[185px] w-full">
                    <input
                      type="text"
                      id="expiration"
                      className="w-full"
                      placeholder="Expiry Month"
                      maxLength={2}
                    />
                  </div>
                  <div className="form-group card-label max-w-[185px] w-full">
                    <input
                      type="text"
                      id="Year"
                      className="w-ful"
                      placeholder="Expiry Year"
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="submit-section flex gap-[20px] items-center mt-4">
                  <button type="submit" className="button">
                    Confirm and Pay <ButtonArrow />
                  </button>
                  <button
                    className="button !bg-transparent !text-[#283c63] border-[#283c63] border-[1px]"
                    type="button"
                    onClick={renewClosePopup}
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={teamPopupOpen}
        onRequestClose={handleCloseTeam}
        contentLabel="Assign Task"
        className="modal max-w-[1200px] mx-auto bg-white rounded-[20px] w-full "
        overlayClassName="w-full h-full p-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <div className="p-4 bg-[#283C63] rounded-t-[20px] flex justify-between items-center mb-8 ">
          <h1 className="font-antic text-[#fff] text-[30px] lg:text-[40px] ">
            Care Team
          </h1>
          <button onClick={handleCloseTeam}><CloseIcon /> </button>
        </div>
        <div className="bg-white px-5 pb-5 rounded-b-[20px]  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[20px] lg:gap-y-[40px]">
          {selectedAppointment?.map((therapist: any, index: number) => (
            <div key={therapist.id} className="cursor-pointer">
              <Image
                onClick={() => viewProfile(therapist)}
                src={therapist?.profilePic ? getImageUrlOfS3(therapist?.profilePic) : demo}
                alt={therapist?.firstName}
                width={200}
                height={200}
                className="rounded-[20px] w-full aspect-square cover"
              />
              <h4 className="mt-4 font-gotham">{therapist?.firstName} {therapist?.lastName} </h4>
            </div>
          ))}
        </div>

      </Modal>
    </>
  );
};

export default DashboardAssignment;
