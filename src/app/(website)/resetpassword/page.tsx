 "use client"
import { useState } from 'react';
import { ButtonSvg, LogoIcon } from "@/utils/svgicons";
import InputField from "@/app/(website)/components/InputField";
import Image from "next/image";
import animate from "@/assets/images/loginslide.png"
import { useRouter } from 'next/router';
import Link from "next/link";
import resetimg from "@/assets/images/img12.png"

const Page = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup =() =>{
    setShowPopup(true);
  }
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const [otp, setOtp] = useState('');
   const [newPassword, setNewPassword] = useState('');
//   const router = useRouter();

// const handleSubmit = () => {
//   setShowPopup(true);
//   setTimeout(() => {
//     setShowPopup(false);
//     router.push('/login');
//   }, 2000); // Hide the popup after 2 seconds and redirect to login page
// };
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
          <h1 className="bg-[#283C63] text-center py-5 md:py-[32px] text-white text-lg md:text-3xl rounded-t-[20px]">Reset Password </h1>
          <div className="md:px-[35px] px-[15px] md:pt-10 md:pb-[27px] py-5">
          <InputField
            type="text"
            value={otp}
            placeholder="OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <InputField
            type="password"
            value={newPassword}
            placeholder="Password"
           onChange={(e) => setNewPassword(e.target.value)}
          />
            <InputField
            type="password"
            value={newPassword}
            placeholder="Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
    
          <button className="text-[#686c78] text-sm text-right inline-block w-full mb-4 md:mb-[30px]">Resend OTP </button>
          <button className="button w-full" onClick={handlePopup}>Submit <ButtonSvg /></button>
          </div>
        </div>
          </div>
        </div>
        </div>
        {showPopup && (
        <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"  onClick={handleClosePopup}>
          <div className="bg-white w-[584px] p-5 py-[45px] rounded-[20px] shadow-lg text-center" onClick={(e) => e.stopPropagation()}>
          <Image src={resetimg} alt="reseettt" className='mx-auto' />
            <p className="text-[#283c63] text-3xl mt-[44px] mb-[23px]">Password Reset Successfully!</p>
            <Link href="/login" className='text-[#395996] text-base'>Login To Continue</Link>
          </div>
        </div>
      )}
        </>
    );
};

export default Page;
