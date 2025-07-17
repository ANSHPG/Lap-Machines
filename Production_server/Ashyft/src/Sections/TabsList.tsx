// tabslist.tsx
import  { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom'
// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "@/components/ui/tabs";

import Sides from "../components/Sides";
import Home from "../assets/Sides/home.png";
import Upload from "../assets/Sides/upload.png";
import Download from "../assets/Sides/download.png";

export default function SidebarTabs() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");

  // Update active tab based on current route
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === "/foundation" || pathname === "/foundation/") {
      setActiveTab("home");
    } else if (pathname === "/foundation/upload") {
      setActiveTab("upload");
    } else if (pathname === "/foundation/download") {
      setActiveTab("download");
    }
  }, [location.pathname]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-between gap-4">
      {/* Sidebar Buttons */}
      <div className="flex flex-col gap-[4vw] items-center bg-transparent w-0 border-none">
        <Link to="/foundation" className="no-underline">
          <div className={`cursor-pointer ${activeTab === "home" ? "active" : ""}`}>
            <Sides location={Home} label="home" state={`${activeTab === "home"}`} />
          </div>
        </Link>

        <Link to="/foundation/upload" className="no-underline">
          <div className={`cursor-pointer ${activeTab === "upload" ? "active" : ""}`}>
            <Sides location={Upload} label="upload" state={`${activeTab === "upload"}`} />
          </div>
        </Link>

        <Link to="/foundation/download" className="no-underline">
          <div className={`cursor-pointer ${activeTab === "download" ? "active" : ""}`}>
            <Sides location={Download} label="download" state={`${activeTab === "download"}`} />
          </div>
        </Link>
      </div>

      {/* Optional content */}
    </div>
  );
}