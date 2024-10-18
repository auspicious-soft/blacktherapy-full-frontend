import { CloseIcon } from "@/utils/svgicons";
import React, { act, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import Client from "@/assets/images/clientpic.png";
import PersonalInformationTab from "./PersonalInformationTab";
import ClientsAssignmentsTab from "./ClientsAssignmentsTab";
import ClientsInsurenceTab from "./ClientsInsurenceTab";
import BillingInformationTab from "./BillingInformationTab";
import ServiceAssignmentTab from "./ServiceAssignmentTab";
import AttachmentsTabs from "./AttachmentsTabs";
import ClientNotesTab from "./ClientNotesTab";

interface ClientDetailsPopupProps {
  isOpen: boolean;
  onRequestClose: () => void;
  row: any;
}

const ClientDetailsPopup = (props: ClientDetailsPopupProps) => {
  const {row} = props;
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="Delete Item"
      className="modal max-w-[1180px] mx-auto rounded-[20px] w-full  max-h-[90vh] overflow-scroll overflo-custom "
      overlayClassName="w-full h-full px-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
    <div className="flex items-center justify-between rounded-t-[20px] p-5 md:py-[25px] md:px-[35px] bg-[#283C63]  ">
        <h2 className="font-gothamMedium !text-white">Client Details</h2>
        <button onClick={props.onRequestClose}>
          <CloseIcon />
        </button>
      </div>
      <div className=" bg-white p-5 md:py-[30px] md:px-[35px] ">
        <div className="flex items-center gap-[23px] mb-5 md:mb-10">
            <div><Image src={row?.profilePic} height={100} width={100} alt="Profile picture" className="rounded-full w-[100px] object-cover aspect-square " /> </div>
        <div>
            <h3 className="font-gothamBold">{row?.firstName} {row?.lastName}</h3>
            <p>{row?._id}</p>
        </div>
        </div>
            <div className="mobile-scroll flex justify-between items-center gap-3 border-b border-[#CDE3F1] ">
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm  ${
              activeTab === "tab1"
                ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
                : ""
            } text-[#969696]`}
            onClick={() => handleTabClick("tab1")}
          >
            Personal Information
          </button>
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm ${
              activeTab === "tab2"
                ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
                : ""
            } text-[#969696]`}
            onClick={() => handleTabClick("tab2")}
          >
            Assignments
          </button>
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm  ${
              activeTab === "tab3"
                ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
                : ""
            } text-[#969696]`}
            onClick={() => handleTabClick("tab3")}
          >
            Insurance
          </button>
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm ${
              activeTab === "tab4"
                ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
                : ""
            } text-[#969696]`}
            onClick={() => handleTabClick("tab4")}
          >
            Billing Information
          </button>
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm  ${
              activeTab === "tab5"
                ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
                : ""
            } text-[#969696]`}
            onClick={() => handleTabClick("tab5")}
          >
            Service Assignment
          </button>
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm ${
              activeTab === "tab6"
                ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
                : ""
            } text-[#969696]`}
            onClick={() => handleTabClick("tab6")}
          >
            Attachments
          </button>
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm  ${
              activeTab === "tab7"
                ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
                : ""
            } text-[#969696]`}
            onClick={() => handleTabClick("tab7")}
          >
            Notes
          </button>
        </div>
        <div className="mt-[30px]">
          {activeTab === "tab1" && <PersonalInformationTab row={row} />}
          {activeTab === "tab2" && <ClientsAssignmentsTab row={row} />}
          {activeTab==="tab3" && <ClientsInsurenceTab row={row} />}
          {activeTab==="tab4" && <BillingInformationTab rowId={row?._id} /> }
          {activeTab==="tab5" && <ServiceAssignmentTab /> }
          {activeTab==="tab6" && <AttachmentsTabs /> }
          {activeTab==="tab7" && <ClientNotesTab/> }
        </div>
      </div>
    </Modal>
  );
};

export default ClientDetailsPopup;
