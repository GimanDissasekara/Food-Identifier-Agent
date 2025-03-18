import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const UploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ImagePreview = styled.div`
  width: 300px;
  height: 300px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const UploadMessage = styled.p`
  color: #666;
  font-size: 1.2rem;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3367d6;
  }
`;

function ImageUploader({ onImageUploaded }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
        onImageUploaded(file, fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <UploaderContainer>
      <ImagePreview>
        {previewUrl ? (
          <PreviewImage src={previewUrl} alt="Food preview" />
        ) : (
          <UploadMessage>No image selected</UploadMessage>
        )}
      </ImagePreview>
      <UploadInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <UploadButton onClick={handleButtonClick}>
        Upload Image
      </UploadButton>
    </UploaderContainer>
  );
}

export default ImageUploader;