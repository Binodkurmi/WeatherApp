import React from 'react';
import '../Style/ForecastDisplay.css';

const ForecastDisplay = ({ forecastData }) => {
  if (!forecastData || forecastData.length === 0) {
    return <p>No forecast data available.</p>;
  }

  // Create a set to keep track of the unique dates
  const uniqueDays = [];
  const filteredForecast = forecastData.filter((forecast) => {
    // Extract date from forecast timestamp
    const forecastDate = new Date(forecast.dt_txt).toLocaleDateString();

    // If this date hasn't been added yet, add it to uniqueDays and keep this entry
    if (!uniqueDays.includes(forecastDate)) {
      uniqueDays.push(forecastDate);
      return true; // Include this forecast in the filtered list
    }
    return false; // Exclude this forecast if the date is already included
  }).slice(0, 3); // Limit the forecast to 3 days

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
