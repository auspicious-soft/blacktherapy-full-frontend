"use client"; // <===== REQUIRED

import React from "react";
import Image, { StaticImageData } from 'next/image';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { CommaIcon } from "@/utils/svgicons";

interface Slide {
  id: number;
  title: string;
  tagline: string;
  image: string | StaticImageData;
  name: string;

}

interface DemoSliderProps {
  data: Slide[];
}

const AboutSlider: React.FC<DemoSliderProps> = ({ data }) => {
  return (
    <section className="aboutslider mb-[300px] md:mb-[180px]">
      <div className="container">
        <ul className="lg:py-[76px] p-5 md:p-[40px] lg:px-[85px] max-w-[699px] bg-[#CCE9FA] rounded-[20px] relative bottom-[-250px] md:bottom-auto md:top-[80px]">
          <Swiper
            navigation={false}
            pagination={{ type: "bullets", clickable: true }}
            autoplay={true}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
          >
            {data.map(({ id, image, tagline, name, title }) => (
              <SwiperSlide key={id} className="cursor-pointer">
                <h2 className="text-zinc-800 text-[24px] md:text-[46px] md:leading-[66px] mb-5 md:mb-[48px]"> Client Review</h2>
                <div className="flex gap-5">
                  <CommaIcon />
                  <p className="text-gray-500 text-base md:leading-7  max-w-[480px] w-[calc(100%-30px)]">
                    {title}
                  </p>
                </div>
                <div className="flex items-center gap-5 mt-[30px] md:mt-[65px] pl-[49px]">
                  <div className="imgg ">
                    <Image src={image} alt="" className="w-[67px] h-[67px] rounded-full object-cover " />
                  </div>
                  <div className="text">
                    <h3 className="text-zinc-800 text-xl">{name} </h3>
                    <p className="text-gray-500 text-base ">{tagline} </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>
    </section>
  );
};

export default AboutSlider;