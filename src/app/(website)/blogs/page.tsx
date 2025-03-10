"use client";
import { ButtonSvg, LineOne, LineTwo, StepOne, StepSecond, StepThree } from '@/utils/svgicons';
import BannerSection from '@/app/(website)/components/BannerSection';
import React, { useState } from 'react';
import banner from "@/assets/images/banner-img1.png"




const Page: React.FC = () => {
    const breadcrumbs = [
        { label: 'Home', url: '/' },
        { label: 'Blogs', url: '/blogs' }
    ];
    const heading = 'Latest Wellness Articles';
    const imageUrl = banner;

    return (
        <div className="main">
            <title>Blogs | Black Therapy Network</title>
            <BannerSection breadcrumbs={breadcrumbs} heading={heading} imageUrl={imageUrl} />
        
        </div>
    )
}

export default Page;

