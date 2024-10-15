"use client";
import React from "react";
import about2 from "@/assets/images/img9.png";
import Image from "next/image";

const AboutSecond: React.FC = () => {
    return (
      <div className="container ">
        <div className="grid items-center md:grid-cols-[minmax(0,_7fr)_minmax(0,_5fr)] gap-5 md:gap-0">
          <div className="md:pr-[55px]">
            <h2 className="section-title mb-4">
              Culturally Sensitive Therapy for African Americans
            </h2>
            <p className="text-base leading-7 text-gray-500">
              Our commitment goes beyond therapy sessions; we strive to create a
              supportive community that encourages open dialogue, reduces stigma,
              and promotes self-care within the African American community. We
              understand the importance of convenience and confidentiality. Our
              secure online platform allows you to access therapy from the comfort
              of your own space, ensuring that seeking help is both accessible and
              private. Join us at the Black Therapy Network and embark on a
              transformative path towards emotional well-being, empowerment, and a
              brighter future, all while honoring the richness of African American
              culture and experiences. Your story matters, and we are here to
              support you every step of the way.
            </p>
          </div>
          <div className="">
            <Image src={about2} alt="about2" className="rounded-[20px] w-full" />
          </div>
        </div>
      </div>
    );
  };
  export default AboutSecond;