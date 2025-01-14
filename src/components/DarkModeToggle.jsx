import React from 'react';
import "../Style/DarkModeToggle.css";


const DarkModeToggle = ({ setIsDarkMode }) => (
  <button onClick={() => setIsDarkMode(prev => !prev)} className="dark-mode-toggle">
    Toggle Dark Mode
  </button>
);

export default DarkModeToggle;
