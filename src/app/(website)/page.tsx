import { BriefIcon, ButtonSvg, ButtonSvg2, PersoalizeIcon, StartIcon, TherapyIcon1, TherapyIcon2, TherapyIcon3, YearExpIcon, } from "@/utils/svgicons";
import Image from "next/image";
import gridImg1 from "@/assets/images/img1.png";
import gridImg2 from "@/assets/images/img2.png";
import gridImg3 from "@/assets/images/img3.png";
import gridImg4 from "@/assets/images/img4.png";
import gridImg6 from "@/assets/images/img6.jpg";
import gridImg7 from "@/assets/images/img7.png";
import pricingPic from "@/assets/images/pricingpic.png";
import cardsData from "@/data/CardsData";
import Card from "@/app/(website)/components/Card";
import btnPic from "@/assets/images/btnpic.svg";
import HomeIconCard from "@/app/(website)/components/HomeIconCard";
import Footer from "@/app/(website)/components/Footer";
import VideoPlayer from "@/app/(website)/components/VideoPlayer";
import React from 'react';
import Link from "next/link";
import { metadata } from './metadata';
import { Calendar, Check } from "lucide-react";
import { MdChatBubble } from "react-icons/md";

export { metadata };

export default function Home() {


  return (
    <div className="main">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
    </div>
  );
}
const FirstSection: React.FC = () => {
  return (
    <div className="section-one text-center px-[18px] md:px-[27px] pt-[30px] md:pt-12">
      <h1 className="font-antic md:text-[50px] text-[34px] text-[#13233B]">
        Culturally Attuned Therapy – For Us, By Us. <br /> Start Your Healing Journey Today.
      </h1>
      <div className="flex items-center pb-3 md:pb-0 justify-start md:justify-center gap-[45px] mt-7 overflow-x-auto">
        <p className="flex text-sm items-center gap-[15px] flex-zero-auto">
          {" "}
          <TherapyIcon1 /> Therapy for Individuals
        </p>
        <p className="flex text-sm items-center gap-[15px] flex-zero-auto">
          {" "}
          <TherapyIcon2 /> Therapy for Couples
        </p>
        <p className="flex text-sm items-center gap-[15px] flex-zero-auto">
          {" "}
          <TherapyIcon3 /> Therapy for Teens
        </p>
      </div>
      <div className="image-grid flex mt-7">
        <div className="first pr-[33px] w-[25%] md:flex flex-col items-center justify-between hidden ">
          <div className="h-full w-full pb-[26px]">
            <Image src={gridImg1} alt="Picture" className="h-full " />
          </div>
          <div className="w-full">
            <Image src={gridImg2} alt="Picture of the author" />
          </div>
        </div>
        <div className="second md:w-[50%] md:py-[17px] flex flex-col-reverse gap-[30px] md:flex-col items-center justify-between">
          <Link href="/getstarted" rel="" className="text-black bg-[#f3d529] flex items-center justify-center gap-3 p-4 px-5 font-normal rounded-3xl">
            Find Your Therapist Today<ButtonSvg2 />
          </Link>
          <div className="w-full">
            <VideoPlayer url='/assets/videos/videoone.mp4' />

          </div>
        </div>
        <div className="third pl-[33px] w-[25%] hidden md:flex flex-col items-center justify-between">
          <div className="w-full pb-[26px]">
            <Image src={gridImg3} alt="Picture of the author" />
          </div>
          <div className="w-full">
            <Image src={gridImg4} alt="Picture of the author" />
          </div>
        </div>
      </div>
      <div className="md:py-[100px] py-[40px]">
        <p className="text-slate-800 text-base md:text-2xl font-antic capitalize max-w-[1122px] mx-auto leading-[32px] md:leading-[50px]">Welcome to the Black Therapy Network, offering culturally attuned online therapy for the African American community. Our experienced therapists provide a safe, inclusive space for individuals, couples, and children. Celebrate your cultural identity and achieve emotional well-being with our support. Start your healing journey with us today.
        </p>
      </div>
    </div>
  );
};
const SecondSection: React.FC = () => {
  return (
    <div className="section-two container mx-auto md:mt-[30px] pb-[50px] md:pb-[100px]">
      <div className="mb-5 md:mb-[40px]">
        <h1 className='section-title'>What type of support do you need?</h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 gap-2.5 w-full ">
        {cardsData.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            buttonText={card.buttonText}
            buttonLink={card.buttonLink}
            imgSrc={card.imgSrc}
            desc={card.desc}
          />
        ))}
      </div>

    </div>

  );
};
const ThirdSection = () => {
  return (
    <div className="section-three bg-[#283C63]">
      <div className="container py-[50px] md:py-[100px]">
        <div className="grid md:grid-cols-2 gap-5 lg:gap-[60px]">
          <div>
            <Image src={gridImg7} alt="Therapy session" className="w-full h-full rounded-[20px] object-cover" />
          </div>
          <div>
            <h2 className="section-title !text-white">How It Works?</h2>
            <p className="mt-[10px] md:mt-5 mb-[18px] md:mb-10 text-zinc-300 text-sm md:text-base lg:leading-7">
              Therapy Should Feel Like Home. Here&apos;s How It Works:
            </p>
            <div className="grid gap-y-[30px]">
              <HomeIconCard
                icon={<Check size={32} className="text-white" />}
                maintitle="1. Brief assessment"
                text="Answer a few quick questions about your needs and preferences"
              />
              <HomeIconCard
                icon={<MdChatBubble size={32} className="text-white" />}
                maintitle="2. Personalized match"
                text="We connect you with a therapist who fits your background and concerns"
              />
              <HomeIconCard
                icon={<Calendar size={32} className="text-white" />}
                maintitle="3. Start therapy"
                text="Schedule your first session and begin your journey to healing"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FourthSection = () => {
  return (
    <div className="section-three flex gap-x-[100px] justify-between">
      <div className="container pt-[50px] md:pt-[40px]">
        <div className="sm:flex justify-between gap-[100px] sm:space-y-0 space-y-8">
          <div className="flex-1">
            <h1 className="text-[40px] pb-[20px]">Affordable Therapy, Designed for You</h1>
            <div className="flex flex-col gap-8">
              <div className="flex items-center p-1 gap-[20px] text-[#686C78]">
                <Image src={btnPic} alt="Pricing" width={30} height={30} className="w-[100px] h-[100px] object-cover rounded-lg bg-[#cce9fa] p-6 border-[#283c63] border-[2px]" />
                <div>
                  Invest in your mental health for less than $12 per day—because your well-being is worth more than a cup of coffee.
                </div>
              </div>
              <div className="flex items-center p-1 gap-[20px] text-[#686C78]">
                <Image src={btnPic} alt="Pricing" width={30} height={30} className="w-[100px] h-[100px] object-cover rounded-lg bg-[#cce9fa] p-6 border-[#283c63] border-[2px]" />
                <div>
                  Invest in your mental health for less than $12 per day—because your well-being is worth more than a cup of coffee.
                </div>
              </div>
              <Link href="/plans" rel="" className="text-white bg-[#283c63] flex items-center justify-center gap-3 p-4 px-5 font-normal rounded-3xl">
                See Pricing Plans<ButtonSvg />
              </Link>
            </div>
          </div>
          <div className="sm:flex-1 hidden sm:block">
            <Image src={pricingPic} alt="Pricing" width={532} height={458} className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

const FifthSection = () => {
  return (
    <div className="section-four overflow-hidden container mt-[50px] md:mt-[100px]">
      <h2 className="section-title mb-6">Benefits of Therapy</h2>
      <div className="flex flex-wrap items-center relative bg-[#CCE9FA] rounded-[20px]">
        <div className="md:w-[45%] md:pr-[20px]">
          <Image src={gridImg6} alt="Picture" className="rounded-[20px]" />
        </div>
        <div className="md:w-[55%] px-[15px] lg:pl-[50px] py-5 lg:pr-[60px]">
          <p className="text-gray-500 text-sm md:text-base font-normal md:leading-7">

            <b>Why Therapy? Transform Your Life With a Black Therapist Who Gets You.</b> <br />

            ✔ Experience <b>emotional healing and stress relief</b>  <br />
            ✔ Develop <b>healthy coping strategies and self-awareness</b> <br />
            ✔ Strengthen <b>relationships and communication skills</b> <br />
            ✔ Overcome <b>trauma and life challenges</b> <br />
            ✔ Work with a therapist who <b>understands Black cultural experiences</b> <br />
          </p>
          <Link href="/getstarted" rel="" className="bg-[#f3d529] flex items-center justify-center gap-3 p-4 px-5 font-normal rounded-3xl mt-4 text-black">
            Find a Therapist Who Gets You<ButtonSvg2 />
          </Link>
        </div>
        <div className="custom-size absolute right-[10px] md:right-[-60px] top-[-30px] md:top-[-60px] rotate-[-10deg] ">
          <YearExpIcon />
        </div>
      </div>
    </div>
  );
};
const SixthSection: React.FC = () => {
  return (
    <div className="section-five container py-[50px] md:py-[100px] ">
      <h2 className="section-title text-center mb-5">Did You Know?</h2>
      <p className="text-gray-500 text-sm md:text-base md:leading-7 text-center font-semibold max-w-[749px] mx-auto mb-8">
        ✔ Black individuals are more likely to trust and open up to Black therapists. <br />
        ✔ Only 4% of therapists in the U.S. are Black—BTN is changing that. <br />
        ✔ Consistent therapy can reduce stress, anxiety, and depression by up to 40%.
      </p>
      {/* <p className="text-gray-500 text-sm md:text-base font-normal md:leading-7 text-center max-w-[749px] mx-auto">Black patients may feel that Black therapists can better understand their experiences and identify with their cultural stressor challenges.</p> */}
      {/* <div className="grid md:grid-cols-3 text-center gap-5 pt-[30px] md:pt-10 pb-[20px] md:pb-[60px]">
        <div>
          <h2 className="section-title md:mb-2.5">886</h2>
          <h3 className="text-lg md:text-2xl">Live Touched</h3>
        </div>
        <div>
          <h2 className="section-title md:mb-2.5">67</h2>
          <h3 className="text-lg md:text-2xl">Specialization</h3>
        </div>
        <div>
          <h2 className="section-title md:mb-2.5">203</h2>
          <h3 className="text-lg md:text-2xl">Therapists in the <br /> Black Therapy Network</h3>
        </div>
      </div> */}
      <div className="video-wrap">
        <VideoPlayer url='/assets/videos/therapyvideo.mp4' />

      </div>
    </div>
  );
};