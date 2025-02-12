import { CloseIcon } from "@/utils/svgicons";
import React, { act, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import profilePic from '@/assets/images/profile.png'
import PersonalInformationTab from "./PersonalInformationTab";
import ClientsAssignmentsTab from "./ClientsAssignmentsTab";
import ClientsInsurenceTab from "./ClientsInsurenceTab";
import BillingInformationTab from "./BillingInformationTab";
import ServiceAssignmentTab from "./ServiceAssignmentTab";
import AttachmentsTabs from "./AttachmentsTabs";
import ClientNotesTab from "./ClientNotesTab";
import { getImageUrlOfS3 } from "@/utils";
import ClientsSpecificAppointmentsTab from "./client-appointment-table-in-admin";

interface ClientDetailsPopupProps {
  isOpen: boolean;
  onRequestClose: () => void;
  row: any;
  mutate: any
  role: string;
}

const ClientDetailsPopup = (props: ClientDetailsPopupProps) => {
  const { row } = props;

  const { mutate } = props;
  const { role } = props;
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="Delete Item"
      className="rounded-lg w-full max-w-4xl mx-auto bg-white shadow-lg max-h-[90vh] overflow-auto"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div className="flex items-center justify-between p-5 md:py-[25px] md:px-[35px] bg-[#283C63]  ">
        <h2 className="font-gothamMedium !text-white">Client Details</h2>
        <button onClick={props.onRequestClose}>
          <CloseIcon />
        </button>
      </div>
      <div className=" bg-white p-5 md:py-[30px] md:px-[35px] ">
        <div className="flex items-center gap-[23px] mb-5 md:mb-10">
          <div><Image src={row?.profilePic ? getImageUrlOfS3(row?.profilePic) : profilePic} height={100} width={100} alt="Profile picture" className="rounded-full w-[100px] object-cover aspect-square " /> </div>
          <div>
            <h3 className="font-gothamBold">{row?.firstName} {row?.lastName}</h3>
            <p>{row?._id}</p>
          </div>
        </div>
        <div className="mobile-scroll flex justify-between items-center gap-3 border-b border-[#CDE3F1] ">
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm  ${activeTab === "tab1"
              ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
              : ""
              } text-[#969696]`}
            onClick={() => handleTabClick("tab1")}
          >
            Personal Information
          </button>
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm  ${activeTab === "tab2"
              ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
              : ""
              } text-[#969696]`}
            onClick={() => handleTabClick("tab2")}
          >
            Appointments
          </button>
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm ${activeTab === "tab3"
              ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
              : ""
              } text-[#969696]`}
            onClick={() => handleTabClick("tab3")}
          >
            Basic Client Diagnoses
          </button>
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm  ${activeTab === "tab4"
              ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
              : ""
              } text-[#969696]`}
            onClick={() => handleTabClick("tab4")}
          >
            Insurance
          </button>
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm ${activeTab === "tab5"
              ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
              : ""
              } text-[#969696]`}
            onClick={() => handleTabClick("tab5")}
          >
            Billing Information
          </button>
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm  ${activeTab === "tab6"
              ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
              : ""
              } text-[#969696]`}
            onClick={() => handleTabClick("tab6")}
          >
            Service Assignment
          </button>
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm ${activeTab === "tab7"
              ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
              : ""
              } text-[#969696]`}
            onClick={() => handleTabClick("tab7")}
          >
            Attachments
          </button>
          <button
            className={`font-gothamMedium pb-[15px] px-[5px] text-sm  ${activeTab === "tab8"
              ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
              : ""
              } text-[#969696]`}
            onClick={() => handleTabClick("tab8")}
          >
            Notes
          </button>
        </div>
        <div className="mt-[30px]">
          {activeTab === "tab1" && <PersonalInformationTab row={row} mutate={mutate} />}
          {activeTab === "tab2" && <ClientsSpecificAppointmentsTab clientId={row._id} />}
          {activeTab === "tab3" && <ClientsAssignmentsTab row={row} mutate={mutate} />}
          {activeTab === "tab4" && <ClientsInsurenceTab row={row} mutate={mutate} />}
          {activeTab === "tab5" && <BillingInformationTab rowId={row?._id} />}
          {activeTab === "tab6" && <ServiceAssignmentTab rowId={row?._id} />}
          {activeTab === "tab7" && <AttachmentsTabs userEmail={row?.email} role={role} rowId={row?._id} />}
          {activeTab === "tab8" && <ClientNotesTab role={role} rowId={row?._id} />}
        </div>
      </div>
    </Modal>
  );
};

export default ClientDetailsPopup;
