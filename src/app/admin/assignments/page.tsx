"use client"
import AssignedClientsTable from "@/app/admin/components/AssignedClientsTable";
import SearchBar from "@/app/admin/components/SearchBar";
import UnassignedClientTable, {TableData} from "@/app/admin/components/UnassignedClientTable";
import { getAppoinmentsData } from "@/services/admin/admin-service";
import { useState } from "react";
import useSWR from "swr";
const Page: React.FC = () => {

const [query, setQuery] = useState('')
const [activeTab, setActiveTab]= useState('tab1');
const {data , error, isLoading} =  useSWR(`/admin/appointments?assignedClients=${activeTab === 'tab1' ? false :  true}&${query}`, getAppoinmentsData)
const appointmentsData:any = data?.data

const handleTabClick = (tab: string) => {
  setActiveTab(tab);
};

  return (
    <>
      <div>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
      Assignments
    </h1>
    <div className="flex justify-between items-center gap-3 md:flex-row flex-col">
        <div>
        <button
          className={`mr-5 h-[46px] py-3 px-4 text-sm rounded-[5px] border border-[#283c63] ${activeTab === 'tab1' ? 'active bg-[#283c63] !text-white' : ''} text-[#26395e]`}
          onClick={() => handleTabClick('tab1')}
        >
          Unassigned Clients
        </button>
        <button
          className={`h-[46px] py-3 px-8 text-sm rounded-[5px] border border-[#283c63] ${activeTab === 'tab2' ? 'active bg-[#283c63] !text-white' : ''} text-[#26395e]`}
          onClick={() => handleTabClick('tab2')}
        >
          Assigned Clients
        </button>
        </div>
        <div>
          <SearchBar setQuery={setQuery}/>
        </div>
        </div>
        <div className="mt-[30px]">
        {activeTab === 'tab1' &&
        <UnassignedClientTable appointmentsData ={appointmentsData}  />
         }
        {activeTab === 'tab2' &&
         <AssignedClientsTable appointmentsData={appointmentsData} />
        }
      </div>
      </div>
    </>
  );
};
export default Page;
