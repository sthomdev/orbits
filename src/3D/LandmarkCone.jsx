import React, { useMemo } from 'react';
import { gpsToECEF } from './orbitUtils'; // Import GPS to ECEF conversion

const LandmarkCone = ({ gps }) => {
  const { x, y, z } = useMemo(
    () => gpsToECEF(gps.latitude, gps.longitude, gps.altitude),
    [gps]
  );

  return (
    <mesh position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
      <coneGeometry args={[100, 300, 16]} /> {/* Radius, height, segments */}
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

export default LandmarkCone;