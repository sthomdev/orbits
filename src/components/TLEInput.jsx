// src/components/TLEInput.js
import React, { useState } from 'react';
import { twoline2satrec, propagate, gstime } from 'satellite.js';

const TLEInput = ({ onSubmit }) => {
  const [tle, setTle] = useState('');

  const handleTleSubmit = (e) => {
    e.preventDefault();
    const lines = tle.split('\n').map((line) => line.trim());
    if (lines.length === 2) {
      const satrec = twoline2satrec(lines[0], lines[1]);

      const now = new Date();
      const positionAndVelocity = propagate(satrec, now);
      const gmst = gstime(now);

      if (positionAndVelocity.position) {
        const { position, velocity } = positionAndVelocity;

        // Transform into Keplerian elements (approximation)
        const keplerianElements = {
          a: satrec.a * 6371, // Semi-major axis in km
          e: satrec.ecco, // Eccentricity
          i: satrec.inclo * (180 / Math.PI), // Inclination in degrees
          omega: satrec.nodeo * (180 / Math.PI), // RAAN
          w: satrec.argpo * (180 / Math.PI), // Argument of Perigee
          v: 0, // True Anomaly (not directly available from TLE)
          epoch: satrec.jdsatepoch, // Epoch time from TLE
        };
        onSubmit(keplerianElements);
      }
    }
  };

  return (
    <form onSubmit={handleTleSubmit}>
      <textarea
        placeholder="Paste Two-Line Elements (TLE) here"
        rows="4"
        cols="40"
        value={tle}
        onChange={(e) => setTle(e.target.value)}
      />
      <button type="submit">Add TLE Orbit</button>
    </form>
  );
};

export default TLEInput;