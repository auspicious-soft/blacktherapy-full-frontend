'use client'
import Image from "next/image";
import React from "react";
import profileImage from "@/assets/images/clientpic.png";
import useSWR from "swr";
import { GetEmployeeRecordsData } from "@/services/admin/admin-service";
import { useRouter } from "next/navigation";
import { useParams, useSearchParams } from 'next/navigation';
import { getEmployeeDetails } from "@/services/client/client-service";

const Page = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");

  const {data, isLoading } = useSWR(`/client/therapists/employee-records/${id}`, GetEmployeeRecordsData, {revalidateOnFocus:false})
  const {data: employee } = useSWR(`/client/therapists/${id}`, getEmployeeDetails, {revalidateOnFocus:false})
  const records = data?.data?.data[0];
  console.log('records:', records);
  const employeeDetails = employee?.data?.data
  console.log('employeeDetails:', employeeDetails);


  return (
    <div>
      <div className="text-lg">
        <div className="mb-5 ">
          <Image src={profileImage} alt="profile" />
        </div>
        <p> {firstName} {lastName} <span>({records?.position})</span> </p>
        <p>Email: {records?.employeeEmail} </p>
        <p>Weekly Hours:  {employeeDetails?.weeklyHours} </p>
        <p>Start Time: {employeeDetails?.startTime} </p>
        <p>End Time: {employeeDetails?.endTime } </p>
        {employeeDetails?.currentAvailability?.map((item: any) => {
             <div key={item}>
              <p>Day: {item} </p>
            </div>
               
})}
      </div>
    </div>
  );
};

export default Page;
