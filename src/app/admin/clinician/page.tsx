"use client";
import ClinicianTable from "@/app/admin/components/ClinicianTable";
import { GetTherapistsData } from "@/services/admin/admin-service";
import React, { useState } from "react";
import useSWR from "swr";

const Page: React.FC = () => { 
  const [query, setQuery] = useState('');
  const { data, error, isLoading, mutate } = useSWR(`/admin/therapists?${query}`, GetTherapistsData);
  const therapistsData: any= data?.data; 

  return (
    <>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Clinician
      </h1>
      <ClinicianTable therapistsData={therapistsData} mutate={mutate} error={error} isLoading={isLoading} setQuery={setQuery} />
    </>
  );
};
export default Page;
 