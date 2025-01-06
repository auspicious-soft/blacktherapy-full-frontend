import { BriefIcon, ButtonSvg, PersoalizeIcon, StartIcon, TherapyIcon1, TherapyIcon2, TherapyIcon3, YearExpIcon, } from "@/utils/svgicons";
import Image from "next/image";
import gridImg1 from "@/assets/images/img1.png";
import gridImg2 from "@/assets/images/img2.png";
import gridImg3 from "@/assets/images/img3.png";
import gridImg4 from "@/assets/images/img4.png";
import gridImg5 from "@/assets/images/img5.png";
import gridImg6 from "@/assets/images/img6.png";
import gridImg7 from "@/assets/images/img7.png";
import cardsData from "@/data/CardsData";
import Card from "@/app/(website)/components/Card";
import Video from 'next-video';
import HomeIconCard from "@/app/(website)/components/HomeIconCard";
import Footer from "@/app/(website)/components/Footer";
import VideoPlayer from "@/app/(website)/components/VideoPlayer";
import React from 'react';
import Link from "next/link";
import { metadata } from './metadata';

export { metadata };

export default function Home() {


  return (
    <div className="main">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <ForthSection />
      <FifthSection />
     
    </div> 
  );
}
const FirstSection: React.FC = () => {
  return (
    <div className="section-one text-center px-[18px] md:px-[27px] pt-[30px] md:pt-12">
    <h1 className="font-antic md:text-[50px] text-[34px] text-[#13233B]">
      Your Wellness <br /> Journey Starts Now
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
      <Link href="/getstarted" rel="" className="button">
        Get Started Now <ButtonSvg />
       </Link>
        <div className="w-full">
        <VideoPlayer url='/assets/videos/videoone.mp4'/>

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
const SecondSection: React.FC =() => {
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
    />
  ))}
  </div>
  </div>

);
};
const ThirdSection =() => {
  return (
    <div className="section-three bg-[#283C63]">
      <div className="container py-[50px] md:py-[100px]">
        <div className="grid md:grid-cols-2 gap-5 lg:gap-[60px]">
          <div>
            <Image src={gridImg7} alt="Picture" className="w-full h-full rounded-[20px]"/>
          </div>
          <div>
            <h2 className="section-title !text-white">How It Works?</h2>
            <p className="mt-[10px] md:mt-5 mb-[18px] md:mb-10 text-zinc-300 text-sm md:text-base lg:leading-7">Connect with culturally attuned therapists on our platform. Schedule sessions, receive personalized support, and embark on a journey of healing and growth tailored to the African American experience. Join us today.</p>
           <div className="grid gap-y-[30px]">
           <HomeIconCard
        icon={<BriefIcon />}
        maintitle="Brief assessment"
        text="Answer a few questions aboutyour preferences."
      />
       <HomeIconCard
        icon={<PersoalizeIcon />}
        maintitle="Personalized match"
        text="Answer a few questions aboutyour preferences."
      />
       <HomeIconCard
        icon={<StartIcon/>}
        maintitle="Start therapy"
        text="Answer a few questions aboutyour preferences."
      />
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const ForthSection =() => {
return (
<div className="section-four overflow-hidden container mt-[50px] md:mt-[100px]">
 <h2 className="section-title mb-6">Benefits of Therapy</h2>
  <div className="flex flex-wrap items-center relative bg-[#CCE9FA] rounded-[20px]">
    <div className="md:w-[45%] md:pr-[20px]"> 
      <Image src={gridImg6} alt="Picture" className="rounded-[20px]"/>
    </div>
    <div className="md:w-[55%] px-[15px] lg:pl-[50px] py-5 lg:pr-[60px]">
      <p className="text-gray-500 text-sm md:text-base font-normal md:leading-7">Therapy is a transformative journey that brings forth a wealth of benefits across all aspects of life. Whether you&apos;re an individual seeking personal growth, a couple navigating challenges, or a family fostering strong bonds, therapy offers a pathway to positive change. Through therapy, you can experience emotional healing, find resolution to conflicts, develop effective coping strategies, and gain profound insights into your thoughts and behaviors. Moreover, therapy fosters improved communication skills, which are crucial for navigating relationships successfully. With culturally sensitive therapy, like what we offer at the Black Therapy Network, you also gain the advantage of exploring your unique experiences within a supportive and understanding environment.</p>
    </div>
      <div className="custom-size absolute right-[10px] md:right-[-60px] top-[-30px] md:top-[-60px] rotate-[-10deg] ">
        <YearExpIcon />
      </div>
  </div>
</div>
);
};
const FifthSection: React.FC =()=>{
  return (
   <div className="section-five container py-[50px] md:py-[100px] ">
    <h2 className="section-title text-center mb-5">Fun Facts</h2>
    <p className="text-gray-500 text-sm md:text-base font-normal md:leading-7 text-center max-w-[749px] mx-auto">Black patients may feel that Black therapists can better understand their experiences and identify with their cultural stressor challenges.</p>
   <div className="grid md:grid-cols-3 text-center gap-5 pt-[30px] md:pt-10 pb-[20px] md:pb-[60px]">
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
   </div>
   <div className="video-wrap"> 
   <VideoPlayer url='/assets/videos/therapyvideo.mp4'/>
    
   </div>
   </div> 
  );
};