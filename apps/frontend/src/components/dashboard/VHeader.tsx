"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Settings,
  File,
  Info,
  HelpCircle,
  Image,
  Layers,
  Clock,
  BarChart3,
} from "lucide-react";

interface SidebarLinkProps {
  href: string;
  end?: boolean; // Ensures exact match, mirrors react-router's NavLink `end` prop
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, end, children }) => {
  const pathname = usePathname();
  const isActive = end ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 text-base sm:text-lg md:text-lg px-4 py-2 rounded-md ${
        isActive ? "text-blue-600 bg-white" : "text-white hover:bg-blue-700"
      }`}
    >
      {children}
    </Link>
  );
};

const VHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar closed by default on mobile

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 left-4 z-50 p-3 bg-blue-600 text-white rounded-full"
        aria-label="Toggle Sidebar"
      >
        <span className="block w-6 h-6">☰</span>
      </button>

      {/* Sidebar */}
      <div
        className={`bg-blue-600 text-white flex flex-col transition-transform duration-300 fixed top-0 left-0 h-full z-40 ${
          isOpen ? "transform-none" : "transform -translate-x-full"
        } lg:transform-none lg:relative lg:w-64 w-56`}
      >
        <nav className="flex-grow p-4">
          <ul className="space-y-4">
            <li>
              <SidebarLink href="/dashboard" end>
                <Home className="w-6 h-6" />
                <span>Home</span>
              </SidebarLink>
            </li>
            <li>
              <SidebarLink href="/dashboard/optimizeimage">
                <Image className="w-6 h-6" />
                <span>Optimize Image</span>
              </SidebarLink>
            </li>
            <li>
              <SidebarLink href="/dashboard/batchcompress">
                <Layers className="w-6 h-6" />
                <span>Batch Compress</span>
              </SidebarLink>
            </li>
            <li>
              <SidebarLink href="/dashboard/compresspdf">
                <File className="w-6 h-6" />
                <span>Compressed PDF</span>
              </SidebarLink>
            </li>
            <li>
              <SidebarLink href="/dashboard/history">
                <Clock className="w-6 h-6" />
                <span>History</span>
              </SidebarLink>
            </li>
            <li>
              <SidebarLink href="/dashboard/analytics">
                <BarChart3 className="w-6 h-6" />
                <span>Analytics</span>
              </SidebarLink>
            </li>
            <li>
              <SidebarLink href="/dashboard/settings">
                <Settings className="w-6 h-6" />
                <span>Settings</span>
              </SidebarLink>
            </li>
            <li>
              <SidebarLink href="/dashboard/about">
                <Info className="w-6 h-6" />
                <span>About</span>
              </SidebarLink>
            </li>
            <li>
              <SidebarLink href="/dashboard/help">
                <HelpCircle className="w-6 h-6" />
                <span>Help</span>
              </SidebarLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default VHeader;
