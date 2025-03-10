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
            <div className="mx-auto p-3 text-base leading-7 text-gray-500 rounded-lg ">
            <p className="mb-4">
              Our commitment goes beyond therapy sessions. We strive to foster a
              <strong> supportive community </strong>
              that encourages open dialogue, reduces stigma, and promotes
              <strong> self-care </strong>
              within the Black community.
            </p>

            <p className="mb-4">
              We understand the importance of
              <strong> convenience and confidentiality</strong>.
              Our secure online platform allows you to connect with a therapist
              from the comfort of your space, ensuring
              <strong> accessibility and privacy</strong>.
            </p>

            <p className="mb-2">
              Join us and take the first step toward
              <strong> healing, empowerment, and a healthier future</strong>—while
              honoring the richness of Black culture and experiences.
              <strong> Your story matters, and we are here to support you every step of the way.</strong>
            </p>
          </div>
        </div>
        <div className="">
          <Image src={about2} alt="about2" className="rounded-[20px] w-full" />
        </div>
      </div>
    </div>
  );
};
export default AboutSecond;