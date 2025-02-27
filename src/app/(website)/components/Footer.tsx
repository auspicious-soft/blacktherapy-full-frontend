"use client"
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import {
  ButtonSvg,
  DribbleIcon,
  FacebookIcon,
  FigmaIcon,
  FooterCall,
  FooterMail,
  FooterMap,
  LogoIcon,
  WhatsappIcon,
  YouTubeIcon,
} from "@/utils/svgicons";
import ii from "@/assets/images/footer.gif"
import footergif from "@/assets/images/footer.gif";
interface Props {
  className?: string;
}

const Footer: React.FC = () =>{
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    // Initial check
    handleResize();
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };





  return (
    <div className="main-footer">
      <div className="relative z-[1]">
        <div className="container ">
           <div
             className="grid md:grid-cols-2 items-center py-[40px] md:py-[50px] px-[15px] md:px-[100px] rounded-[20px] bg-[#fff] shadow-xs"
             style={{ boxShadow: '0px -6px 24px 0px rgba(0, 0, 0, 0.10)' }}
             >
            <div className="text-center md:text-left">
              <h2 className="section-title mb-[10px] md:mb-5">Stay Connected</h2>
              <p className="max-w-[489px] text-gray-500 md:text-base text-sm mx-auto md:mx-0">
                Subscribe to get occasional emails from Rico. You can
                unsubscribe at any time and we won&#39;t share your info.
              </p>
            </div>
          <div className="mt-[30px] md:mt-0 text-center">
            <label htmlFor="" className="w-full max-w-[259px] md:max-w-full md:text-right text-center inline-block relative">
            <input type="text" placeholder="Email" 
            className="w-full max-w-[259px] md:max-w-[319px] border border-solid border-[#686C78] rounded-[24px] md:h-[55px] px-[30px] py-[9px] md:py-[10px] text-sm md:text-base text-[#686C78] "
            />
            <button className="button-arrow p-2 absolute right-5 md:right-6 top-2 md:top-4"> <ButtonSvg/></button>
            </label>
          </div>
          </div>
        </div>
      </div>
      <div className="relative mt-[-112px]  bg-[#232529] py-[26px] sm:py-5">
        <div className="container mt-[140px] md:mt-[166px]">
          <footer className=" relative">
            <div className="md:flex justify-between grid relative">
              <div className="column-1 md:w-[50%]">
                <div className="md:max-w-[489px]">
                  <div className="footer-logo mb-[30px]">
                    <LogoIcon />
                  </div>
                  <p className="md:leading-7 text-[#686C78] text-sm mb-10">
                    CARF International accreditation demonstrates a
                    program&apos;s quality, transparency, and commitment to the
                    satisfaction of the persons served. CARF International is an
                    independent, nonprofit accreditor of health and human
                    services.
                  </p>
                  <div className="grid gap-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-icons">
                        <FooterCall />
                      </div>
                      <div className="flex flex-1 flex-col items-start justify-center">
                        <p className="text-[#8C8C8C] text-xs">Support Team</p>
                        <p className="text-[#CACACA] text-xs md:text-sm">
                          (888) 383-6002 – Phone <br /> 980-333-4063 – Fax
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-icons">
                        <FooterMail />
                      </div>
                      <div className="">
                        <p className="text-[#8C8C8C] text-xs">Email</p>
                        <p className="text-[#CACACA] text-xs md:text-sm">
                          support@blacktherapy.n
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-icons">
                        <FooterMap />
                      </div>
                      <div className="flex flex-1 flex-col items-start">
                        <p className="text-[#8C8C8C] text-xs">
                          Mailing Address
                        </p>
                        <p className="leading-5 text-[#CACACA] text-xs md:text-sm">
                          The Ship Group Technologies , P.O. BOX 42915 ,<br />
                          Charlotte, North Carolina 28215
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Column-22 footer-items md:w-[25%] mt-10 md:mt-0">
                <h3 className="footer-dropdowns capitalize text-white text-lg mb-6"
                onClick={isMobile ? toggleDropdown : undefined}>
                  Explore
                </h3>
                {(isMobile && isDropdownOpen) || !isMobile ? (
                <div  className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                  isMobile ? (isDropdownOpen ? 'max-h-screen' : 'max-h-0') : 'max-h-screen'
                } mb-8`}>
               <ul className="flex flex-col items-start gap-5 pl-[9px] md:pl-0">
                  <li>
                    <Link href="/about">About us</Link>
                  </li>
                  <li>
                    <Link href="#">Book Appointment</Link>
                  </li>
                  <li>
                    <Link href="#">Letest News</Link>
                  </li>
                  <li>
                    <Link href="/ourtherapist">Our Therapist</Link>
                  </li>
                  <li>
                    <Link href="/faq" rel="noreferrer">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" rel="noreferrer">
                      Contact
                    </Link>
                  </li>
                </ul>
               </div>
              ) : null}
              </div>
            </div>
            <div className="copyright mt-[66px]">
              <div className="grid md:grid-cols-2 items-center">
                <div className="icon flex items-center gap-2 justify-center md:justify-start">
                  <a href="https://www.facebook.com/TheBlackTherapyNetwork" target="_blank" rel="noopener noreferrer" className="bg-icons"><FacebookIcon /></a>
                  <a href="" className="bg-icons"><YouTubeIcon /></a>
                  <a href="" className="bg-icons"><DribbleIcon /> </a>
                  <a href="" className="bg-icons"><FigmaIcon /> </a>
                  <a href="" className="bg-icons"><WhatsappIcon /></a>
                </div>
                <div className="md:absolute bottom-[90px] right-[40px] pt-[40px] pb-5 md:py-0">
               <Image
                  src={footergif}
                  unoptimized
                  width={138}
                  height={138}
                  alt="Comp1one"
                  className="h-[138px] w-[138px] mx-auto self-end object-cover"
                />
               </div>
                <div className="md:text-right text-center">
                  <p className="text-neutral-400 text-xs md:text-sm">© 2000-2024, All Rights Reserved</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default Footer;