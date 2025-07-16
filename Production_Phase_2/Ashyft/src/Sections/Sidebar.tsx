import React from 'react';
import logo from '../assets/logo-png.png';
import Github from '../assets/Sides/mdi--github.svg';

import MenuBar from '../Sections/MenuBar'
import TabsList from '../Sections/TabsList'

const Sidebar: React.FC = () => {
  return (
    <div
      id="SideBar"
      className="bg-black rounded-4xl border-0 border-amber-200 p-[8px] pt-[18px] pb-[18px] h-full flex flex-col justify-between items-center"
    >
      {/* <h2 id="logoText" className='hidden'>LAP.M</h2> */}
      <img src={logo} alt="Lap Machines" className="w-[40px] justify-self-center" />
      <div className='bg-transparent p-0 '><TabsList /></div>
      <a
        href="https://github.com/ANSHPG/Lap-Machines"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div id="SideBar-low" className="cursor-pointer">
          <img src={Github} alt="Github" className="w-[35px]" />
        </div>
      </a>
    </div>
  );
};

export default Sidebar;
