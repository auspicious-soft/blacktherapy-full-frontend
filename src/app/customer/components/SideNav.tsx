"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation'; 
import { BillingInsuranceIcon, ChangePasswordIcon, DashboardIcon, Humbruger, Logo, LogOut, ProfileIcon, WellnessIcon } from "@/utils/svgicons";
import Link from "next/link";
import './SideNav.css'; 
import { useRouter } from "next/navigation";

const SideNav = () => {
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
    <div className={`sideNav ${isCollapsed ? 'collapsed' : ''} h-[100%] overflo-custom`}>
      <div className="">
        <div className="header min-h-[46px] justify-between gap-[10px]">
          {!isCollapsed && (
            <div className="logoContainer">
              <Link href="/customer/dashboard">
                <Logo />
              </Link>
            </div>
          )}
          <button onClick={toggleSidebar} className="hamburgerButton">
            <Humbruger />
          </button>
        </div>
        <ul className="navList">
          <li className={isActive('/customer/dashboard')}>
            <Link href="/customer/dashboard">
              <DashboardIcon />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li className={isActive('/customer/wellness')}>
            <Link href="/customer/wellness">
              <WellnessIcon />
              {!isCollapsed && <span>Wellness</span>}
            </Link>
          </li>
          <li className={isActive('/customer/profile')}>
            <Link href="/customer/profile">
              <ProfileIcon />
              {!isCollapsed && <span>Profile</span>}
            </Link>
          </li>
          <li className={isActive('/customer/change-password')}>
            <Link href="/customer/change-password">
              <ChangePasswordIcon />
              {!isCollapsed && <span>Change Password</span>}
            </Link>
          </li>
          <li className={isActive('/customer/billing-insurance')}>
          <Link href="/customer/billing-insurance">
              <BillingInsuranceIcon />
              {!isCollapsed && <span>Billing & Insurance</span>}
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
  );
};

export default SideNav;
