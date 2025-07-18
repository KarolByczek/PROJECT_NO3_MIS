import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import GuitarsPage from './pages/GuitarsPage';
import SaxophonesPage from './pages/SaxophonesPage';
import DrumsPage from './pages/DrumsPage';
import KeyboardsPage from './pages/KeyboardsPage';
import { HelmetProvider } from 'react-helmet-async';
import MicrophonesPage from './pages/MicrophonesPage';
import TraditionalInstrumentsPage from './pages/TraditionalInstrumentsPage';
import AccessoriesPage from './pages/AccessoriesPage';
import { CurrentPortraitProvider } from './components/CurrentPortraitContext';
import './index.scss';


function App() {
  return (
    <HelmetProvider>
      <CurrentPortraitProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/guitars" element={<GuitarsPage />} />
            <Route path="/saxophones" element={<SaxophonesPage />} />
            <Route path="/drums" element={<DrumsPage />} />
            <Route path="/keyboards" element={<KeyboardsPage />} />
            <Route path="/microphones" element={<MicrophonesPage />}></Route>
            <Route path="/traditional_instruments" element={<TraditionalInstrumentsPage />} ></Route>
            <Route path="/accessories" element={<AccessoriesPage />}></Route>
          </Routes>
        </Router>
      </CurrentPortraitProvider>
    </HelmetProvider>
  );
}

export default App;