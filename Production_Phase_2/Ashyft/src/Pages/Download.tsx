import React from 'react'
import DataTable from '../Sections/DataTable'
const Download: React.FC = () => {
  return (
    <div className='bg-black w-full h-full flex items-center justify-center p-[3vw]'>
      <h1 className='text-7xl text-black font-[Formula1] hidden'>From Download</h1>
      <DataTable/>
    </div>
  )
}

export default Download
