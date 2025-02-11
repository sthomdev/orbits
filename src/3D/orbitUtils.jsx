// src/3D/orbitUtils.js

export function keplerToCartesian({ a, e, i, omega, w, v }) {
    const degToRad = (angle) => (angle * Math.PI) / 180;
    i = degToRad(i);       // Inclination
    omega = degToRad(omega); // RAAN
    w = degToRad(w);        // Argument of Periapsis
    v = degToRad(v);        // True Anomaly
  
    // Calculate the distance from the focus to the orbiting body
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(v));
  
    // Coordinates in the orbit's perifocal coordinate system
    const xP = r * Math.cos(v);
    const yP = r * Math.sin(v);
    const zP = 0;
  
    // Transformation to ECI (Earth-Centered Inertial) coordinates
    const x =
      xP * (Math.cos(omega) * Math.cos(w) - Math.sin(omega) * Math.sin(w) * Math.cos(i)) -
      yP * (Math.cos(omega) * Math.sin(w) + Math.sin(omega) * Math.cos(w) * Math.cos(i));
    const y =
      xP * (Math.sin(omega) * Math.cos(w) + Math.cos(omega) * Math.sin(w) * Math.cos(i)) +
      yP * (Math.sin(omega) * Math.sin(w) * Math.cos(i) - Math.cos(omega) * Math.cos(w));
    const z = xP * Math.sin(w) * Math.sin(i) + yP * Math.cos(w) * Math.sin(i);
  
    return { x, y, z };
  }

  export function gpsToECEF(latitude, longitude, altitude = 0) {
    const R = 6371; // Earth's radius in km
    const radLat = (latitude * Math.PI) / 180;
    const radLon = (longitude * Math.PI) / 180;
  
    const x = (R + altitude) * Math.cos(radLat) * Math.cos(radLon);
    const y = (R + altitude) * Math.cos(radLat) * Math.sin(radLon);
    const z = (R + altitude) * Math.sin(radLat);
  
    return { x, y, z };
  }