"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation'; 
import { BillingInsuranceIcon, ChangePasswordIcon, DashboardIcon, Humbruger, Logo, LogOut, ProfileIcon, WellnessIcon } from "@/utils/svgicons";
import Link from "next/link";
// import './SideNav.css'; 
import { useRouter } from "next/navigation";

const MobileHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('https://blacktherapy.vercel.app/');
  };

  const [isCollapsed, setIsCollapsed] = useState(false);

  const pathname = usePathname(); 

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const isActive = (path: string) => pathname === path ? 'active' : '';

  return (
    <>
      <div className="header min-h-[46px] justify-between gap-[10px] py-[10px] px-[15px] bg-white">

            <div className="logoContainer">
              <Link href="/">
                <Logo />
              </Link>
            </div>
          <button onClick={toggleSidebar} className="hamburgerButton">
            <Humbruger />
          </button>
        </div>
    <div className={`sideNav ${isCollapsed ? 'collapsed' : ''} h-[100%] overflo-custom`}>
      <div className="">

      <ul className="navList">
          <li className={isActive('/')}>
            <Link href="/">
              <DashboardIcon />
             <span>Dashboard</span>
            </Link>
          </li>
          <li className={isActive('/wellness')}>
            <Link href="/wellness">
              <WellnessIcon />
              <span>Wellness</span>
            </Link>
          </li>
          <li className={isActive('/profile')}>
            <Link href="/profile">
              <ProfileIcon />
             <span>Profile</span>
            </Link>
          </li>
          <li className={isActive('/change-password')}>
            <Link href="/change-password">
              <ChangePasswordIcon />
              <span>Change Password</span>
            </Link>
          </li>
          <li className={isActive('/billing-insurance')}>
          <Link href="/billing-insurance">
              <BillingInsuranceIcon />
              <span>Billing & Insurance</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="">
        <ul className="navList">
          <li className="!m-0">
            <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <LogOut />
               <span className="text-[#283C63] text-[600]">Log Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default  MobileHeader;
