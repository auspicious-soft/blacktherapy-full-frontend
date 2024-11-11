"use client"
import React from 'react';
import Image from 'next/image';
import kerry from "@/assets/images/kerry.png"
import Link from 'next/link';
import { ButtonSvg } from '@/utils/svgicons';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const ApplicationCompleted = () => {
    const router = useRouter()
    const handleLogout = async () => {
        await signOut()
        router.push('/login')
    }
    return (
        <div className='container py-[40px] '>
            <div className="md:py-[27px] p-5 md:pl-[30px] md:pr-[42px] gap-5 lg:gap-[48px] bg-[#CCE9FA] rounded-[20px] grid md:flex lg:items-center">
                <div className='md:w-[24%]'>

                    <Image src={kerry} alt="director" className='rounded-[20px] mx-auto ' />
                </div>
                <div className='md:w-[76%] text-center md:text-left'>
                    <h2 className='text-xl mb-3 md:mb-6 md:text-3xl text-[#283c63]'>Application Completed!</h2>
                    <p className='text-[#686c78] text-sm md:text-base md:leading-7'>Our HR team has received your application and is currently under review. We will notify you via phone or email once this review has been completed or if we required additional information.</p>
                    <div className='md:text-right mt-5'>
                        <p className="text-[#283c63] text-xl leading-7 font-bold">Kerry Shipman</p>
                        <p className="text-[#686c78] text-base leading-7">Agency Director</p>
                    </div>
                </div>
            </div>
            <div className='next-steps max-w-[950px] mx-auto '>
                <h2 className='section-title text-center my-10'>Next Steps</h2>
                <ol className='list-decimal text-[#686C78] text-base pl-6'>
                    <li>HR Application Review.</li>
                    <li>You will receive an email of our decision to join our network.</li>
                    <li>If accepted, an offer letter will be sent from our HR partner, On-Pay.</li>
                    <li>Accept Offer Letter, Sign Documents and Upload required on-boarding documents via the On-Pay secured Portal.</li>
                    <li>Complete Orientation and Training Modules.</li>
                    <li>Login to EHR System (Used to manage and see clients).</li>
                </ol>
                <p className='text-center text-[#686C78] text-base my-8' >If you have any questions email the Support Team at <a href="admin@tsgcs.org" className='text-[#283C63] font-bold'>admin@tsgcs.org</a> or call the office and press extension 800 for the Employee Support Line. The support team is available from 10:30 AM to 5:00 PM, Eastern Time.</p>
                <p onClick={handleLogout} className='cursor-pointer button mx-auto'>Go To Login <ButtonSvg /></p>
            </div>
        </div>
    );
}

export default ApplicationCompleted;
