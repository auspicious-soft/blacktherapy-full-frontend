'use client'
import Image from "next/image";
import React from "react";
import profileImage from "@/assets/images/clientpic.png";
import useSWR from "swr";
import { GetEmployeeRecordsData } from "@/services/admin/admin-service";
import { useRouter } from "next/navigation";
import { useParams, useSearchParams } from 'next/navigation';
import { getTherapistProfile } from "@/services/client/client-service";

const Page = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");
    const {data, error, isLoading} = useSWR(`/client/therapists/${id}`, getTherapistProfile, {revalidateOnFocus: false});
    const {data: positionData } = useSWR(`/client/therapists/employee-records/${id}`, GetEmployeeRecordsData, {revalidateOnFocus:false})
    const position = positionData?.data?.data[0]?.position;;
    const therapistData = data?.data?.data;
    console.log('therapistData:', therapistData);
   


  return (
    <div>
      <div className="text-lg">
        <div className="mb-5 flex gap-3 items-center ">
          <Image src={profileImage} alt="profile" />
        <p>{firstName} {lastName}</p>

        </div>
        <p className="text-[#283C63] font-bold  ">Email: <span className="text-[#686868] ">{therapistData?.email}</span></p>
        <p className="text-[#283C63] font-bold  ">Position: <span className="text-[#686868] ">{position}</span></p>
        <p className="text-[#283C63] font-bold  ">About: <span className="text-[#686868] ">{therapistData?.about}</span></p>
      </div>
    </div>
  );
};

export default Page;
