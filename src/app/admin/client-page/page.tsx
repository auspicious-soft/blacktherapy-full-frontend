"use client";
import ClientTable from "@/app/admin/components/ClientTable";
import { getClientsPageData } from "@/services/admin/admin-service";
import { useState, useMemo } from "react";
import useSWR from "swr";
import SearchBar from "../components/SearchBar";
import { useSession } from "next-auth/react";

const Page: React.FC = () => {
    const { data: session } = useSession();
    const [query, setQuery] = useState('page=1&limit=10');
    const [status, setStatus] = useState('');
    const baseQuery = 'page=1&limit=10';

    // Always use a query value – fallback to baseQuery if empty.
    const filterStr = useMemo(() => {
        const effectiveQuery = query || baseQuery;
        const params = [effectiveQuery];
        if (status) params.push(`status=${status}`);
        return params.filter(Boolean).join('&');
    }, [query, status]);

    const url = `/admin/clients${filterStr ? `?${filterStr}` : ''}`;
    const { data, error, isLoading, mutate } = useSWR(url, getClientsPageData, {
        // revalidateOnMount: false,
        revalidateOnFocus: false
    });
    const clientsData: any = data?.data;
    const userRole = (session as any)?.user?.role;

    const handleFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    return (
        <>
            <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
                Clients
            </h1>
            <div className="flex justify-end items-center gap-3 mb-[30px]">
                <SearchBar setQuery={setQuery} />
                <div className="filter-select">
                    <select
                        value={status}
                        onChange={handleFilters}
                        className="w-auto border border-[#26395E] text-[#26395E] text-sm h-[46px] px-5 bg-transparent p-0"
                    >
                        <option value="">Status</option>
                        <option value="Active Client">Active Client</option>
                        <option value="Pending">Pending</option>
                        <option value="Callback Pending">Callback Pending</option>
                        <option value="Insurance Verified">Insurance Verified</option>
                        <option value="Pending Clinical Review">Pending Clinical Review</option>
                        <option value="Waiting Assignment">Waiting Assignment</option>
                        <option value="Assessment Pending">Assessment Pending</option>
                        <option value="Assessment Scheduled">Assessment Scheduled</option>
                        <option value="Insurance Hold">Insurance Hold</option>
                        <option value="Ineligible Due to insurance">Ineligible Due to insurance</option>
                        <option value="Alert -SEE NOTES">Alert -SEE NOTES</option>
                        <option value="Alert - Past Due Balance/Collection">Alert - Past Due Balance/Collection</option>
                        <option value="Unresponsive - Week 1">Unresponsive - Week 1</option>
                        <option value="Unresponsive - Week 2">Unresponsive - Week 2</option>
                        <option value="Unresponsive - Week 3">Unresponsive - Week 3</option>
                        <option value="Unresponsive - Week 4">Unresponsive - Week 4</option>
                        <option value="No Contact Sent">No Contact Sent</option>
                        <option value="Inactive - Discharged">Inactive - Discharged</option>
                        <option value="Inactive - Unresponsive">Inactive - Unresponsive</option>
                        <option value="Inactive - Bad Lead">Inactive - Bad Lead</option>
                        <option value="Inactive - Referred Out">Inactive - Referred Out</option>
                        <option value="Inactive - Not Interested">Inactive - Not Interested</option>
                        <option value="Intake Pending">Intake Pending</option>
                        <option value="Intake Complete">Intake Complete</option>
                    </select>
                </div>
            </div>
            <ClientTable
                clientsData={clientsData}
                mutate={mutate}
                error={error}
                isLoading={isLoading}
                setQuery={setQuery}
                role={userRole}
            />
        </>
    );
};

export default Page;