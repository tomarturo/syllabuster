import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Heading, Skeleton } from '@radix-ui/themes';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Workspace = () => {
  const [imageData, setImageData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!location.state || !location.state.imageData) {
        navigate('/');
        return;
      }

      setImageData(location.state.imageData);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/analyze-image`,
          { imageData: location.state.imageData },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setApiResponse(response.data.content[0].text);
      } catch (err) {
        console.error('Error analyzing image:', err);
        setError(err.response?.data?.message || 'Failed to analyze image. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.state, navigate]);

  return (
    <Box>
      <Heading size="6" mb="4">Workspace</Heading>
      <Flex direction="column" gap="4">
        <Box>
          <Text size="3" weight="bold" mb="2">Analyzed Image:</Text>
          {isLoading ? (
            <Skeleton height="300px" width="100%" />
          ) : (
            <img src={imageData} alt="Analyzed document" style={{ maxWidth: '100%', height: 'auto' }} />
          )}
        </Box>
        <Box>
          <Text size="3" weight="bold" mb="2">Analysis:</Text>
          {isLoading ? (
            <>
              <Skeleton height="20px" width="100%" mb="2" />
              <Skeleton height="20px" width="100%" mb="2" />
              <Skeleton height="20px" width="80%" />
            </>
          ) : error ? (
            <Text color="red">{error}</Text>
          ) : (
            <Text>{apiResponse}</Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Workspace;