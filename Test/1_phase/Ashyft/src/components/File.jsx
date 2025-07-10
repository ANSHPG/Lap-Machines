import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('myFile', file);

    try {
      const res = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // Optional: Progress tracking
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadMessage(`Uploading... ${percent}%`);
          console.log(`Uploading... ${percent}%`);
        },
      });

      setUploadMessage('✅ Uploaded successfully!\n' + res.data);
    } catch (err) {
      setUploadMessage('❌ Upload failed: ' + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload a File</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload}>Upload</button>
      <pre>{uploadMessage}</pre>
    </div>
  );
};

export default FileUploader;
