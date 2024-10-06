import React, { useState, useRef, useEffect } from 'react';
import { Button, Flex, Box, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import AnthropicAPI from './AnthropicAPI';

const ScanDocument = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { exact: "environment" }
        }
      })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Error accessing camera:", err);
          if (err.name === 'OverconstrainedError') {
            // Fallback to any available camera if the rear camera is not available
            navigator.mediaDevices.getUserMedia({ video: true })
              .then(stream => {
                if (videoRef.current) {
                  videoRef.current.srcObject = stream;
                }
              })
              .catch(fallbackErr => {
                console.error("Error accessing any camera:", fallbackErr);
                setError("Unable to access the camera. Please ensure you've granted the necessary permissions.");
              });
          } else {
            setError("Unable to access the rear camera. Please ensure you've granted the necessary permissions.");
          }
        });
    } else {
      setError("Your browser doesn't support camera access.");
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      setImgSrc(canvas.toDataURL('image/jpeg'));
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
        {error ? (
          <Text color="red">{error}</Text>
        ) : imgSrc ? (
          <img src={imgSrc} alt="captured" style={{ maxWidth: '100%', height: 'auto' }} />
        ) : (
          <video ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%', height: 'auto' }} />
        )}
      </Box>
      {!error && !imgSrc && (
        <Button onClick={captureImage}>Capture Image</Button>
      )}
      {imgSrc && (
        <Flex gap="3">
          <Button onClick={handleSave} variant="solid">Save Image</Button>
          <Button onClick={() => setImgSrc(null)} variant="outline">Retake</Button>
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

export default ScanDocument;