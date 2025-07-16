import React, { useRef, useState } from "react";
import {
  FilePond,
  registerPlugin,
  FilePond as FilePondType,
} from "react-filepond";

import UploadPond from "@/assets/imgs/uploadPond.svg";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

const FilePondUploader: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const pondRef = useRef<FilePondType>(null);

  const handleCustomClick = () => {
    const inputEl = (pondRef.current as any)?._pond?.element?.querySelector(
      'input[type="file"]'
    );
    inputEl?.click();
  };

  const hasFiles = files.length > 0;

  return (
    <div
      id="main-div"
      className={`transition-all duration-500 mx-auto flex flex-col items-center ${hasFiles ? "w-[70%] bg-[#262626] rounded-[2rem] p-1" : "w-full max-w-md"
        } `}
    >
      {/* Upload Trigger */}
      <h1
        className={`transition-all duration-300 text-emerald-600 font-['Formula1-Bold'] ${hasFiles ? "text-[16px]" : "text-xl"
          } hidden `}
      >
        UPLOAD FILES
      </h1>
      <div
        onClick={handleCustomClick}
        id="textur-bg"
        className={`relative group cursor-pointer bg-[#e2805d] hover:bg-[#000] border-0 border-dashed  border-gray-400 text-center rounded-b-[2rem] rounded-t-lg transition-all duration-500 flex flex-col items-center justify-center ${hasFiles
          ? "p-0 h-0 w-0"
          : "p-[5vw] h-[350px] "
          } w-full`}
      >
        {/* <h1
          className={`transition-all duration-300 text-emerald-600 font-['Formula1-Bold'] ${
            hasFiles ? "text-[16px]" : "text-xl"
          }`}
        >
          UPLOAD FILES
        </h1> */}

        {/* Only show when no files */}
        {!hasFiles && (
          <div className="relative w-[100px] h-[100px] mt-4">
            {/* Outer Div */}
            <div className="absolute inset-0 border-2 border-dashed border-white rounded-lg z-0" />

            {/* Inner Div */}
            <div className="absolute inset-0 z-10 flex items-center justify-center transition-all duration-300 group-hover:translate-x-[20%] group-hover:-translate-y-[20%] group-hover:opacity-80">
              <div className="w-full h-full bg-[#b46c4a] rounded-lg flex items-center justify-center group-hover:bg-[#e2805d]">
                <img src={UploadPond} className="w-[60px]" alt="upload" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FilePond container — responsive, no overflow */}
      <div className="m-4 w-full max-h-[400px] overflow-auto hide-scrollbar bg-transparent">
        <FilePond
          ref={pondRef}
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={true}
          maxFiles={10}
          name="myFile"
          server={{
            process: {
              url: "http://localhost:8080/upload",
              method: "POST",
              onload: (res) => {
                console.log("Upload success:", res);
                return res;
              },
              onerror: (err) => {
                console.error("Upload error:", err);
                return err;
              },
            },
          }}
          labelIdle='📁 <span class="filepond--label-action">Drag or drop your files or click to upload</span>'
          acceptedFileTypes={[
            "image/*",
            "application/pdf",
            "application/zip",
            "application/x-zip-compressed",
            ".zip",
            ".mp3",     // MPEG Layer 3
            ".wav",     // Waveform Audio
            ".ogg",     // Ogg Vorbis
            ".flac",    // Free Lossless Audio Codec
            ".aac",     // Advanced Audio Coding
            ".m4a",     // MPEG-4 Audio
            ".wma",     // Windows Media Audio
            ".opus",    // Opus codec
            ".aiff",    // Audio Interchange File Format
            ".alac",     // Apple Lossless Audio Codec,
            ".mp4",     // MPEG-4
            ".mov",     // QuickTime Movie
            ".avi",     // Audio Video Interleave
            ".wmv",     // Windows Media Video
            ".flv",     // Flash Video
            ".mkv",     // Matroska
            ".webm",    // WebM
            ".3gp",     // 3GPP
            ".m4v",     // MPEG-4 Video
            ".ts"       // MPEG Transport Stream
          ]}
          allowReorder={true}
          allowImagePreview={true}
          allowFileSizeValidation={true}
          maxFileSize="100MB"
          allowFileTypeValidation={true}
          className="border-none"
        />
      </div>
    </div>
  );
};

export default FilePondUploader;
