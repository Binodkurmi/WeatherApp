import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return <p>Enter a city to see weather data.</p>;

  const { name, main, weather } = weatherData;

  return (
    <div className="weather-display">
      <h2>Weather in {name}</h2>
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Condition: {weather[0].description}</p>
    </div>
  );
};

export default WeatherDisplay;
