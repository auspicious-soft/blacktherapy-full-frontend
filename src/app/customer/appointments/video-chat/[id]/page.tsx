/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getAppointmentDetails, getChatHistory } from "@/utils";
import { toast } from "sonner";

const Page = () => {
    const session = useSession()
    const userId = (session?.data?.user?.id as string);
    const params = useParams();
    const roomId = params.id as string
    const [isPending, startTransition] = React.useTransition()
    const [recieverDetails, setRecieverDetails] = useState<any>(null)



    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            const response = await getAppointmentDetails(roomId)
            setRecieverDetails(response?.data?.therapistId)
        }
        fetchAppointmentDetails()

    }, [])


    return (
        <div>
            <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
                Care Session 👋
            </h1>
            <div className="h-[calc(100vh-168px)] flex gap-[31px]">
                
            </div>
        </div>
    );
};

export default Page;