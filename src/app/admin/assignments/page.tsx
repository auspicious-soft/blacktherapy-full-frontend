"use client"
import AssignedClientsTable from "@/app/admin/components/AssignedClientsTable";
import SearchBar from "@/app/admin/components/SearchBar";
import UnassignedClientTable, {TableData} from "@/app/admin/components/UnassignedClientTable";
import { useState } from "react";
const Page: React.FC = () => {
  const initialData: TableData[] = [
    { id: 1, client: 'Client A', assignedClinician: 'No Clinician Assigned', assignedPeerSupport: 'No Peer Support Assigned', status: 'Unassigned' },
    { id: 2, client: 'Client B', assignedClinician: 'No Clinician Assigned', assignedPeerSupport: 'No Peer Support Assigned', status: 'Unassigned' },
    { id: 3, client: 'Client C', assignedClinician: 'No Clinician Assigned', assignedPeerSupport: 'No Peer Support Assigned', status: 'Unassigned' },
    { id: 4, client: 'Client D', assignedClinician: 'No Clinician Assigned', assignedPeerSupport: 'No Peer Support Assigned', status: 'Unassigned' },
    { id: 5, client: 'Client E', assignedClinician: 'No Clinician Assigned', assignedPeerSupport: 'No Peer Support Assigned', status: 'Unassigned' },
    { id: 6, client: 'Client F', assignedClinician: 'No Clinician Assigned', assignedPeerSupport: 'No Peer Support Assigned', status: 'Unassigned' },
    { id: 7, client: 'Client G', assignedClinician: 'No Clinician Assigned', assignedPeerSupport: 'No Peer Support Assigned', status: 'Unassigned' },
    { id: 8, client: 'Client H', assignedClinician: 'No Clinician Assigned', assignedPeerSupport: 'No Peer Support Assigned', status: 'Unassigned' },
    { id: 9, client: 'Client I', assignedClinician: 'No Clinician Assigned', assignedPeerSupport: 'No Peer Support Assigned', status: 'Unassigned' },
    { id: 10, client: 'Client J', assignedClinician: 'No Clinician Assigned', assignedPeerSupport: 'No Peer Support Assigned', status: 'Unassigned' },
  ];

const [activeTab, setActiveTab]= useState('tab1');
const [unassignedData, setUnassignedData] = useState<TableData[]>(initialData);
const [assignedData, setAssignedData] = useState<TableData[]>([]);

const handleTabClick = (tab: string) => {
  setActiveTab(tab);
};

const moveToAssigned = (row: TableData) => {
  setUnassignedData(unassignedData.filter((data) => data.id !== row.id));
  setAssignedData([...assignedData, row]);
};

const updateAssignedData = (updatedRow: TableData) => {
  setAssignedData(assignedData.map((data) => data.id === updatedRow.id ? updatedRow : data));
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
          <SearchBar />
        </div>
        </div>
        <div className="mt-[30px]">
        {activeTab === 'tab1' &&
        <UnassignedClientTable data={unassignedData} moveToAssigned={moveToAssigned} />
         }
        {activeTab === 'tab2' &&
         <AssignedClientsTable data={assignedData} updateAssignedData={updateAssignedData} />
        }
      </div>
      </div>
    </>
  );
};
export default Page;
