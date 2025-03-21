import React from 'react';
import { Line } from '@react-three/drei';

const EquatorCircle = () => {
  // Generate points for a circle in the X-Y plane
  const points = [];
  const segments = 64;
  const radius = 6371; // Earth's radius in km
  
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push([
      radius * Math.cos(theta),
      radius * Math.sin(theta),
      0
    ]);
  }

  return (
    <Line
      points={points}
      color="yellow"
      lineWidth={2}
      dashed={true}
    />
  );
};

export default EquatorCircle; 