"use client";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { ButtonSvg, LogoIcon } from "@/utils/svgicons";
import InputField from "@/app/(website)/components/InputField";
import Image from "next/image";
import animate from "@/assets/images/loginslide.png";
import { forgotPasswordEmailSentService } from "@/services/client/client-service";
import { toast } from "sonner";

const Page: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await forgotPasswordEmailSentService('/forgot-password', { email });
        if (response.status === 200) {
          toast.success("Email sent successfully to you with otp");
          router.push("/resetpassword?email=" + email);
        } else {
          toast.error("Something went wrong");
        }
      } catch (err: any) {
        if (err.status === 404) toast.error("Email not found");
        else toast.error("Something went wrong");
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-3 lg:gap-0 lg:grid-cols-[minmax(0,_7fr)_minmax(0,_5fr)] items-center pt-6 pb-10">
          <div className="video lg:pr-[125px] overflow-hidden">
            <div className="scrolling md:h-[600px] h-[300px] lg:h-[800px]">
              <Image src={animate} alt="animate" />
              <Image src={animate} alt="animate" />
            </div>
          </div>
          <div>
            <p className="mb-5 md:mb-10 text-center">
              <span className="inline-block">
                <LogoIcon />
              </span>
            </p>
            <div className="login rounded-[20px] bg-white">
              <h1 className="bg-[#283C63] text-center py-5 md:py-[32px] text-white text-lg md:text-3xl rounded-t-[20px]">
                Forgot Password
              </h1>
              <div className="md:px-[35px] px-[15px] md:pt-10 md:pb-[27px] py-5">
                <form onSubmit={handleSubmit}>
                  <InputField
                    type="email"
                    value={email}
                    placeholder="Email Address"
                    onChange={handleChange}
                    required
                  />
                  <button
                    disabled={isPending}
                    type="submit"
                    className="button w-full mt-[30px]"
                  >
                    Continue <ButtonSvg />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;