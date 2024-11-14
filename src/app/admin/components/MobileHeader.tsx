"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation'; 
import { AddClientIcon, AssignmentIcon, CallIcon, ClientIcon, ClientWellIcon, ClinicianIcon, DashboardIcon, Humbruger, Logo, NewClinicianIcon, PaymentIcon, TaskIcon, LogOut } from "@/utils/svgicons";
import Link from "next/link";
import './SideNav.css'; 
import { useRouter } from "next/navigation";

const MobileHeader = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('https://blacktherapy.vercel.app/');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path: string) => pathname === path ? 'active' : '';

  const handleLinkClick = (path: string) => {
    setIsCollapsed(false); // Collapse sidebar after clicking a link
  };

  return ( 
    <>
      <div className="header min-h-[46px] justify-between gap-[10px] py-[10px] px-[15px] bg-white">
        <div className="logoContainer">
          <Link href="/admin/dashboard" onClick={() => handleLinkClick("/")}>
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
            <li className={isActive('/admin/dashboard')}>
              <Link href="/admin/dashboard" onClick={() => handleLinkClick("/")}>
                <DashboardIcon />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={isActive('/admin/assignments')}>
              <Link href="/admin/assignments" onClick={() => handleLinkClick("/admin/assignments")}>
                <AssignmentIcon />
                <span>Assignments</span>
              </Link>
            </li>
            <li className={isActive('/admin/clinician')}>
              <Link href="/admin/clinician" onClick={() => handleLinkClick("/admin/clinician")}>
                <ClinicianIcon />
                <span>Clinician</span>
              </Link>
            </li>
            <li className={isActive('/admin/new-clinician')}>
              <Link href="/admin/new-clinician" onClick={() => handleLinkClick("/admin/new-clinician")}>
                <NewClinicianIcon />
                <span>Add New Clinician</span>
              </Link>
            </li>
            <li className={isActive('/admin/client-page')}>
              <Link href="/admin/client-page" onClick={() => handleLinkClick("/admin/client-page")}>
                <ClientIcon />
                <span>Client</span>
              </Link>
            </li>
            <li className={isActive('/admin/addnew-client')}>
              <Link href="/admin/addnew-client" onClick={() => handleLinkClick("/admin/addnew-client")}>
                <AddClientIcon />
                <span>Add New Client</span>
              </Link>
            </li>
            <li className={isActive('/admin/client-wellness')}>
              <Link href="/admin/client-wellness" onClick={() => handleLinkClick("/admin/client-wellness")}>
                <ClientWellIcon />
                <span>Client Wellness</span>
              </Link>
            </li>
            <li className={isActive('/admin/add-users')}>
              <Link href="/admin/add-users" onClick={() => handleLinkClick("/admin/add-users")}>
                <AddClientIcon />
                <span>Add Users</span>
              </Link>
            </li>
            <li className={isActive('/admin/payment-request')}>
              <Link href="/admin/payment-request" onClick={() => handleLinkClick("/admin/payment-request")}>
                <PaymentIcon />
                <span>Payment Requests</span>
              </Link>
            </li>
            <li className={isActive('/admin/view-task')}>
              <Link href="/admin/view-task" onClick={() => handleLinkClick("/admin/view-task")}>
                <TaskIcon />
                <span>View Tasks</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="">
          <ul className="navList">
            <li className="!m-0">
            <Link href="/">
            <LogOut />
               <span className="text-[#283C63] text-[600]">Log OuT</span>
            </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
