'use client'
import AttachmentsWellness from "@/app/customer/components/AttachmentsWellness";
import VideosWellness from "@/app/customer/components/VideosWellness";
import { auth } from "@/auth";
import { getTherapistWellness } from "@/services/therapist/therapist-service.";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import SearchBar from '@/app/admin/components/SearchBar';

export default function Home() {
    const [query, setQuery] = useState('')
    const [activeTab, setActiveTab] = useState('Videos')
    const session = useSession()

    const { data, isLoading } = useSWR(`/therapist/${session?.data?.user?.id}/videos?${query}`, getTherapistWellness)
    const wellnessData = data?.data

    const total = data?.data?.total
    const rowsPerPage = data?.data?.limit
    const handlePageClick = (selectedItem: { selected: number }) => {
        console.log('selectedItem: ', selectedItem);
        setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
    }
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Videos':
                return <VideosWellness isLoading={isLoading} handlePageClick={handlePageClick} data={wellnessData} total={total} rowsPerPage={rowsPerPage} />
            case 'Attachments':
                return <AttachmentsWellness isLoading={isLoading} handlePageClick={handlePageClick} data={wellnessData} total={total} rowsPerPage={rowsPerPage}/>
            default:
                return null;
        }
    }
    return (
        <div>
            <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
                Wellness Portal
            </h1>
            <div className="">
            <div className="mb-5 flex items-center justify-between">
                <div className='flex items-center justify-between  '>
                    <div className="tabs flex flex-wrap gap-[5px] lg:gap-[20px]">
                        {['Videos', 'Attachments'].map((tab) => (
                            <button
                                key={tab}
                                className={`tab-button ${activeTab === tab ? 'active' : '!bg-transparent border-[1px] !border-[#283c63] !text-[#283c63]'} bg-[#283c63] text-[#fff] rounded-[6px] mt-0 text-[14px] py-[8px] px-[16px] lg:px-[32px] lg:py-[12px] `}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
              
        <SearchBar setQuery={setQuery} />
      </div>
                <div className="tab-content">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}