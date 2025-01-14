import React, { useState } from 'react';
import WeatherForm from './components/WeatherForm';  
import WeatherDisplay from './components/WeatherDisplay'; 
import ForecastDisplay from './components/ForecastDisplay'; 
import SearchHistory from './components/SearchHistory'; 
import LocationMap from './components/LocationMap';  
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // Fetch weather data from the API
  const fetchWeather = async (city) => {
    if (!city.trim()) {
      console.error('Please enter a valid city name');
      return;
    }

		const API_KEY = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
      setSearchHistory((prevHistory) => [...prevHistory, city]);
      fetchForecast(city);  // Call fetchForecast after getting weather data
    } catch (err) {
      console.error('Error fetching weather:', err);
    }
  };

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
      setForecastData(data);  // Update the state with forecast data
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <WeatherForm fetchWeather={fetchWeather} />
      <WeatherDisplay weatherData={weatherData} />
      <ForecastDisplay forecastData={forecastData} />
      <SearchHistory searchHistory={searchHistory} />
      {weatherData && <LocationMap latitude={weatherData.coord.lat} longitude={weatherData.coord.lon} />}
    </div>
  );
};

export default App;
