import React, { useState, useRef } from 'react';
import { Button, Flex, Box, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import AnthropicAPI from './AnthropicAPI';

const UploadDocument = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = (dataUrl, maxWidth) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg'));
      };
    });
  };

  // const handleSave = async () => {
  //   if (imgSrc) {
  //     const resized = await resizeImage(imgSrc, 200);
  //     setResizedImage(resized);
  //     console.log("Resized image ready for sending to API");
  //   }
  // };

  const handleSave = async () => {
    if (imgSrc) {
      const resized = await resizeImage(imgSrc, 200);
      navigate('/workspace', { state: { imageData: resized } });
    }
  };
  
  return (
    <Flex direction="column" gap="3" align="center">
      <Box>
        {imgSrc ? (
          <img src={imgSrc} alt="uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
        ) : (
          <Text>No document uploaded yet</Text>
        )}
      </Box>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      {!imgSrc ? (
        <Button onClick={() => fileInputRef.current.click()}>Upload Document</Button>
      ) : (
        <Flex gap="3">
          <Button onClick={handleSave} variant="solid">Save Document</Button>
          <Button onClick={() => setImgSrc(null)} variant="outline">Remove</Button>
        </Flex>
      )}
      {resizedImage && (
        <>
          <Box>
            <Text>Resized Image (max width 200px):</Text>
            <img src={resizedImage} alt="resized" style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
          <AnthropicAPI imageData={resizedImage} />
        </>
      )}
      <Button onClick={() => navigate('/')} variant="ghost">Back to Home</Button>
    </Flex>
  );
};

export default UploadDocument;