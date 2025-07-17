import React from 'react'
// import FileUpload from '../Sections/FileUpload'
import FilePondUploader from '@/components/FilePondUploader';

const Upload: React.FC = () => {
  return (
    <div  className='bg-[#1f1f1f] w-full h-full flex flex-col items-center justify-center overflow-hidden'>

      
      
      {/* <FileUpload/> */}
      <FilePondUploader/>

    </div>
  )
}

export default Upload
