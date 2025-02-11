// src/3D/EquatorialPlane.js
import React from 'react';
import { DoubleSide } from 'three';

const EquatorialPlane = () => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[15000, 15000]} />
      <meshStandardMaterial color="green" opacity={0.3} transparent side={DoubleSide} />
    </mesh>
  );
};

export default EquatorialPlane;