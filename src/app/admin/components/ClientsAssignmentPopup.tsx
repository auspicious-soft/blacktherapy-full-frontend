import { CloseIcon } from "@/utils/svgicons";
import React, { act, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import Client from "@/assets/images/clientpic.png";
import ClientNotesTab from "./ClientNotesTab";
import ClinicianPersonalinfo from "./ClinicianPersonalinfo";
import ClinicianOtherInfo from "./ClinicianOtherInfo";
import ClinicianRecord from "./ClinicianRecord";
import AppointmentsTab from "./AppointmentsTab";
import InsurenceTab from "./InsurenceTab";

interface ClinicianDetailsPopupProps {
  isOpen: boolean;
  onRequestClose: () => void;
  row: any;
}

const ClientsAssignmentPopup = (props: ClinicianDetailsPopupProps) => {
  const { row } = props;
  const [activeTab, setActiveTab] = useState("tab1");


  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="Delete Item"
      className="modal max-w-[1180px] md:px-0 px-3 mx-auto rounded-[20px] w-full  max-h-[90vh] overflow-auto overflo-custom "
      overlayClassName="w-full h-full fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div className="flex items-center justify-between rounded-t-[20px] p-5 md:py-[25px] md:px-[35px] bg-[#283C63]  ">
        <h2 className="font-gothamMedium !text-white">Client Details</h2>
        <button onClick={props.onRequestClose}>
          <CloseIcon />{" "}
        </button>
      </div>
      <div className="md:py-[30px] bg-white p-5 md:px-[35px] ">
        <div className="flex items-center gap-[23px] mb-5 md:mb-10">
          <div><Image src={Client} height={100} width={100} alt="Profile picture" className="rounded-full w-[100px] object-cover aspect-square " /> </div>
          <div>
            <h3 className="font-gothamBold">{row?.firstName} {row?.lastName}</h3>
            <p>Id- {row?._id}</p>
          </div>
        </div>
        <div className="flex justify-center md:justify-between items-center gap-3 border-b border-[#CDE3F1] md:max-w-[320px]  ">
          <button
            className={`font-gothamMedium pb-[15px] w-1/2 text-center px-[5px] text-sm  ${activeTab === "tab1"
              ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
              : ""
              } text-[#969696]`}
            onClick={() => handleTabClick("tab1")}
          >
            Appointments
          </button>
          <button
            className={`font-gothamMedium w-1/2 text-center pb-[15px] px-[5px] text-sm ${activeTab === "tab2"
              ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
              : ""
              } text-[#969696]`}
            onClick={() => handleTabClick("tab2")}
          >Insurance
          </button>
        </div>
        <div className="mt-[30px]">
          {activeTab === "tab1" && <AppointmentsTab row={{ clientId: row }} />}
          {activeTab === "tab2" && <InsurenceTab row={{ clientId: row }} />}
        </div>
      </div>
    </Modal>
  );
};

export default ClientsAssignmentPopup;
