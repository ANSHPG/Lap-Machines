// components/FilePondUploader.tsx

import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

// Plugins
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

// CSS
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register plugins
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

const FilePondUploader: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);

  return (
    <div className="w-full max-w-md mx-auto">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={5}
        name="myFile" // ⬅️ IMPORTANT: must match Go server field name
        server={{
          process: {
            url: "http://localhost:8080/upload", // ⬅️ Your Go backend upload URL
            method: "POST",
            withCredentials: false,
            headers: {
              // Add any custom headers if needed
            },
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
        labelIdle='📁 <span class="filepond--label-action">Drag & Drop your files</span> or <span class="filepond--label-action">Browse</span>'
        acceptedFileTypes={["image/*", "application/pdf"]}
        allowReorder={true}
        allowImagePreview={true}
        allowFileSizeValidation={true}
        maxFileSize="5MB"
        allowFileTypeValidation={true}
      />
    </div>
  );
};

export default FilePondUploader;
