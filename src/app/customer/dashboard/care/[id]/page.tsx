"use client";
import Image from "next/image";
import React from "react";
import profileImage from "@/assets/images/clientpic.png";
import useSWR from "swr";
import { GetEmployeeRecordsData } from "@/services/admin/admin-service";
import { useRouter } from "next/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { getEmployeeDetails } from "@/services/client/client-service";
import { getImageUrlOfS3 } from "@/utils";

const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");

  const { data, isLoading } = useSWR(
    `/client/therapists/employee-records/${id}`,
    GetEmployeeRecordsData,
    { revalidateOnFocus: false }
  );
  const { data: employee } = useSWR(
    `/client/therapists/${id}`,
    getEmployeeDetails,
    { revalidateOnFocus: false }
  );
  const records = data?.data?.data[0]; 
  const employeeDetails = employee?.data?.data; 

  return (
    <div>
      <div className="text-lg">
        <div className="mb-5 flex gap-5 items-center bg-white p-5 rounded-xl ">
          <Image src={getImageUrlOfS3(employeeDetails?.profilePic)} alt="profile" width={150} height={150} className="object-contain "/>
        <div>
        <h2 className="leading-[normal]">{firstName} {lastName} <span className="text-lg">({records?.position})</span></h2>
        <p>{employeeDetails?.about} </p>
        </div>
        </div>
       <h5 className="flex items-center gap-3 mb-2.5">Email: <p className="text-base">{records?.employeeEmail} </p></h5>
       <h5 className="flex items-center gap-3 mb-2.5">Weekly Hours: <p className="text-base">{employeeDetails?.weeklyHours} </p></h5>
       <h5 className="flex items-center gap-3 mb-2.5">Start Time: <p className="text-base"> {employeeDetails?.startTime} </p></h5>
       <h5 className="flex items-center gap-3 mb-2.5">End Time: <p className="text-base"> {employeeDetails?.endTime} </p></h5>
       <h5 className="flex items-center gap-3 mb-2.5">Rate of Pay: <p className="text-base"> {employeeDetails?.rateOfPay} </p></h5>
       <h5 className="flex items-center gap-3 mb-2.5">Skills: <p className="text-base"> {employeeDetails?.skills} </p></h5>
       <h5 className="flex items-center gap-3 mb-2.5">Additional Information: <p className="text-base"> {employeeDetails?.additionalInformation} </p></h5>
       <h5 className="flex items-center gap-3 mb-2.5">Available on: 
      {employeeDetails?.currentAvailability?.map((item: string, index: number) => {
          const fullDayNames: { [key: string]: string } = {
            Mo: "Monday",
            Tu: "Tuesday",
            We: "Wednesday",
            Th: "Thursday",
            Fr: "Friday",
            Sa: "Saturday",
            Su: "Sunday",
          };
          return (
            <p key={item} className="text-base">
     {fullDayNames[item] || item}{index < employeeDetails.currentAvailability.length - 1 ? ',' : ''}
   </p>
          )
        })}
        </h5>
      </div>
    </div>
  );
};

export default Page;
