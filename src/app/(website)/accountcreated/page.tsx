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
                        <p className='text-[#686c78] text-sm md:text-base md:leading-7'>Welcome to <strong>The Black Therapy Network!</strong> You’ve just taken an important step toward prioritizing your mental wellness, and we’re honored to support you on this journey. Our mission is to make therapy accessible, culturally aligned, and empowering—<strong>for us, by us</strong>.</p>
                        <div className='md:text-right mt-5'>
                            <p className="text-[#283c63] text-xl leading-7 font-bold">Kerry Shipman</p>
                            <p className="text-[#686c78] text-base leading-7">Agency Director</p>
                        </div>

                    </div>
                </div>
                <div className='text-center pt-[40px] md:pt-[80px]'>
                    <h2 className="section-title md:b-5">your Account has been created.</h2>
                    <p className="max-w-[882px] mb-3 md:mb-[30px] text-[#686c78] text-base mx-auto md:leading-7">Congratulations!! Your Account has been created. Please login using the email and password provided to complete your application.</p>
                    <div className='flex justify-center'>
                        <Link href="/login" className='button'>Login Now <ButtonSvg /></Link>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Page;
