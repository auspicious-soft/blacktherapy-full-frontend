"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation'; 
import { DashboardIcon, Humbruger, Logo, LogOut, BillingIcon, PasswordIcon, PaymentHistoryIcon, PayRequestIcon, AssignIcon } from "@/utils/svgicons";

import Link from "next/link";
import './SideNav.css'; 
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const MobileHeader = () => {
  const router = useRouter();
  
  const handleLogout = async() => {
    await signOut({ redirect: false })
    router.push('/');
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
            <Link href="/therapist/dashboard">
              <DashboardIcon />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={isActive('/assignments')}>
            <Link href="/therapist/assignments">
           <AssignIcon />
             <span>Assignments  </span>
            </Link>
          </li>
          <li className={isActive('/therapist/training')}>
            <Link href="/therapist/training">
              <DashboardIcon />
              <span>Training</span>
            </Link>
          </li>
          <li className={isActive('/payment-request')}>
            <Link href="/therapist/payment-request">
           <PayRequestIcon />
          <span>Payment Requests</span>
            </Link>
          </li>
          <li className={isActive('/payment-history')}>
            <Link href="/therapist/payment-history">
            <PaymentHistoryIcon />
          <span>Payment History</span>
            </Link>
          </li>
          <li className={isActive('/profile')}>
            <Link href="/therapist/profile">
            <PasswordIcon />
            <span>Profile </span>
            </Link>
          </li>
          <li className={isActive('/view-task')}>
            <Link href="/therapist/view-task">
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
              {!isCollapsed && <span className="text-[#283C63] text-[600]">Log Out</span>}
            </a>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default  MobileHeader;
