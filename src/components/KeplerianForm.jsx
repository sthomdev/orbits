// src/components/KeplerianForm.js
import React from 'react';

const KeplerianForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = Object.fromEntries(formData.entries());
    onSubmit(params);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <label>
        Semi-Major Axis (a):
        <input name="a" type="number" defaultValue="7000" required />
      </label>
      <label>
        Eccentricity (e):
        <input name="e" type="number" step="0.01" defaultValue="0.1" required />
      </label>
      <label>
        Inclination (i):
        <input name="i" type="number" defaultValue="45" required />
      </label>
      <label>
        Right Ascension (Ω):
        <input name="omega" type="number" defaultValue="0" required />
      </label>
      <label>
        Argument of Periapsis (ω):
        <input name="w" type="number" defaultValue="0" required />
      </label>
      <label>
        True Anomaly (ν):
        <input name="v" type="number" defaultValue="0" required />
      </label>
      <button type="submit">Add Orbit</button>
    </form>
  );
};

export default KeplerianForm;
