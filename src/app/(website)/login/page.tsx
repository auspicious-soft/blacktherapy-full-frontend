'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ReactPlayer from "react-player";
import { ButtonSvg, LogoIcon } from "@/utils/svgicons";
import InputField from "@/app/(website)/components/InputField";
import Image from "next/image";
import animate from "@/assets/images/loginslide.png";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "@/actions";

const Page: React.FC = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  useEffect(() => {
    if (session) {
      if ((session as any)?.user?.role === 'therapist') {
        const isOnboarded = (session as any)?.user?.onboardingCompleted
        const verified = (session as any)?.user?.status
        if (isOnboarded && verified === 'Active') router.push('/therapist/dashboard')
        else router.push('/onboarding')
      }
      else if ((session as any)?.user?.role === 'client') {
        router.push('/customer/dashboard')
      }
      else {
        router.push('/admin/dashboard')
      }
    }
  }, [router, session])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!email || !password) return toast.error('All fields are required')
    startTransition(async() => {
      const resss = await loginAction({ email, password })
      console.log('resss: ', resss);
      if (resss?.success) {
        toast.success('Logged in successfully')
        if (resss?.data?.user?.role === 'client') {
          window.location.href = '/customer/dashboard'
        }
        else if (resss?.data?.user?.role === 'therapist') {
          const isOnboarded = resss?.data?.user?.onboardingCompleted
          const verified = resss?.data?.user?.onboardingApplication?.status
          if (isOnboarded && verified === 'Active') window.location.href = '/therapist/dashboard'
          else window.location.href = '/onboarding'
        }
        else {
          window.location.href = '/admin/dashboard'
        }
      } else {
        toast.error(Array.isArray(resss?.message) ? resss?.message[0].message : resss?.message);
      }
    })
  }

  return (
    <div className="container">
      <div className="grid md:grid-cols-2 gap-8 md:gap-3 lg:gap-0 lg:grid-cols-[minmax(0,_7fr)_minmax(0,_5fr)] items-center pt-6 pb-10">
        <div className="video lg:pr-[125px] overflow-hidden">
          <div className="scrolling md:h-[600px] h-[300px] lg:h-[800px]">
            <Image src={animate} alt="animate" />
            <Image src={animate} alt="animate" />
          </div>
        </div>
        <div>
          <p className="mb-5 md:mb-10 text-center"><span className="inline-block "> <LogoIcon /> </span></p>
          <div className="login rounded-[20px] bg-white">
            <h1 className="bg-[#283C63] text-center py-5 md:py-[32px] text-white text-lg md:text-3xl rounded-t-[20px]">Sign in To Your Account</h1>
            <div className="md:px-[35px] px-[15px] md:pt-10 md:pb-[27px] py-5">
              <form onSubmit={handleSubmit}>
                <InputField
                  type="email"
                  value={email}
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <div className="role-toggle mb-4 md:mb-[30px] flex justify-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      required
                      value="client"
                      checked={role === "client"}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-radio text-blue-600"
                    />
                    <span>Member</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      required
                      name="role"
                      value="therapist"
                      checked={role === "therapist"}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-radio text-blue-600"
                    />
                    <span>Clinician</span>
                  </label>
                </div> */}
                <Link href="/forgotpassword" className="text-[#686c78] text-sm text-right inline-block w-full mb-4 md:mb-[30px]">Forgot Password</Link>
                <button type="submit" className="button w-full">{!isPending ? 'Submit' : 'Submitting...'} </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;