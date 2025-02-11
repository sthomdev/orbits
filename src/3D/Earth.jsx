// src/3D/Earth.js
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Earth = () => {
  const earthTexture = useLoader(TextureLoader, '/textures/earth_texture.jpg');

  return (
    <mesh position={[0, 0, 0]} scale={[6371 , 6371 , 6371 ]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

export default Earth;