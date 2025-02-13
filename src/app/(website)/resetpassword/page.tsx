"use client";
import { useState, Suspense, useTransition } from "react";
import { ButtonSvg, LogoIcon } from "@/utils/svgicons";
import InputField from "@/app/(website)/components/InputField";
import Image from "next/image";
import animate from "@/assets/images/loginslide.png";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import resetimg from "@/assets/images/img12.png";
import { forgotPasswordEmailSentService } from "@/services/client/client-service";
import { toast } from "sonner";
import ReactLoader from "@/components/ReactLoader";

const Page = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [verified, setVerified] = useState(false)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleSubmit = () => {
    startTransition(async () => {
      if (!verified) {
        try {
          const response = await forgotPasswordEmailSentService("/verify-otp", {
            otp,
          });
          if (response.status === 200) {
            toast.success("OTP verified successfully");
            setVerified(true);
          } else {
            toast.error("Something went wrong");
          }
        } catch (err: any) {
          if (err.status === 404) toast.error("Email not found");
          else toast.error("Something went wrong");
        }
      }
      else {
        if (password !== confirmPassword) {
          toast.error("Password and Confirm Password must be same");
          return;
        }
        try {
          const response = await forgotPasswordEmailSentService("/new-password", {
            password,
            token: otp
          });
          if (response.status === 200) {
            setShowPopup(true)
            setTimeout(() => {
              router.push("/login");
            }, 3000);

          } else {
            toast.error("Something went wrong");
          }
        } catch (err: any) {
          if (err.status === 404) toast.error("Email not found");
          else toast.error("Something went wrong");
        }
      }
    });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleResendOTP = () => {
    startTransition(async () => {
      try {
        const response = await forgotPasswordEmailSentService("/forgot-password", {
          email,
        });
        if (response.status === 200) {
          toast.success("Email sent successfully to you with otp")
          setVerified(true);
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
    <Suspense fallback={<ReactLoader />}>
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
                Reset Password
              </h1>
              <div className="md:px-[35px] px-[15px] md:pt-10 md:pb-[27px] py-5">
                <InputField
                  disabled={verified}
                  type="text"
                  value={otp}
                  placeholder="OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  disabled={verified}
                  className="text-[#686c78] text-sm text-right inline-block w-full mb-4 md:mb-[30px] disabled:opacity-10"
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </button>
                {verified && <div>
                  <InputField
                    type="text"
                    value={password}
                    placeholder="New Passowrd "
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputField
                    type="text"
                    value={confirmPassword}
                    placeholder="Confirm Passowrd "
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>}
                {!isPending ?
                  <button className="button w-full" onClick={handleSubmit}>
                    {!verified ? "Submit" : "Change Password"}<ButtonSvg />
                  </button>
                  :
                  <div className="flex w-full justify-center">
                    <ReactLoader />
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div
          className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClosePopup}
        >
          <div
            className="bg-white w-[584px] p-5 py-[45px] rounded-[20px] shadow-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={resetimg} alt="reset image" className="mx-auto" />
            <p className="text-[#283c63] text-3xl mt-[44px] mb-[23px]">
              Password Reset Successfully!
            </p>
            <p className="text-black">
              Redirecting to login page in 3 seconds..
            </p>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Page;