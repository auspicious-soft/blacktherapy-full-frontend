import React from 'react';
import Image from 'next/image';
import { FaqTitle, GettingStart } from '@/utils/svgicons';
import Link from 'next/link';
import GetStartedImage from '@/assets/images/started-banner.jpg'
const Page = () => {
    return (
        <div className='container pt-[50px] py-[40px] md:pb-[100px]'>
            <div className='grid md:grid-cols-2 items-center gap-5'>
            <div className='order-2 md:order-none '>
                <h2 className='section-title'>Feeling better starts with a single message</h2>
                <p className='text-gray-500 text-base md:mt-[40px] mb-5'>What type of service are you looking for?</p>
            <div className='md:max-w-[489px]'>
            <div className='flex items-center justify-between bg-[#CCE9FA] rounded-[20px] p-5 '>
                    <div className='flex items-center gap-4 md:gap-[27px]'>
                        <p className='start'><FaqTitle /></p>
                        <div>
                            <h3 className='text-slate-600 text-[18px] md:text-[22px]'>Individual</h3>
                            <p className='text-gray-500 text-base'>Therapy for me!!</p>
                        </div>
                    </div>
                    <div>
                        <Link href="/booktherapy" ><GettingStart /></Link>
                    </div>
                </div>
                <div className='flex items-center justify-between bg-[#FFBBCD] rounded-[20px] p-5 my-5'>
                    <div className='flex items-center gap-4 md:gap-[27px]'>
                        <p className='start'><FaqTitle /></p>
                        <div>
                            <h3 className='text-slate-600 text-[18px] md:text-[22px]'>Individual</h3>
                            <p className='text-gray-500 text-base'>Therapy for me!!</p>
                        </div>
                    </div>
                    <div>
                        <Link href="/booktherapy" ><GettingStart /></Link>
                    </div>
                </div>
                <div className='flex items-center justify-between bg-[#FFD899] rounded-[20px] p-5 '>
                    <div className='flex items-center gap-4 md:gap-[27px]'>
                        <p className='start'><FaqTitle /></p>
                        <div>
                            <h3 className='text-slate-600 text-[18px] md:text-[22px]'>Individual</h3>
                            <p className='text-gray-500 text-base'>Therapy for me!!</p>
                        </div>
                    </div>
                    <div>
                        <Link href="/booktherapy" ><GettingStart /></Link>
                    </div>
                </div>
            </div>
            </div>
            <div className='order-1 md:order-none '>
                <Image src={GetStartedImage} alt="get started" className='rounded-[20px] w-full'/>
            </div>
            </div>
        </div>
    );
}

export default Page;
