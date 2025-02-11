// src/3D/AxialLines.js
import React from 'react';
import { Line } from '@react-three/drei';

const AxialLines = () => {
  // Define points for the vernal equinox (X-axis)
  const vernalEquinoxPoints = [
    [-10000, 0, 0],
    [10000, 0, 0],
  ];

  // Define points for the north-south pole line (Z-axis)
  const poleLinePoints = [
    [0, 0, -10000],
    [0, 0, 10000],
  ];

  return (
    <>
      {/* Vernal Equinox Line (X-axis) */}
      <Line
        points={vernalEquinoxPoints}
        color="red"
        lineWidth={2}
        dashed={true}
      />

      {/* North-South Pole Line (Z-axis) */}
      <Line
        points={poleLinePoints}
        color="blue"
        lineWidth={2}
        dashed={true}
      />
    </>
  );
};

export default AxialLines;