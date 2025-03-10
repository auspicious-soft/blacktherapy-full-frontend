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
import about3 from "@/assets/images/img20.jpg";
import about4 from "@/assets/images/img21.jpg";
import about5 from "@/assets/images/img22.jpg";
import { ButtonSvg2 } from "@/utils/svgicons";
import Link from "next/link";

const dataSlider = [
  {
    id: 1,
    title: "I was skeptical about therapy at first, but Black Therapy Network changed my perspective. My therapist’s compassionate approach made every session meaningful. Thanks to this network, I’ve grown both personally and professionally.",
    tagline: "Marketing Executive",
    image: about1,
    name: "Alesha Martin",
  },
  {
    id: 2,
    title: "As a Black man, I wanted a therapist who understood my experiences without having to explain every detail. The Black Therapy Network provided that. Therapy has helped me find balance, and I feel stronger mentally and emotionally",
    tagline: "Professional Athlete",
    image: about2,
    name: "Leon Jean",
  },
  {
    id: 3,
    title: "This was the first time I felt truly heard in therapy. My therapist understood my struggles as a Black woman and helped me heal in ways I never expected. I finally feel like I’m becoming the best version of myself",
    tagline: "Educator & Mother",
    name: "Tasha Reynolds",
    image: about3,
  },
  {
    id: 4,
    title: "Couples therapy through The Black Therapy Network helped us communicate better and rebuild trust in our marriage. Our therapist gave us practical tools that actually worked.",
    name: "Jamal & Patrice Williams",
    tagline: "Married Couple",
    image: about4,
  },
  {
    id: 5,
    title: "Finding culturally sensitive therapy for my son was a struggle until I found Black Therapy Network. His therapist made him feel comfortable opening up, and I’ve seen a huge positive change in him.",
    name: "Marcus Holloway",
    tagline: "Father & Small Business Owner",
    image: about5
  }
];

const Page: React.FC = () => {
  const breadcrumbs = [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
  ];
  const heading = "About The Black Therapy Network | Normalizing Therapy in the Black Community";
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
      <div className="max-w-2xl mx-auto text-center py-12 px-4">
        <h2 className="text-2xl font-bold mb-4">
          <strong>Start Your Healing Journey Today</strong>
        </h2>

        <p className="mb-8 text-lg">
          Your well-being matters, and seeking therapy is a sign of strength. Take the first step today—
          <strong>connect with a therapist who understands you.</strong>
        </p>

        <Link href="/getstarted" rel="" className="text-black bg-[#f3d529] flex items-center justify-center gap-3 p-4 px-5 font-normal rounded-3xl hover:opacity-50">
          Find Your Therapist Today<ButtonSvg2 />
        </Link>
      </div>
      <AboutSlider data={dataSlider} />
    </div>
  );
};

export default Page;
