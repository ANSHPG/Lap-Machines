import { Route } from 'react-router-dom';
import React from 'react';
import { Routes } from 'react-router-dom';

import Home from '../Pages/Home';

const Canvas: React.FC = () => {
  return (
    <div id='canvas' className="bg-black rounded-[23px] overflow-auto w-full h-full text-amber-300">
      <Routes>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  );
};

export default Canvas;
