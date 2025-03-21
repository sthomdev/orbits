import React, { useState } from 'react';

const Collapsible = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="panel-section">
      <div 
        className="collapsible-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span>{isOpen ? '▼' : '▶'}</span>
      </div>
      {isOpen && (
        <div className="collapsible-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default Collapsible; 