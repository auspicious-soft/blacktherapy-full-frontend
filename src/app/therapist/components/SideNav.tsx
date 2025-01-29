"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import { DashboardIcon, Humbruger, Logo, LogOut, BillingIcon, PasswordIcon, PaymentHistoryIcon, PayRequestIcon, AssignIcon, OverviewIcon5, OverviewIcon9, TrainingIcon } from "@/utils/svgicons";

import Link from "next/link";
import './SideNav.css';
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Calendar, CalendarIcon } from "lucide-react";

const SideNav = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login');
  };

  const [isCollapsed, setIsCollapsed] = useState(false);

  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const isActive = (path: string) => pathname === path ? 'active' : '';

  return (
    <div className={`sideNav ${isCollapsed ? 'collapsed' : ''} h-[100%] overflo-custom `}>
      <div className="">
        <div className="header min-h-[46px] justify-between gap-[10px]">
          {!isCollapsed && (
            <div className="logoContainer">
              <Link href="/therapist/dashboard">
                <Logo />
              </Link>
            </div>
          )}
          <button onClick={toggleSidebar} className="hamburgerButton">
            <Humbruger />
          </button>
        </div>
        <ul className="navList">
          <li className={isActive('/therapist/dashboard')}>
            <Link href="/therapist/dashboard">
              <DashboardIcon />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li className={isActive('/therapist/training')}>
            <Link href="/therapist/training">
              <TrainingIcon />
              {!isCollapsed && <span>Training</span>}
            </Link>
          </li>
          <li className={isActive('/therapist/calender')}>
            <Link href="/therapist/calender">
              <AssignIcon />
              {!isCollapsed && <span>Calender</span>}
            </Link>

          </li>
          <li className={`${isActive('/therapist/assignments')} ${pathname.startsWith('/therapist/assignments/chat') ? 'active' : ''}`}>
            <Link href="/therapist/assignments">
              <AssignIcon />
              {!isCollapsed && <span>Appointments</span>}
            </Link>
          </li>
          <li className={isActive('/therapist/my-clients')}>
            <Link href="/therapist/my-clients">
            <PasswordIcon />
              {!isCollapsed && <span>My Clients</span>}
            </Link>
          </li>
          <li className={isActive('/therapist/payment-history')}>
            <Link href="/therapist/payment-history">
              <PaymentHistoryIcon />
              {!isCollapsed && <span>Payment History</span>}
            </Link>
          </li>
          <li className={isActive('/therapist/profile')}>
            <Link href="/therapist/profile">
              <PasswordIcon />
              {!isCollapsed && <span>Profile</span>}
            </Link>
          </li>
          <li className={isActive('/therapist/view-task')}>
            <Link href="/therapist/view-task">
              <BillingIcon />
              {!isCollapsed && <span>View Task</span>}
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
