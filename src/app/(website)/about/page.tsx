"use client";
import BannerSection from "@/app/(website)/components/BannerSection";
import React from "react";
import Image from "next/image";
import AboutDropdown from "@/app/(website)/components/AboutDropdown";
import AboutFirst from "@/app/(website)/components/AboutFirst";
import AboutSecond from "@/app/(website)/components/AboutSecond";
import AboutSlider from "@/app/(website)/components/AboutSlider";
import banner from "@/assets/images/banner-img1.png";
import about1 from "@/assets/images/img8.png";
import about2 from "@/assets/images/img9.png";

const dataSlider = [
  {
    id: 1,
    title: "I was skeptical about therapy initially, but Black Therapy Network proved me wrong. The therapists' expertise and compassionate approach made every session valuable. Therapy here not only helped me cope but also flourish in my personal and professional life. It's been an incredible journey, and I'm thankful for their support.",
    tagline: "Athlete",
    image: about1,
    name: "Leon Jean",
  },
  {
    id: 2,
    title: "I was skeptical about therapy initially, but Black Therapy Network proved me wrong. The therapists' expertise and compassionate approach made every session valuable. Therapy here not only helped me cope but also flourish in my personal and professional life. It's been an incredible journey, and I'm thankful for their support.",
    tagline: "Client",
    image: about2,
    name: "Alesha Martin",
  },
];

const Page: React.FC = () => {
  const breadcrumbs = [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
  ];
  const heading = "Normalizing: Therapy in Black Community";
  const imageUrl = banner;

  return (
    <div>
      <title>About | Black Therapy Network</title>
      <BannerSection
        breadcrumbs={breadcrumbs}
        heading={heading}
        imageUrl={imageUrl}
      />
      <AboutFirst />
      <AboutSecond />
      <AboutDropdown />
      <AboutSlider data={dataSlider} />
    </div>
  );
};

export default Page;
