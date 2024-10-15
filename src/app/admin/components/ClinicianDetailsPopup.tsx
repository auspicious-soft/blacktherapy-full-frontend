import { CloseIcon } from "@/utils/svgicons";
import React, { act, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import Client from "@/assets/images/clientpic.png";
import ClientNotesTab from "./ClientNotesTab";
import ClinicianPersonalinfo from "./ClinicianPersonalinfo";
import ClinicianOtherInfo from "./ClinicianOtherInfo";
import ClinicianRecord from "./ClinicianRecord";

interface ClinicianDetailsPopupProps {
  isOpen: boolean;
  onRequestClose: () => void;
  clinicianId: number;
  clinicianName: string;
}

const ClinicianDetailsPopup: React.FC<ClinicianDetailsPopupProps> = ({
  isOpen,
  onRequestClose,
  clinicianId,
  clinicianName 
}) => {
const [activeTab, setActiveTab] = useState("tab1");
const handleTabClick = (tab: string) => {
    setActiveTab(tab);
};

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Item"
      className="modal max-w-[1180px] mx-auto rounded-[20px] w-full  max-h-[90vh] overflow-scroll overflo-custom "
      overlayClassName="w-full h-full px-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
    <div className="flex items-center justify-between rounded-t-[20px] p-5 md:py-[25px] md:px-[35px] bg-[#283C63]  ">
        <h2 className="font-gothamMedium !text-white">Clinician Details</h2>
        <button onClick={onRequestClose}>
          <CloseIcon />{" "}
        </button>
      </div>
      <div className=" bg-white p-5 md:py-[30px] md:px-[35px] ">
        <div className="flex items-center gap-[23px] mb-5 md:mb-10">
            <div><Image src={Client} height={100} width={100} alt="Profile picture" className="rounded-full w-[100px] object-cover aspect-square " /> </div>
        <div>
            <h3 className="font-gothamBold">{clinicianName}</h3>
            <p>{clinicianId}</p>
        </div>
        </div>
            <div className="mobile-scroll flex justify-between items-center gap-3 border-b border-[#CDE3F1] ">
          <button
            className={`font-gothamMedium w-[25%] text-center pb-[15px] px-[5px] text-sm  ${
              activeTab === "tab1"
                ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
                : ""
            } text-[#969696]`}
            onClick={() => handleTabClick("tab1")}
          >
            Personal Information
          </button>
          <button
            className={`font-gothamMedium w-[25%] text-center pb-[15px] px-[5px] text-sm ${
              activeTab === "tab2"
                ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
                : ""
            } text-[#969696]`}
            onClick={() => handleTabClick("tab2")}
          >
            Other Information
          </button>
          <button
            className={`font-gothamMedium w-[25%] text-center pb-[15px] px-[5px] text-sm  ${
              activeTab === "tab3"
                ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
                : ""
            } text-[#969696]`}
            onClick={() => handleTabClick("tab3")}
          >
            Employee Record
          </button>
          <button
            className={`font-gothamMedium w-[25%] text-center pb-[15px] px-[5px] text-sm  ${
              activeTab === "tab4"
                ? "active !text-[#283c63]  border-b-2 border-[#283c63]"
                : ""
            } text-[#969696]`}
            onClick={() => handleTabClick("tab4")}
          >
            Notes
          </button>
        </div>
        <div className="mt-[30px]">
          {activeTab === "tab1" && <ClinicianPersonalinfo />}
          {activeTab === "tab2" && <ClinicianOtherInfo />}
          {activeTab==="tab3" && <ClinicianRecord />}
          {activeTab==="tab4" && <ClientNotesTab/> }
        </div>
      </div>
    </Modal>
  );
};

export default ClinicianDetailsPopup;
