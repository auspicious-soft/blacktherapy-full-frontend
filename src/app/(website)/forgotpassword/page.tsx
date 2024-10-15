"use client";
import React, {useState} from "react";
import Link from "next/link";
import ReactPlayer from "react-player";
import { ButtonSvg, LogoIcon } from "@/utils/svgicons";
import InputField from "@/app/(website)/components/InputField";
import Image from "next/image";
import animate from "@/assets/images/loginslide.png";

const Page: React.FC = () => {
const [password, setPassword] = useState("");

    return (
        <>
        <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-3 lg:gap-0 lg:grid-cols-[minmax(0,_7fr)_minmax(0,_5fr)] items-center pt-6 pb-10">
          <div className="video lg:pr-[125px] overflow-hidden">
         <div className="scrolling md:h-[600px] h-[300px] lg:h-[800px]">
         <Image src={animate} alt="amnimate"  />
         <Image src={animate} alt="amnimate"  />
         </div>
          </div>
        <div>
        <p className="mb-5 md:mb-10 text-center"><span className="inline-block "> <LogoIcon /> </span></p>
        <div className="login rounded-[20px] bg-white">
          <h1 className="bg-[#283C63] text-center py-5 md:py-[32px] text-white text-lg md:text-3xl rounded-t-[20px]">Forgot Password</h1>
          <div className="md:px-[35px] px-[15px] md:pt-10 md:pb-[27px] py-5">
          <InputField
            type="email"
            value={password}
            placeholder="Email Address"
            onChange={(e) => setPassword(e.target.value)}
          />
        <Link href="/resetpassword" className="button w-full mt-[30px]">Continue <ButtonSvg /></Link>
       
          </div>
        </div>
          </div>
        </div>
        </div>
        </>
    );
}

export default Page;
