import React from 'react';
import Sunset from '../assets/imgs/sunset_f1.png';
import Upload from '../assets/Sides/upload.png'
import Download from '../assets/Sides/download.png'
import ServerChart from '../components/ServerChart'
import SizeChart from '../components/SizeChart'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="bg-black w-full h-full  text-white ">
      <div
        className="relative w-full h-1/2 overflow-hidden"
      >
        <img
          src={Sunset}
          alt="Sunset"
          className="absolute bottom-[-40%] left-0  w-full object-cover h-auto max-h-none"
        />
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black/80 to-transparent z-0 pointer-events-none" />
      </div>

      <div>
        <div className='flex flex-row gap-4  p-[12px] pl-[35px]'>
          <Link to='/upload'><button id='home-section-2-bttn' className='bg-[#e3ad5e] text-black cursor-pointer'>Upload
            <img src={Upload} id='home-section-2-bttn-img' alt="" />
          </button></Link>
          <button id='home-section-2-bttn' className='bg-[#e2805d] text-black'>Download
            <img src={Download} id='home-section-2-bttn-img' alt="" />
          </button>
        </div>
        
      </div>
      <div className='p-[15px] flex flex-col items-center justify-center'>
          <ServerChart />
        <h1 className='text-5xl text-cyan-900 bg-emerald-300 p-[80px]  hidden translate-y-[61vh]'>Bottom</h1>
        <SizeChart/>

        </div>
        {/* <div className='p-[15px] flex flex-col items-center justify-center'>
          <SizeChart />
        </div> */}
    </div>
  );
};

export default Home;
