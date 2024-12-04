'use client'
import Image from "next/image";
import React from "react";
import profileImage from "@/assets/images/clientpic.png";
import useSWR from "swr";
import { GetEmployeeRecordsData } from "@/services/admin/admin-service";
import { useRouter } from "next/navigation";
import { useParams, useSearchParams } from 'next/navigation';

const Page = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");

  const {data, isLoading } = useSWR(`/client/therapists/employee-records/${id}`, GetEmployeeRecordsData, {revalidateOnFocus:false})
  const position = data?.data?.data[0]?.position;;

  return (
    <div>
      <div className="text-lg">
        <div className="mb-5 ">
          <Image src={profileImage} alt="profile" />
        </div>
        <p> {firstName} {lastName} <span>({position})</span>
        </p>
      </div>
    </div>
  );
};

export default Page;
