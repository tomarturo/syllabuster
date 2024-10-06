
import './App.css';
import "@radix-ui/themes/styles.css";
import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ScanDocument from './components/ScanDocument';
import HomePage from './components/HomePage';
import UploadDocument from './components/UploadDocument';
import Workspace from './components/Workspace';
import WorkspaceLayout from './components/WorkspaceLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Box>
          <Flex align="center" px="4" py="2" gap="2" justify="start">
            <Heading asChild size="4">
              <Link to="/" style={{textDecoration: 'none', color: 'inherit' }}>
                Syllabuster
              </Link>
            </Heading>
            {/* <Text size="2">|</Text>
            <Text size="2">Workspace Title</Text> */}
          </Flex>
          <Separator size="4" />
        </Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadDocument />} />
          <Route path="/scan" element={<ScanDocument />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/workspacelayout" element={<WorkspaceLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
