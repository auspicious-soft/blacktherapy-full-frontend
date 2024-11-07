"use client";
import ClientTable from "@/app/admin/components/ClientTable";
import { getClientsPageData } from "@/services/admin/admin-service";
import { useEffect, useState } from "react";
import useSWR from "swr";
import SearchBar from "../components/SearchBar";
import { useSession } from "next-auth/react";

const Page: React.FC = () => {
    
    const { data: session } = useSession();
    const [query, setQuery] = useState('');
    const { data, error, isLoading, mutate } = useSWR(`/admin/clients?${query}`, getClientsPageData);
    const clientsData: any= data?.data; 
    const userRole = (session as any)?.user?.role;
 
    useEffect(() => {
        console.log("User Role:", userRole);
    }, [userRole]);
    
    return (
        <>
        <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
            Clients
        </h1>
        <div className=" flex justify-end items-center gap-3 mb-[30px] ">
        <SearchBar setQuery={setQuery} />
        </div>
        
            <ClientTable clientsData={clientsData} mutate={mutate}  error={error} isLoading={isLoading} setQuery = {setQuery} role={userRole}  />
        </>
    );
}; 

export default Page;
