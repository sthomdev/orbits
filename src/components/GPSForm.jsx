import React from 'react';

const GPSForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const gps = Object.fromEntries(formData.entries());
    gps.latitude = parseFloat(gps.latitude);
    gps.longitude = parseFloat(gps.longitude);
    gps.altitude = parseFloat(gps.altitude || 0);
    onSubmit(gps);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="latitude">Latitude (°N)</label>
        <input
          id="latitude"
          name="latitude"
          type="number"
          step="0.0001"
          placeholder="e.g. 40.7128"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="longitude">Longitude (°E)</label>
        <input
          id="longitude"
          name="longitude"
          type="number"
          step="0.0001"
          placeholder="e.g. -74.0060"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="altitude">Altitude (km)</label>
        <input
          id="altitude"
          name="altitude"
          type="number"
          step="0.01"
          placeholder="0"
        />
      </div>

      <button type="submit">Add Landmark</button>
    </form>
  );
};

export default GPSForm;
