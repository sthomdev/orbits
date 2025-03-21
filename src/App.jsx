import { useState, useEffect } from 'react';
import './App.css';
import Canvas3D from './3D/Canvas3D';
import KeplerianForm from './components/KeplerianForm';
import TLEInput from './components/TLEInput';
import GPSForm from './components/GPSForm';
import Collapsible from './components/Collapsible';

function App() {
  const [orbits, setOrbits] = useState([]);
  const [landmarks, setLandmarks] = useState([]);
  const [showEquatorialPlane, setShowEquatorialPlane] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const addOrbit = (params) => {
    const numericParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, parseFloat(value)])
    );
    setOrbits([...orbits, numericParams]);
  };

  const addLandmark = (gps) => {
    setLandmarks([...landmarks, gps]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="canvas-container">
          <Canvas3D
            orbits={orbits}
            landmarks={landmarks}
            showEquatorialPlane={showEquatorialPlane}
            currentTime={currentTime}
          />
        </div>
      </div>
      
      <div className="side-panel">
        <Collapsible title="Display Options">
          <button 
            onClick={() => setShowEquatorialPlane(!showEquatorialPlane)}
            style={{ marginBottom: '0.5rem' }}
          >
            {showEquatorialPlane ? 'Hide Equatorial Plane' : 'Show Equatorial Plane'}
          </button>
        </Collapsible>

        <Collapsible title="Add GPS Landmark" defaultOpen={true}>
          <GPSForm onSubmit={addLandmark} />
        </Collapsible>

        <Collapsible title="Add Keplerian Orbit">
          <KeplerianForm onSubmit={addOrbit} />
        </Collapsible>

        <Collapsible title="Add TLE Orbit">
          <TLEInput onSubmit={addOrbit} />
        </Collapsible>
      </div>
    </div>
  );
}

export default App;
