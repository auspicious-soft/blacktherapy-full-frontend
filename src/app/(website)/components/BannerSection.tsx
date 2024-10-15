"use client";
import React from 'react';
  import Image, {StaticImageData} from 'next/image';
import Link from 'next/link';
interface Breadcrumb {
  label: string;
  url: string;
}
interface BannerSectionProps {
  breadcrumbs: Breadcrumb[]; 
  heading: string;
  imageUrl: string | StaticImageData;
}

const BannerSection: React.FC<BannerSectionProps> = ({ breadcrumbs, heading, imageUrl }) => {
  return (
    <div className="container  mt-[25px] lg:mt-[50px]">
    <div className="relative ">
      <Image src={imageUrl} className="rounded-[20px] w-full min-h-[200px] object-cover"  alt={heading} /> 
      {/* <img className="object-cover w-full h-80 md:h-96" src={imageUrl} alt={heading} /> */}
      <div className="absolute inset-0 bg-opacity-50 bg-[#283C63] flex items-center justify-center rounded-[20px]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center ">
          <nav className="" aria-label="Breadcrumb">
            <ol className="breadcrumbs-outer inline-flex flex-wrap bg-[#7FAEB5] py-2 rounded-[20px] px-5 items-center justify-center space-x-1">
                {breadcrumbs.map((breadcrumb, index) => (
                  <li key={index}>
                    <Link href={breadcrumb.url}>
                      <p className="text-white text-sm">{breadcrumb.label}</p>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
            <h1 className="mt-5 text-2xl md:text-[40px] leading-[36px] md:leading-[53px] text-white">{heading}</h1>

          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BannerSection;
