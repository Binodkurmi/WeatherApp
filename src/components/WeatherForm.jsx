import React, { useState } from 'react';

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
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="weather-input"
      />
      <button type="submit" className="weather-button">
        Get Weather
      </button>
    </form>
  );
};

export default WeatherForm;
