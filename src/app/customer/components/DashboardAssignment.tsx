"use client";
import React, { ReactNode, useState, CSSProperties } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import PervIcon from "@/assets/images/pervicon.png";
import NextIcon from "@/assets/images/nexticon.png";
import { ViewIcon, ButtonArrow } from "@/utils/svgicons";
import Therapist1 from "@/assets/images/therapist1.jpg";
import Therapist2 from "@/assets/images/therapist2.jpg";
import Therapist3 from "@/assets/images/therapist3.jpg";
import ReactLoading from "react-loading";
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

const DashboardAssignment = (props: any) => {
  const { total, data, rowsPerPage, isLoading, error, setQuery } = props;
  const [renewPopupOpen, setRenewPopupOpen] = useState(false);
  const [teamPopupOpen, setTeamPopupOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  };

  function isPastDate(dateString: string) {
    const date = new Date(dateString);
    const today = new Date();
    return date < today;
  }

  const getStyle = (text: string): CSSProperties => {
    let style: CSSProperties = {
      padding: "2px 10px",
      borderRadius: "20px",
      display: "inline-block",
      fontSize: "10px",
    };

    switch (text) {
      case "Renew Subscription":
        style.backgroundColor = "#FFFCEC";
        style.color = "#FFA234";
        break;
      case "Start Chat":
      case "Start Video Call":
        style.backgroundColor = "#CBFFB2";
        style.color = "#42A803";
        break;
      case "Wait for approval":
        style.backgroundColor = "#FFFCB2";
        style.color = "#A85C03";
        break;
      case "Not Available":
        style.backgroundColor = "#FFBBCD";
        style.color = "#bb2b51";
        break;
      default:
        break;
    }

    return style;
  };

  const handleRenewClick = () => {
    setRenewPopupOpen(true);
  };
  const renewClosePopup = () => {
    setRenewPopupOpen(false);
  };
  const handleViewTeam = (row: any) => {
    setSelectedAppointment(row.peerSupportIds);
    setTeamPopupOpen(true);
  };
  const handleCloseTeam = () => {
    setTeamPopupOpen(false);
  };

  return (
    <>
      <h3 className="mb-[20px]">Assignment details</h3>
      <div className="table-common">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Appt Date</th>
              <th>Renewal Date</th>
              <th>Chat With Clinician</th>
              <th>Video Chat</th>
              <th>Billing Amount</th>
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
                <td colSpan={5} className="text-center text-red-500">Error loading payments data.</td>
              </tr>
            ) : data?.length > 0 ? (
              data?.map((row: any) => (
                <tr key={row?._id}>
                  <td>{row?._id}</td>
                  <td>{new Date(row?.appointmentDate).toLocaleDateString('en-US')}</td>
                  <td>{row.apptTime}</td>
                  <td>
                    <p className={`font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px] ${row.chat === 'Start Chat' ? ' text-[#42A803] bg-[#CBFFB2] ' : ' text-[#FFA234] bg-[#FFFCEC] '}`}>
                      {!row.message ? 'No chat' : <p className='cursor-pointer font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px]  text-[#42A803] bg-[#CBFFB2]'>Start Chat</p>}
                    </p>
                  </td>
                  <td>{!row.video ? 'No video' : <p className='cursor-pointer font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px]  text-[#42A803] bg-[#CBFFB2]'>Start Video</p>}</td>
                  <td>{row.billingAmount}</td>
                  <td>
                    <span className="cursor-pointer w-[26px] flex" onClick={() => handleViewTeam(row)}>
                      <ViewIcon />
                    </span>
                  </td>
                  <td>{new Date(row?.createdAt).toLocaleDateString('en-US')}</td>
                </tr>
              ))
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
      <Modal isOpen={renewPopupOpen} onClose={renewClosePopup}>
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

      {/* Renew Popup Component */}
      <Modal isOpen={teamPopupOpen} onClose={handleCloseTeam}>
        <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
          Care Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[20px] lg:gap-y-[40px]">
          {selectedAppointment?.map((therapist: any) => (
            <div key={therapist.id} className="">
              <Image
                src={therapist.profilePic}
                alt={therapist.firstName}
                width={200}
                height={200}
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

export default DashboardAssignment;
