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
              Welcome to the Black Therapy Network, a pioneering online therapy
              practice dedicated to serving the unique needs of the African
              American community. We understand that mental and emotional
              well-being are deeply intertwined with cultural identity and
              experiences. Our mission is to provide a platform where individuals,
              couples, and children can access high-quality therapy that is
              culturally sensitive, inclusive, and effective. Our team of
              experienced and compassionate therapists specializes in addressing a
              wide range of challenges faced by African Americans, from personal
              struggles to relationship dynamics. We believe that by embracing and
              celebrating cultural heritage, we can pave the way for meaningful
              healing and growth. At the Black Therapy Network, we are not just
              therapists – we are allies on your journey towards better mental
              health.{" "}
            </p>
          </div>
        </div>
      </div>
    );
  };
  export default AboutFirst;
