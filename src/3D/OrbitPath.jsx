import React, { useMemo } from 'react';
import { Line, Sphere } from '@react-three/drei';
import { keplerToCartesian } from './orbitUtils';

const OrbitPath = ({ elements, currentTime }) => {
  const { a, e, i, omega, w, v, epoch } = elements;

  // Compute elapsed time in seconds (handles both Keplerian and TLE cases)
  const elapsedTime = useMemo(() => {
    console.log('Current time, epoch:', currentTime, epoch);
    if (epoch) {
      // For TLE: calculate elapsed time since the epoch
      const epochMillis = epoch * 24 * 60 * 60 * 1000; // Convert days to milliseconds
      return (currentTime - epochMillis) / 1000; // Elapsed time in seconds
    }
    return 0; // For Keplerian: Start at v = 0 (True Anomaly)
  }, [epoch, currentTime]);

  // Calculate current True Anomaly (v) based on elapsed time
  const currentAnomaly = useMemo(() => {
    if (a && e) {
      const meanMotion = Math.sqrt(398600.4418 / Math.pow(a, 3)); // Earth's GM constant in km^3/s^2
      const meanAnomaly = meanMotion * elapsedTime; // Mean Anomaly in radians
      const trueAnomaly = meanAnomaly % (2 * Math.PI); // Wrap to 0-360°
      return trueAnomaly * (180 / Math.PI); // Convert to degrees
    }
    return v || 0; // Default to initial True Anomaly if no time data
  }, [a, e, elapsedTime]);

  // Generate orbit points
  const points = useMemo(() => {
    const numPoints = 360;
    const orbitPoints = [];
    for (let angle = 0; angle < 360; angle += 360 / numPoints) {
      const cartesianCoords = keplerToCartesian({ ...elements, v: angle });
      orbitPoints.push([cartesianCoords.x, cartesianCoords.y, cartesianCoords.z]);
    }
    return orbitPoints;
  }, [elements]);

  // Calculate position of the orbiting body
  const bodyPosition = useMemo(() => {
    return keplerToCartesian({ ...elements, v: currentAnomaly });
  }, [elements, currentAnomaly]);

  return (
    <>
      {/* Render the orbit path */}
      <Line points={points} color="blue" lineWidth={1} dashed={false} />
      
      {/* Render the orbiting body */}
      <Sphere position={[bodyPosition.x, bodyPosition.y, bodyPosition.z]} args={[50, 32, 32]}>
        <meshStandardMaterial color="yellow" />
      </Sphere>
    </>
  );
};

export default OrbitPath;