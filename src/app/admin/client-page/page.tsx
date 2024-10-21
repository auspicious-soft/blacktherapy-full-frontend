"use client";
import ClientTable from "@/app/admin/components/ClientTable";
import { getClientsPageData } from "@/services/admin/admin-service";
import { useState } from "react";
import useSWR from "swr";

const Page: React.FC = () => {
    const [query, setQuery] = useState('');
    const { data, error, isLoading } = useSWR(`/admin/clients?${query}`, getClientsPageData);
    const clientsData: any= data?.data; 


    return (
        <>
            <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
                Clients
            </h1>
        
            <ClientTable clientsData={clientsData} setQuery = {setQuery} />
        </>
    );
}; 

export default Page;
