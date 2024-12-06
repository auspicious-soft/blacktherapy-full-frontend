/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getAppointmentDetails } from "@/utils";
import { VideoChatPage } from '@/components/video-chat';

const Page = () => {
    const session = useSession()
    const userId = (session?.data?.user?.id as string);
    const role = (session as any)?.data?.user?.role;
    const params = useParams();
    const appointmentId = params.id as string

    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            const response = await getAppointmentDetails(appointmentId)
        }
        fetchAppointmentDetails()

    }, [])


    return (
        <div>
            <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
                Care Session 👋
            </h1>
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
