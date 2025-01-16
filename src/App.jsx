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
  const [error, setError] = useState(''); 

  
  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setError('City name cannot be empty.');
      return;
    }
    setError(''); 

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
      fetchForecast(city); 
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
    }
  };

  
const fetchForecast = async (city) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching forecast: ${response.statusText}`);
    }

    const data = await response.json();

    const uniqueDays = [];
    const nextThreeDays = data.list.filter((forecast) => {
      const forecastDate = new Date(forecast.dt_txt).toLocaleDateString();

      if (!uniqueDays.includes(forecastDate)) {
        uniqueDays.push(forecastDate);
        return true; 
      }

      return false; 
    }).slice(0, 3); 

    setForecastData(nextThreeDays); 
  } catch (err) {
    console.error('Error fetching forecast:', err);
  }
};


  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      
      <WeatherForm fetchWeather={fetchWeather} />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && <WeatherDisplay weatherData={weatherData} />}

      {forecastData && <ForecastDisplay forecastData={forecastData} />}
      
      <div className="history-card">
        <SearchHistory searchHistory={searchHistory} />
      </div>
    </div>
  );
};

export default App;
