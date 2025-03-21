import React, { useMemo } from 'react';
import { gpsToECEF } from './orbitUtils'; // Import GPS to ECEF conversion

const LandmarkCone = ({ gps }) => {
  const { x, y, z } = useMemo(
    () => gpsToECEF(gps.latitude, gps.longitude, gps.altitude),
    [gps]
  );

  // Apply the same rotation as the Earth model
  // The Earth is rotated by [-Math.PI / 2, 0, Math.PI]
  const rotatedPosition = useMemo(() => {
    // First rotate around X by -PI/2
    const x1 = x;
    const y1 = y * Math.cos(-Math.PI / 2) - z * Math.sin(-Math.PI / 2);
    const z1 = y * Math.sin(-Math.PI / 2) + z * Math.cos(-Math.PI / 2);
    
    return [x1, y1, z1];
  }, [x, y, z]);

  return (
    <mesh position={rotatedPosition}>
      <coneGeometry args={[100, 300, 16]} /> {/* Radius, height, segments */}
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

export default LandmarkCone;