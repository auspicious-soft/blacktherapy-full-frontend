"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import { BillingInsuranceIcon, ChangePasswordIcon, DashboardIcon, Humbruger, Logo, LogOut, ProfileIcon, WellnessIcon } from "@/utils/svgicons";
import Link from "next/link";
// import './SideNav.css'; 
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";


const MobileHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
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
          <Link href="/customer/dashboard">
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
            <li onClick={toggleSidebar} className={isActive('/')}>
              <Link href="/customer/dashboard">
                <DashboardIcon />
                <span>Dashboard</span>
              </Link>
            </li>
            <li onClick={toggleSidebar} className={isActive('/wellness')}>
              <Link href="/customer/wellness">
                <WellnessIcon />
                <span>Wellness</span>
              </Link>
            </li>
            <li onClick={toggleSidebar}  className={isActive('/profile')}>
              <Link href="/customer/profile">
                <ProfileIcon />
                <span>Profile</span>
              </Link>
            </li>
            <li onClick={toggleSidebar} className={isActive('/change-password')}>
              <Link href="/customer/change-password">
                <ChangePasswordIcon />
                <span>Change Password</span>
              </Link>
            </li>
            <li onClick={toggleSidebar} className={isActive('/billing-insurance')}>
              <Link href="/customer/billing-insurance">
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

export default MobileHeader;
