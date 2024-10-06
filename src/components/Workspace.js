// import React, { useState, useEffect } from 'react';
// import { Box, Flex, Text, Heading, Skeleton, Container, ScrollArea, Button } from '@radix-ui/themes';
// import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from '@radix-ui/react-dialog';
// import { Menu } from 'lucide-react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Workspace = () => {
//   const [imageData, setImageData] = useState(null);
//   const [apiResponse, setApiResponse] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!location.state || !location.state.imageData) {
//         navigate('/');
//         return;
//       }

//       setImageData(location.state.imageData);
//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_API_URL}/api/analyze-image`,
//           { imageData: location.state.imageData },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//         setApiResponse(response.data.content[0].text);
//       } catch (err) {
//         console.error('Error analyzing image:', err);
//         setError(err.response?.data?.message || 'Failed to analyze image. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [location.state, navigate]);

//   const SidebarContent = () => (
//     <>
//       <Flex align="start" direction="column" gap="3" py="2">
//       <Heading size="3">Workspace Tools</Heading>
//       <Box as="ul" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
//         <Flex align="start" direction="column" gap="2" as="li">
//           <Text size="2">Document Overview</Text>
//           <Text size="2">Key Concepts</Text>
//           <Text size="2">Discussion Topics</Text>
//           <Text size="2">Resources</Text>
//         </Flex>
//       </Box>
//     </Flex>
//     </>
//   );

//   return (
//     <Box width="100%">
//       <Flex>
//         {/* Sidebar for tablet and desktop */}
//         {!isMobile && (
//           <Box
//             width="200px"
//             px="4"
//             pl="3"
//             pr="5"
//             style={{
//               borderRight: '1px solid var(--gray-a6)',
//               height: 'calc(100vh - 60px)', // Adjust based on your header height
//             }}
//           >
//             <SidebarContent />
//           </Box>
//         )}
//         {/* Main Content */}
//         <Box px="4" style={{ flex: 1, overflow: 'hidden' }}>
//           <ScrollArea style={{ flex: 1, height: 'calc(100vh - 60px)' }}>
//             <Container size="4" py="6">
//               {isMobile && (
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <Button size="3" variant="soft" mb="4">
//                       <Menu />
//                       <Text>Workspace Tools</Text>
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent>
//                     <DialogTitle>Workspace Tools</DialogTitle>
//                     <SidebarContent />
//                     <DialogClose asChild>
//                       <Button mt="4">Close</Button>
//                     </DialogClose>
//                   </DialogContent>
//                 </Dialog>
//               )}
//               <Heading size="6" mb="4">Document Analysis</Heading>
//               <Flex direction="column" gap="4">
//                 <Box>
//                   <Text size="3" weight="bold" mb="2">Analyzed Image:</Text>
//                   {isLoading ? (
//                     <Skeleton height="300px" width="100%" />
//                   ) : (
//                     <img src={imageData} alt="Analyzed document" style={{ maxWidth: '100%', height: 'auto' }} />
//                   )}
//                 </Box>
//                 <Box>
//                   <Text size="3" weight="bold" mb="2">Analysis:</Text>
//                   {isLoading ? (
//                     <>
//                       <Skeleton height="20px" width="100%" mb="2" />
//                       <Skeleton height="20px" width="100%" mb="2" />
//                       <Skeleton height="20px" width="80%" />
//                     </>
//                   ) : error ? (
//                     <Text color="red">{error}</Text>
//                   ) : (
//                     <Text>{apiResponse}</Text>
//                   )}
//                 </Box>
//               </Flex>
//             </Container>
//           </ScrollArea>
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// export default Workspace;



////// css grid 


import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Heading, Skeleton, Container, Button, ScrollArea } from '@radix-ui/themes';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from '@radix-ui/react-dialog';
import { Menu } from 'lucide-react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Workspace = () => {
  const [imageData, setImageData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const SidebarContent = () => (
    <Flex align="start" direction="column" gap="3" py="2">
      <Heading size="3">Workspace Tools</Heading>
      <Box as="ul" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        <Flex align="start" direction="column" gap="2" as="li">
          <Text size="2">Document Overview</Text>
          <Text size="2">Key Concepts</Text>
          <Text size="2">Discussion Topics</Text>
          <Text size="2">Resources</Text>
        </Flex>
      </Box>
    </Flex>
  );

  return (
    <Box style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
      gridTemplateRows: '60px 1fr',
      height: '100vh',
    }}>
      {/* Header */}
      <Box style={{ gridColumn: '1 / -1', borderBottom: '1px solid var(--gray-a6)' }}>
        <Flex align="center" justify="between" px="4" height="100%">
          <Heading size="5">Syllabuster</Heading>
          {isMobile && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="2" variant="soft">
                  <Menu />
                  <Text>Menu</Text>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Workspace Tools</DialogTitle>
                <SidebarContent />
                <DialogClose asChild>
                  <Button mt="4">Close</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          )}
        </Flex>
      </Box>

      {/* Sidebar for tablet and desktop */}
      {!isMobile && (
        <Box px="4" style={{
          borderRight: '1px solid var(--gray-a6)',
          overflowY: 'auto',
        }}>
          <SidebarContent />
        </Box>
      )}

      {/* Main Content */}
      <Box px="4" style={{ overflowY: 'auto' }}>
        <ScrollArea>
          <Container size="4" py="6">
            <Heading size="6" mb="4">Document Analysis</Heading>
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
          </Container>
        </ScrollArea>
      </Box>
    </Box>
  );
};

export default Workspace;