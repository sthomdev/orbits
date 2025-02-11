import { useState, useEffect } from 'react';
import './App.css';
import Canvas3D from './3D/Canvas3D';
import KeplerianForm from './components/KeplerianForm';
import TLEInput from './components/TLEInput';
import GPSForm from './components/GPSForm'; // Import the GPSForm

function App() {
  const [orbits, setOrbits] = useState([]);
  const [landmarks, setLandmarks] = useState([]); // Track GPS landmarks
  const [showEquatorialPlane, setShowEquatorialPlane] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const addOrbit = (params) => {
    const numericParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, parseFloat(value)])
    );
    setOrbits([...orbits, numericParams]);
  };

  const addLandmark = (gps) => {
    setLandmarks([...landmarks, gps]); // Add new GPS landmark
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div>
        <h2>Add Orbit</h2>
        <KeplerianForm onSubmit={addOrbit} />
        <TLEInput onSubmit={addOrbit} />
        <h2>Add GPS Landmark</h2>
        <GPSForm onSubmit={addLandmark} /> {/* Add the GPSForm */}
      </div>
      <button onClick={() => setShowEquatorialPlane(!showEquatorialPlane)}>
        {showEquatorialPlane ? 'Hide Equatorial Plane' : 'Show Equatorial Plane'}
      </button>
      <Canvas3D
        orbits={orbits}
        landmarks={landmarks} // Pass landmarks to Canvas3D
        showEquatorialPlane={showEquatorialPlane}
        currentTime={currentTime}
      />
    </div>
  );
}

export default App;
