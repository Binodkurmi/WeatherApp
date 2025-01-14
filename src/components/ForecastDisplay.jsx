import React from 'react';
import "../Style/ForecastDisplay.css";

const ForecastDisplay = ({ forecastData }) => {
  if (!forecastData) return null;

  return (
    <div className="forecast-display">
      <h3>5-Day Forecast</h3>
      <div className="forecast-cards">
        {forecastData.list.slice(0, 5).map((forecast, index) => (
          <div key={index} className="forecast-card">
            <p>{new Date(forecast.dt_txt).toLocaleDateString()}</p>
            <p>Temp: {forecast.main.temp}°C</p>
            <p>{forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
