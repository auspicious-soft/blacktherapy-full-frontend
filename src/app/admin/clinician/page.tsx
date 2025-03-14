'use client'
import ClinicianTable from "@/app/admin/components/ClinicianTable";
import { GetTherapistsData } from "@/services/admin/admin-service";
import React, { useState } from "react";
import useSWR from "swr";
import SearchBar from "../components/SearchBar";

const Page: React.FC = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1); // Store page state

  const filterStr = `${query ? `${query}` : ''}${query && status ? '&' : ''}${status ? `status=${status}` : ''}&page=${page}&limit=10`;

  const { data, error, isLoading, mutate } = useSWR(`/admin/therapists${filterStr ? `?${filterStr}` : ''}`, GetTherapistsData);
  const therapistsData: any = data?.data;

  const handlefilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  return (
    <>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Clinician
      </h1>
      <div className="flex justify-end items-center gap-3 mb-[30px]">
        <SearchBar setQuery={setQuery} />
        <div className="filter-select">
          <select
            value={status}
            onChange={handlefilters}
            className="w-auto border border-[#26395E] text-[#26395E] text-sm h-[46px] px-5 bg-transparent p-0"
          >
            <option value="">No Filter</option>
            <option value="Applicant Reviewed">Applicant Reviewed</option>
            <option value="Interview Pending">Interview Pending</option>
            <option value="Incomplete Application">Incomplete Application</option>
            <option value="Doesn&apos;t Meet Qualifications">Doesn&apos;t Meet Qualifications</option>
            <option value="Withdrawn">Withdrawn</option>
            <option value="Follow-Up">Follow-Up</option>
            <option value="Offer Sent">Offer Sent</option>
            <option value="Offer Accepted">Offer Accepted</option>
            <option value="Background Check Pending">Background Check Pending</option>
            <option value="Credentialing Pending">Credentialing Pending</option>
            <option value="Active">Active</option>
            <option value="Terminated">Terminated</option>
            <option value="Leave of Absence">Leave of Absence</option>
            <option value="Vacation">Vacation</option>
            <option value="Suspended">Suspended</option>
            <option value="Pending Termination">Pending Termination</option>
            <option value="Probationary">Probationary</option>
            <option value="Welcome Letter">Welcome Letter</option>
          </select>
        </div>
      </div>

      <ClinicianTable
        therapistsData={therapistsData}
        mutate={mutate}
        error={error}
        isLoading={isLoading}
        setPage={setPage} // Pass setPage to ClinicianTable
        currentPage={page} // Pass currentPage state
      />
    </>
  );
};
export default Page;
