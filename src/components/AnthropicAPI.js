import React, { useState } from 'react';
import { Button, Flex, Text } from '@radix-ui/themes';
import axios from 'axios';

const AnthropicAPI = ({ imageData }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const sendImageToAnthropicAPI = async () => {
    console.log('Preparing to send request to local server');
    console.log('Image data length:', imageData.length);

    try {
      console.log('Sending request to local server...');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/analyze-image`,
        { imageData },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Received response from local server');
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      setResponse(response.data.content[0].text);
      setError(null);
    } catch (err) {
      console.error('Error sending image to local server:', err);
      if (err.response && err.response.status === 402) {
        setError(err.response.data.message || 'Insufficient credits in Anthropic account.');
      } else {
        setError('Failed to analyze image. Please try again.');
      }
    }
  };

  return (
    <Flex direction="column" gap="3">
      <Button onClick={sendImageToAnthropicAPI}>Analyze Image</Button>
      {error && <Text color="red">{error}</Text>}
      {response && (
        <Text>
          API Response:
          <pre>{response}</pre>
        </Text>
      )}
    </Flex>
  );
};

export default AnthropicAPI;