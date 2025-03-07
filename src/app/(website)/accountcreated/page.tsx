"use client"
import React from 'react';
import Image from 'next/image';
import kerry from "@/assets/images/kerry.png"
import Link from 'next/link';
import { ButtonSvg } from '@/utils/svgicons';

const Page = () => {
    return (
        <>
            <div className='container py-[40px] md:py-[80px] '>
                <div className="md:py-[27px] p-5 md:pl-[30px] md:pr-[42px] gap-5 lg:gap-[48px] bg-[#CCE9FA] rounded-[20px] grid md:flex lg:items-center">
                    <div className='md:w-[24%]'>
                        <Image src={kerry} alt="director-img" className='rounded-[20px] mx-auto ' />
                    </div>
                    <div className='md:w-[76%] text-center md:text-left'>
                        <h2 className='text-xl mb-3 md:mb-6 md:text-3xl text-[#283c63]'>Welcome to the Black Therapy Network Family!</h2>
                        <div className="max-w-[900px] w-full mb-8 text-[#686c78] text-base mx-auto md:leading-7">
                            Your account has been successfully created, and now it&apos;s time for the next step. Right now, people are waiting for a therapist who understands them—<strong>someone like you</strong>.
                            <br /><br />
                            The Black Therapy Network isn&apos;t just a platform; it&apos;s a movement to make therapy accessible, meaningful, and culturally aligned. We&apos;re excited to have you join us in making a real difference.
                            <br /><br />
                            <strong>Next Steps:</strong>
                            <br />
                            • Log in using the credentials you <strong>created on the previous page</strong>.
                            <br />
                            • Complete your application by providing the <strong>required information and supporting documents</strong>.
                            <br /><br />
                            Your expertise is needed, and we can&apos;t wait to have you on board.
                            <br /><br />
                            {/* <p className='w-full font-bold flex justify-end'> - Kerry Shipman, Founder & CEO</p> */}
                        </div>
                        <div className='md:text-right mt-5'>
                            <p className="text-[#283c63] text-xl leading-7 font-bold">Kerry Shipman</p>
                            <p className="text-[#686c78] text-base leading-7">Founder & CEO</p>
                        </div>

                    </div>
                </div>
                <div className='flex justify-center p-6'>
                    <Link href="/login" className='button button-lg'>
                        Login to Complete Your Application <ButtonSvg />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Page;
