import React from 'react';
import logo from '../assets/logo-png.png';
import Sides from '../components/Sides';
import Home from '../assets/Sides/home.svg';
import Upoad from '../assets/Sides/upload.svg';
import Download from '../assets/Sides/download.svg';
import Github from '../assets/Sides/mdi--github.svg';

const Sidebar: React.FC = () => {
  return (
    <div
      id="SideBar"
      className="bg-black rounded-lg border-0 border-amber-200 p-[8px] pt-[18px] pb-[18px] flex flex-col justify-between items-center"
    >
      {/* <h2 id="logoText" className='hidden'>LAP.M</h2> */}
      <img src={logo} alt="Lap Machines" className="w-[40px] justify-self-center" />
      <div id="midSide" className="flex flex-col justify-between gap-[3vw]">
        <Sides location={Home} label="home" />
        <Sides location={Upoad} label="upload" />
        <Sides location={Download} label="download" />
      </div>
      <div id="SideBar-low">
        <img src={Github} alt="Github" className="w-[35px]" />
      </div>
    </div>
  );
};

export default Sidebar;
