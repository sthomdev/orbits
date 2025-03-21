import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import OrbitPath from './OrbitPath';
import Earth from './Earth';
import EquatorialPlane from './EquatorialPlane';
import AxialLines from './AxialLines';
import LandmarkCone from './LandmarkCone'; // Import LandmarkCone
import EquatorCircle from './EquatorCircle'; // Import EquatorCircle

const Canvas3D = ({ orbits, landmarks, showEquatorialPlane, currentTime }) => {
  return (
    <Canvas
      style={{ height: '100%', width: '100%' }}
      camera={{ position: [0, 0, 20000], near: 0.1, far: 100000 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls enableZoom={true} maxDistance={50000} />

      <Earth />
      <EquatorCircle />

      {showEquatorialPlane && <EquatorialPlane />}
      <AxialLines />

      {/* Render orbits */}
      {orbits.map((elements, index) => (
        <OrbitPath key={index} elements={elements} currentTime={currentTime} />
      ))}

      {/* Render landmarks */}
      {landmarks.map((gps, index) => (
        <LandmarkCone key={index} gps={gps} />
      ))}
    </Canvas>
  );
};

export default Canvas3D;
