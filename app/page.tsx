'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [extractedText, setExtractedText] = useState('');

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
    },
  });

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.text();
      console.log(result);
      setExtractedText(result);
    } else {
      alert('Failed to extract text from the uploaded file');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', borderRadius: '10px', background: '#f9f9f9', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Your Tailored Resume</h2>

      <div {...getRootProps()} style={{ padding: '20px', border: '2px dashed #0070f3', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', marginBottom: '20px' }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag & drop your resume here, or click to select a file</p>
        )}
        {file && <p>Uploaded file: {file.name}</p>}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="linkedin" style={{ display: 'block', marginBottom: '5px' }}>LinkedIn Profile URL:</label>
        <input
          type="url"
          id="linkedin"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          placeholder="https://www.linkedin.com/in/your-profile"
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="job-description" style={{ display: 'block', marginBottom: '5px' }}>Job Description:</label>
        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          rows={6}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{ width: '100%', padding: '15px', borderRadius: '5px', background: '#0070f3', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' }}
      >
        Generate Resume
      </button>

      {extractedText && (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', background: '#fff' }}>
          <h3>Extracted Resume Content:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{extractedText}</pre>
        </div>
      )}
    </div>
  );
};

export default Page;
