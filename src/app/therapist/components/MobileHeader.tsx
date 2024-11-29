"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation'; 
import { DashboardIcon, Humbruger, Logo, LogOut, BillingIcon, PasswordIcon, PaymentHistoryIcon, PayRequestIcon, AssignIcon, TrainingIcon } from "@/utils/svgicons";

import Link from "next/link";
import './SideNav.css'; 
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const MobileHeader = () => {
  const router = useRouter();
  
  const handleLogout = async() => {
    await signOut({ redirect: false })
    router.push('/login');
  };

  const [isCollapsed, setIsCollapsed] = useState(false);

  const pathname = usePathname(); 

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const handleLinkClick = (path: string) => {
    if (isCollapsed) {
      toggleSidebar();
    }

  };
  const isActive = (path: string) => pathname === path ? 'active' : '';


  return (
    <>
      <div className="header min-h-[46px] justify-between gap-[10px] py-[10px] px-[15px] bg-white">

            <div className="logoContainer">
              <Link href="/"  onClick={() => handleLinkClick("/")}>
                <Logo />
              </Link>
            </div>
          <button onClick={toggleSidebar} className="hamburgerButton">
            <Humbruger />
          </button>
        </div>
    <div className={`sideNav ${isCollapsed ? 'collapsed' : ''} h-[100%] overflo-custom z-40`}>
      <div className="">

      <ul className="navList">
          <li className={isActive('/therapist/dashboard')}>
            <Link href="/therapist/dashboard"  onClick={() => handleLinkClick("/therapist/dashboard")}>
              <DashboardIcon />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={isActive('/therapist/assignments')}>
            <Link href="/therapist/assignments"  onClick={() => handleLinkClick("/therapist/assignments")}>
           <AssignIcon />
             <span>Assignments  </span>
            </Link>
          </li>
          <li className={isActive('/therapist/training')}>
            <Link href="/therapist/training"  onClick={() => handleLinkClick("/therapist/training")}>
              <TrainingIcon/>
              <span>Training</span>
            </Link>
          </li>
          <li className={isActive('/therapist/payment-request')}>
            <Link href="/therapist/payment-request"  onClick={() => handleLinkClick("/therapist/payment-request")}>
           <PayRequestIcon />
          <span>Payment Requests</span>
            </Link>
          </li>
          <li className={isActive('/therapist/payment-history')}>
            <Link href="/therapist/payment-history"  onClick={() => handleLinkClick("/therapist/payment-history")}>
            <PaymentHistoryIcon />
          <span>Payment History</span>
            </Link>
          </li>
          <li className={isActive('/therapist/therapist/profile')}>
            <Link href="/therapist/profile"  onClick={() => handleLinkClick("/therapist/profile")}>
            <PasswordIcon />
            <span>Profile </span>
            </Link>
          </li>
          <li className={isActive('/therapist/view-task')}>
            <Link href="/therapist/view-task"  onClick={() => handleLinkClick("/therapist/view-task")}>
              <BillingIcon />
              <span>View Task</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="">
      <ul className="navList">
          <li className="!m-0">
            <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <LogOut />
              {/* {!isCollapsed &&  */}
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
