import React, { useState } from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import SearchHistory from './components/SearchHistory';
import DarkModeToggle from './components/DarkModeToggle';
import LocationMap from './components/LocationMap';
import ShareButton from './components/ShareButton';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const fetchWeather = async (city) => {
    const API_KEY = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
      setSearchHistory((prevHistory) => [...prevHistory, city]);
    } catch (err) {
      console.error('Error fetching weather:', err);
    }
  };

  const fetchForecast = async (city) => {
    const API_KEY = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setForecastData(data);
    } catch (err) {
      console.error('Error fetching forecast:', err);
    }
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Weather Dashboard</h1>
      <WeatherForm fetchWeather={fetchWeather} />
      <WeatherDisplay weatherData={weatherData} />
      <ForecastDisplay forecastData={forecastData} />
      <SearchHistory searchHistory={searchHistory} />
      <DarkModeToggle setIsDarkMode={setIsDarkMode} />
      {weatherData && <LocationMap latitude={weatherData.coord.lat} longitude={weatherData.coord.lon} />}
      <ShareButton weatherData={weatherData} />
    </div>
  );
};

export default App;
