import React, { useState } from 'react';
import WeatherForm from './components/WeatherForm';  
import WeatherDisplay from './components/WeatherDisplay'; 
import ForecastDisplay from './components/ForecastDisplay'; 
import SearchHistory from './components/SearchHistory';  
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [error, setError] = useState(''); // Error state for error handling

  // Fetch weather data from the API
  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setError('City name cannot be empty.');
      return;
    }
    setError(''); // Clear error before fetching

    const API_KEY = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod !== 200) {
        setError('City not found.');
        return;
      }

      setWeatherData(data);
      setSearchHistory((prevHistory) => [...prevHistory, city]);
      fetchForecast(city); // Call fetchForecast after getting weather data
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
    }
  };

  // Fetch weather forecast data from the API
 // Fetch weather forecast data from the API
const fetchForecast = async (city) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching forecast: ${response.statusText}`);
    }

    const data = await response.json();

    // Filter the forecast data to include only the next 3 days
    const uniqueDays = [];
    const nextThreeDays = data.list.filter((forecast) => {
      const forecastDate = new Date(forecast.dt_txt).toLocaleDateString();

      if (!uniqueDays.includes(forecastDate)) {
        uniqueDays.push(forecastDate);
        return true; // Include the first forecast for each unique day
      }

      return false; // Exclude any additional forecasts for the same day
    }).slice(0, 3); // Limit to 3 days

    setForecastData(nextThreeDays); // Update the state with the filtered data
  } catch (err) {
    console.error('Error fetching forecast:', err);
  }
};


  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      
      {/* Weather Form to input city */}
      <WeatherForm fetchWeather={fetchWeather} />
      
      {/* Display error if there's any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Displaying Current Weather */}
      {weatherData && <WeatherDisplay weatherData={weatherData} />}

      {/* Displaying 3-Day Forecast */}
      {forecastData && <ForecastDisplay forecastData={forecastData} />}
      
      {/* Search History */}
      <div className="history-card">
        <SearchHistory searchHistory={searchHistory} />
      </div>
    </div>
  );
};

export default App;
