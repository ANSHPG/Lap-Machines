// components/FilePondUploader.tsx

import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

// Plugins
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

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
        name="files"
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
