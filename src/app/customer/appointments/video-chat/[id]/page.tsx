/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React from 'react';
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getAppointmentDetails } from "@/utils";
import { VideoChatPage } from '@/components/video-chat';
import { IoMdArrowRoundBack } from "react-icons/io";

const Page = () => {
    const session = useSession()
    const router = useRouter()
    const userId = (session?.data?.user?.id as string);
    const role = (session as any)?.data?.user?.role;
    const params = useParams();
    const appointmentId = params.id as string

   return (
        <div>
            <div className="flex justify-between">
                <IoMdArrowRoundBack onClick={() => router.back()} className='text-black text-lg cursor-pointer'/>
                <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
                    Care Session 👋
                </h1>
            </div>
            <div className="h-[calc(100vh-168px)] flex gap-[31px]">
                <VideoChatPage
                    appointmentId={appointmentId}
                    userType={role === 'therapist' ? 'therapist' : 'client'}
                    userId={userId}
                />
            </div>
        </div>
    );
};

export default Page;
