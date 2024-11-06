"use client";
import ClientTable from "@/app/admin/components/ClientTable";
import { getClientsPageData } from "@/services/admin/admin-service";
import { useState } from "react";
import useSWR from "swr";
import SearchBar from "../components/SearchBar";

const Page: React.FC = () => {
    const [query, setQuery] = useState('');
    const { data, error, isLoading, mutate } = useSWR(`/admin/clients?${query}`, getClientsPageData);
    const clientsData: any= data?.data; 

 
    return (
        <>
        <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
            Clients
        </h1>
        <div className=" flex justify-end items-center gap-3 mb-[30px] ">
        <SearchBar setQuery={setQuery} />
        </div>
        
            <ClientTable clientsData={clientsData} mutate={mutate}  error={error} isLoading={isLoading} setQuery = {setQuery} />
        </>
    );
}; 

export default Page;
