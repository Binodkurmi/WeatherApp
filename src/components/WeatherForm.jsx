import React, { useState } from 'react';
import '../Style/WeatherForm.css';

const WeatherForm = ({ fetchWeather }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="weather-form">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="weather-input"
          aria-label="City Name"
        />
        <button type="submit" className="weather-button">
          <span>Get Weather</span>
        </button>
      </div>
    </form>
  );
};

export default WeatherForm;