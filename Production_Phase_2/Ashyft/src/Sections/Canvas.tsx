import { Route } from 'react-router-dom';
import React from 'react';
import { Routes } from 'react-router-dom';

import Home from '../Pages/Home';
import Upload from '../Pages/Upload';

const Canvas: React.FC = () => {
  return (
    <div id='canvas' className="bg-black rounded-[23px] overflow-auto w-full h-full text-amber-300">
      <h1 className='bg-emerald-600 text-black flex items-center justify-center text-5xl'>From canvas</h1>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/upload' element={<Upload/>}/>
      </Routes>
    </div>
  );
};

export default Canvas;
