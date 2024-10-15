import BannerSection from '@/app/(website)/components/BannerSection';
import OurTherapist from '@/app/(website)/components/OurTherapist'
import TherapyCard from '@/app/(website)/components/TherapyCard'
import React from 'react'
import banner from "@/assets/images/banner-img1.png";

export default function page() {
  const breadcrumbs = [
    { label: "Home ", url: "/" },
    { label: "Our Therapist", url: "/ourtherapist" },
  ];
  const heading = "Our Therapist";
  const imageUrl = banner;
  return (
    <div>
       <BannerSection
        breadcrumbs={breadcrumbs}
        heading={heading}
        imageUrl={imageUrl}
      />
      <OurTherapist />
    </div>
  )
}
