
import './App.css';
import "@radix-ui/themes/styles.css";
import { Container, Heading, } from '@radix-ui/themes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScanDocument from './components/ScanDocument';
import HomePage from './components/HomePage';
import UploadDocument from './components/UploadDocument';
import Workspace from './components/Workspace';

function App() {
  return (
    <div className="App">
      <Router>
        <Container size="1" py="4">
          <Heading size="5" mb="4">Syllabuster</Heading>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadDocument />} />
            <Route path="/scan" element={<ScanDocument />} />
            <Route path="/workspace" element={<Workspace />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
