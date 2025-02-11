import React from 'react';

const GPSForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const gps = Object.fromEntries(formData.entries());
    gps.latitude = parseFloat(gps.latitude);
    gps.longitude = parseFloat(gps.longitude);
    gps.altitude = parseFloat(gps.altitude || 0); // Default altitude to 0 if not provided
    onSubmit(gps);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <label>
        Latitude:
        <input name="latitude" type="number" step="0.01" required />
      </label>
      <label>
        Longitude:
        <input name="longitude" type="number" step="0.01" required />
      </label>
      <label>
        Altitude (km) [Optional]:
        <input name="altitude" type="number" step="0.01" />
      </label>
      <button type="submit">Add GPS Landmark</button>
    </form>
  );
};

export default GPSForm;
