import React from 'react'
import DataTable from '../Sections/DataTable'
const Download: React.FC = () => {
  return (
    <div className='bg-[#181818] w-full h-full flex items-center justify-center p-[1vw] border-0 rounded-[1.5rem] border-amber-300'>
      <h1 className='text-7xl text-black font-[Formula1] hidden'>From Download</h1>
      <DataTable/>
    </div>
  )
}

export default Download
