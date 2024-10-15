"use client";
import ClinicianTable from "@/app/admin/components/ClinicianTable";
import React from "react";

const page: React.FC = () => {
  return (
    <>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Clinician
      </h1>
      <ClinicianTable />
    </>
  );
};
export default page;
 