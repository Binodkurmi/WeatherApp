import React from 'react';
import '../Style/ForecastDisplay.css';

const ForecastDisplay = ({ forecastData }) => {
  if (!forecastData) {
    return null; // Return nothing if there's no forecast data
  }

  // Get unique dates and filter the first entry for each day (3 days)
  const uniqueDays = [];
  const filteredForecast = forecastData.filter((forecast) => {
    const forecastDate = new Date(forecast.dt_txt).toLocaleDateString();
    if (!uniqueDays.includes(forecastDate)) {
      uniqueDays.push(forecastDate);
      return true;
    }
    return false;
  }).slice(0, 3); // Limit to 3 days

  return (
    <div className="forecast-inline-card">
      <h3>3-Day Forecast</h3>
      <div className="forecast-inline">
        {filteredForecast.map((forecast, index) => (
          <div key={index} className="forecast-inline-day">
            <p><strong>{new Date(forecast.dt_txt).toLocaleDateString()}</strong></p>
            <p>{forecast.main.temp}°C</p>
            <p>{forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
