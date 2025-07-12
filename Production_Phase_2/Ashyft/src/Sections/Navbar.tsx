import React from 'react';
// import Client from '../assets/Profiles/1711663959396.jpg'
import Client_Menu from '../components/MenuTrigger'



const Navbar: React.FC = () => {
  return (
    <div className="bg-black rounded-xl border-0 border-emerald-500 pr-[20px] pl-[30px] flex flex-row items-center justify-between">
      <h1 id="nav-title">LAP MACHINES</h1>
      <div id="nav-division" className='flex flex-row items-center justify-between gap-[18px]'>
        <h3 id="nav-label">Good morning,  <span id="nav-client">Anshu</span></h3>
        {/* <img src={Client} alt="client" id='nav-client-profile'/> */}
        <Client_Menu/>
      </div>
    </div>
  );
};

export default Navbar;
