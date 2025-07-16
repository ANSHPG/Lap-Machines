import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

import Home from '../Pages/Home';
import Upload from '../Pages/Upload';
import Download from '../Pages/Download';

const Canvas: React.FC = () => {
  return (
    <div id='canvas' className="bg-black rounded-[23px] overflow-auto w-full h-full text-amber-300">
      <h1 className='bg-emerald-600 text-black flex items-center justify-center text-5xl hidden'>From canvas</h1>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/download" element={<Download/>}/>
        <Route path="*" element={<Navigate to="/foundation" replace />} />
      </Routes>
    </div>
  );
};

export default Canvas;