"use client";
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import bgImg from "@/assets/images/card-bg2.png"

interface CardProps {
    title: string;
    countText: string;
    imgSrc?: string | StaticImageData;
    bgColor: string
}

const WelcomeCard: React.FC<CardProps> = ({ title, countText, bgColor }) => {
    return (
        <div style={{ backgroundColor: bgColor }} className="bg-messy rounded-[10px] px-[30px] py-[40px]">
            <div className="">
                <p className="font-gothamMedium text-sm md:text-base lg:leading-7">{title}</p>
                <h3 className="mt-[10px] font-gothamBold text-[36px]">{countText}</h3>
            </div>
            {/* <div className="absolute w-full h-full inset-0 z-0">
            <Image src={bgImg} alt="vector" className="w-full h-full object-cover" />
            </div> */}
        </div>
    );
}

export default WelcomeCard;
