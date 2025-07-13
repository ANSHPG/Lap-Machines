import React, { useState } from "react";
import { Link } from 'react-router-dom'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import Sides from "../components/Sides";
import Home from "../assets/Sides/home.png";
import Upload from "../assets/Sides/upload.png";
import Download from "../assets/Sides/download.png";

export default function SidebarTabs() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <Tabs
      defaultValue="home"
      value={activeTab}
      onValueChange={setActiveTab}
      className="h-full w-full flex flex-col items-center justify-between gap-4"
    >
      {/* Sidebar Buttons */}
      <TabsList className="flex flex-col gap-[4vw] items-center bg-transparent w-0 border-none">
        <TabsTrigger
          value="home"

        >
         <Link to='/home'> <Sides location={Home} label="home" state={`${activeTab === "home"}`} /> </Link> 
        </TabsTrigger>

        <TabsTrigger
          value="upload"
        >
         <Link to='/upload'> <Sides location={Upload} label="upload" state={`${activeTab === "upload"}`} /></Link>
        </TabsTrigger>

        <TabsTrigger
          value="download"
        >
          <Sides location={Download} label="download" state={`${activeTab === "download"}`} />
        </TabsTrigger>
      </TabsList>

      {/* Optional content */}
    </Tabs>
  );
}
