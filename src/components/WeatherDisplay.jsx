import React from 'react';
import '../Style/WeatherDisplay.css';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  const { name, main, weather } = weatherData;

  return (
    <div className="weather-display-container">
      <div>
        <h2>Weather in {name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
          title={weather[0].description}
        />
        <p>Temperature: {main.temp}°C</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Condition: {weather[0].description}</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
