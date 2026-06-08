import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import MapPage from './pages/MapPage.tsx';
import PetstagramPage from './pages/PetstagramPage.tsx';
import AssistantPage from './pages/AssistantPage.tsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/petstagram" element={<PetstagramPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
      </Routes>
    </Router>
  );
}
