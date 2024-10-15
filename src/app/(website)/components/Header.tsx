"use client";
import Link from 'next/link';
import { useState } from 'react';
import { PhoneIcon, MailIcon, LogoIcon, ToggleIcon, ToggleClose } from '@/utils/svgicons';
import Image from 'next/image';
import logo from "@/assets/logo.png";

const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  }; 

  const handleToggleClose = () => {
    setIsToggleOpen(false);
  };

  const iconstyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "12px",
    color: "#fff",
  };

  return (
    <div>
      <div className='px-[10px]'>
      <div className="announcement-bar mt-2.5 rounded-[27px] hidden md:flex justify-between items-center bg-[#283C63] px-[26px] py-[9px]">
        <div className="left-icons flex items-center gap-6">
          <div style={iconstyle}>
          <span><PhoneIcon /> </span>
          <p>
            (888) 383-6002
          </p>
          </div>
          <div style={iconstyle}>
           <span> <PhoneIcon /></span>
           <p>
            980-333-4063
          </p>
          </div>
          <div style={iconstyle}>
            <span><MailIcon /></span>
            <p>
            hello@theblacktherapynetwork.com
          </p>
          </div>
        </div>
        <div className="right flex items-center gap-6">
        <Link href="/login" className="text-white text-xs">
             Login/Sign Up
            </Link>
        </div>
      </div>
      </div>
      <div className='nav-container w-full max-w-[1260px] mx-auto flex items-center justify-between pt-5 px-[15px]  md:px-[25px]'>
        <div className="nav_logo">
          <Link href="/" className="nav-logo-link">
            <LogoIcon /> 
          </Link>
        </div>
        <ul className={`nav-menu ${isToggleOpen ? 'open' : ''}`}>
          <button className="close-btn lg:hidden" onClick={handleToggleClose}>
            <ToggleClose />
          </button>
          <li>
            <Link href="/" className="nav-menu-list">Home</Link>
          </li>
          <li>
            <Link href="/about" className="nav-menu-list">About</Link>
          </li>
          <li>
            <Link href="/therapistnetwork" className="nav-menu-list">Join Our Therapist Network</Link>
          </li>
          <li>
            <Link href="/faq" className="nav-menu-list">FAQ</Link>
          </li>
          <li>
            <Link href="/contact" className="nav-menu-list lg:!inline-block lg:text-sm lg:text-white lg:bg-[#283C63] rounded-[30px] lg:!px-[30px] !py-[13px]">Contact</Link>
          </li>
          <li className="md:hidden mt-4">
          <Link href="/login" className="text-white text-sm bg-[#283C63] rounded-[30px] px-[30px] py-[13px]">
             Login/Sign Up
            </Link>
        </li>
        </ul>

        <p className="menuToggleBtn lg:hidden" onClick={handleToggleOpen}>
          <ToggleIcon />
        </p>
      </div>
    </div>
  );
};

export default Header;
