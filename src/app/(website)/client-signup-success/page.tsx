import React from 'react'
import Image from 'next/image';
import kerry from "@/assets/images/kerry.png"
import { redirect } from 'next/navigation'
import Link from 'next/link';
import { ButtonSvg } from '@/utils/svgicons';
import { auth } from '@/auth';

const ClientSignupSuccess = async () => {
    const session = await auth()
    if (!session) {
        return (
            <div className='container py-[40px] '>
                <div className="md:py-[27px] p-5 md:pl-[30px] md:pr-[42px] gap-5 lg:gap-[48px] bg-[#CCE9FA] rounded-[20px] grid md:flex lg:items-center">
                    <div className='md:w-[24%]'>

                        <Image src={kerry} alt="director" className='rounded-[20px] mx-auto' />
                    </div>
                    <div className='md:w-[76%] text-center md:text-left'>
                        <h2 className='text-xl mb-3 md:mb-6 md:text-3xl text-[#283c63]'>Welcome to The Black Therapy Network Family!</h2>
                        <p className='text-[#686c78] text-sm md:text-base md:leading-7'>

                            Welcome to The Black Therapy Network! You’ve just taken an important step toward prioritizing your mental wellness, and we’re honored to support you on this journey.
                            Our mission is to make therapy accessible, culturally aligned, and empowering—for us, by us.
                            <br />
                            <b className='py-8'>  Next Steps:</b>
                            <br /> ✅  <b>Log in to your account to finalize your profile.</b>
                            <br /> ✅ <b> Select your plan and confirm your subscription to begin your sessions.</b>
                            <br /> ✅  <b>Get matched with a therapist who understands your needs. </b> <br />
                            We’re here for you every step of the way. If you ever need assistance, don’t hesitate to reach out. Thank you for trusting us with your mental health—we see you, we support you, and we’re with you.
                        </p>
                        <div className='md:text-right mt-5'>
                            <p className="text-[#283c63] text-xl leading-7 font-bold">Kerry Shipman</p>
                            <p className="text-[#686c78] text-base leading-7"> Founder & CEO</p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center p-5'>
                    <Link href="/login" className='button'>Log In to My Account <ButtonSvg /></Link>
                </div>

            </div>
        )
    }
    if (session) {
        if ((session as any)?.user.role === 'client') {
            redirect('/customer/dashboard')
        }
        else {
            redirect('/login')
        }
    }
}

export default ClientSignupSuccess
