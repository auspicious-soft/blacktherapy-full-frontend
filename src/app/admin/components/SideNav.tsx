"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import { AddClientIcon, AssignmentIcon, CallIcon, ClientIcon, ClientWellIcon, ClinicianIcon, DashboardIcon, Humbruger, Logo, NewClinicianIcon, PaymentIcon, TaskIcon, LogOut, TicketsIcon } from "@/utils/svgicons";

import Link from "next/link";
import './SideNav.css';
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const SideNav = () => {
  const router = useRouter();

  // const handleLogout = () => {
  //   localStorage.removeItem('authToken');
  //   router.push('https://blacktherapy.vercel.app/');
  // };

  const [isCollapsed, setIsCollapsed] = useState(false);


  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const isActive = (path: string) => pathname === path ? 'active' : '';
  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login');
  }
  return (
    <div className={`sideNav ${isCollapsed ? 'collapsed' : ''} h-[100%] overflo-custom`}>
      <div className="">
        <div className="header min-h-[46px] justify-between gap-[10px]">
          {!isCollapsed && (
            <div className="logoContainer">
              <Link href="/admin/dashboard">
                <Logo />
              </Link>
            </div>
          )}
          <button onClick={toggleSidebar} className="hamburgerButton">
            <Humbruger />
          </button>
        </div>
        <ul className="navList">
          <li className={isActive('/admin/dashboard')}>
            <Link href="/admin/dashboard">
              <DashboardIcon />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li className={isActive('/admin/assignments')}>
            <Link href="/admin/assignments">
              <AssignmentIcon />
              {!isCollapsed && <span>Assignments</span>}
            </Link>
          </li>
          <li className={isActive('/admin/clinician')}>
            <Link href="/admin/clinician">
              <ClinicianIcon />
              {!isCollapsed && <span>Clinician</span>}
            </Link>
          </li>
          <li className={isActive('/admin/new-clinician')}>
            <Link href="/admin/new-clinician">
              <NewClinicianIcon />
              {!isCollapsed && <span>Add New Clinician</span>}
            </Link>
          </li>
          <li className={isActive('/admin/client-page')}>
            <Link href="/admin/client-page">
              <ClientIcon />
              {!isCollapsed && <span>Client</span>}
            </Link>
          </li>
          <li className={isActive('/admin/addnew-client')}>
            <Link href="/admin/addnew-client">
              <AddClientIcon />
              {!isCollapsed && <span>Add New Client</span>}
            </Link>
          </li>
          <li className={isActive('/admin/client-wellness')}>
            <Link href="/admin/client-wellness">
              <ClientWellIcon />
              {!isCollapsed && <span>Client Wellness</span>}
            </Link>
          </li>
          <li className={isActive('/admin/add-users')}>
            <Link href="/admin/add-users">
              <AddClientIcon />
              {!isCollapsed && <span>Add Users</span>}
            </Link>
          </li>
          <li className={isActive('/admin/payment-request')}>
            <Link href="/admin/payment-request">
              <PaymentIcon />
              {!isCollapsed && <span>Payment Requests</span>}
            </Link>
          </li>
          <li className={isActive('/admin/view-task')}>
            <Link href="/admin/view-task">
              <TaskIcon />
              {!isCollapsed && <span>View Tasks</span>}
            </Link>
          </li>
          <li className={`${isActive('/admin/tickets-page')} ${pathname.startsWith('/admin/tickets-page/chat') ? 'active' : ''}`}>
          <Link href="/admin/tickets-page">
              <TicketsIcon />
              {!isCollapsed && <span>Tickets</span>}
            </Link>
          </li>
        </ul>
      </div>
      <div className="">
        <ul className="navList">
          <li className="!m-0 cursor-pointer flex items-center gap-2" onClick={handleLogout} >
            <LogOut />
            <span className="text-[#283C63] text-[600]">Log Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
