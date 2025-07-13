import React from 'react'
// import FileUpload from '../Sections/FileUpload'
import FilePondUploader from '@/components/FilePondUploader';

const Upload: React.FC = () => {
  return (
    <div className='bg-gray-500 w-full h-full'>
      <h1 className='text-6xl justify-self-center text-emerald-600'>From Home</h1>
      {/* <FileUpload/> */}
      <FilePondUploader/>
    </div>
  )
}

export default Upload
