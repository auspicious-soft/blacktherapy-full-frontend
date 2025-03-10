"use client";
import React from "react";
import about1 from "@/assets/images/img8.png";
import Image from "next/image";

const AboutFirst: React.FC = () => {
  return (
    <div className=" container py-[50px] md:py-[100px] ">
      <div className="grid items-center gap-5 md:gap-0 md:grid-cols-[minmax(0,_5fr)_minmax(0,_7fr)] ">
        <div>
          <Image src={about1} alt="about1" className="rounded-[20px] w-full" />
        </div>
        <div className="md:pl-[55px]">
          <h2 className="section-title mb-4">
            Welcome to the Black Therapy Network?
          </h2>
          <p className="text-base leading-7 text-gray-500">
            The Black Therapy Network is a pioneering online therapy platform dedicated to serving the unique mental health needs of the African American community. We recognize that mental and emotional well-being are deeply connected to cultural identity and lived experiences.
            Our mission is to create a space where individuals, couples, and families can access high-quality, culturally responsive therapy. Our experienced and compassionate therapists understand the complexities of Black life—from personal struggles to relationship challenges—and provide support tailored to your needs.
            At The Black Therapy Network, we don’t just offer therapy—we walk alongside you on your journey toward healing, growth, and empowerment.
            {" "}
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutFirst;
