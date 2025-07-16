import React from 'react';
import Canvas from '../Sections/Canvas';
import Sidebar from '../Sections/Sidebar';
import Navbar from '../Sections/Navbar';

const Foundation: React.FC = () => {
  return (
    <div id="Foundation">
      <div className="grid grid-cols-[0.3fr_3.7fr] gap-1 h-full">
        <Sidebar />
        <div className="grid grid-rows-[0.3fr_3.7fr] gap-1 h-full w-full">
          <Navbar />
          <Canvas />
        </div>
      </div>
    </div>
  );
};

export default Foundation;