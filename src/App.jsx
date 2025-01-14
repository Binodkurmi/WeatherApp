import React, { useState } from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import axios from 'axios';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (city) => {
    const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      alert('City not found. Please try again!');
    }
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <WeatherForm fetchWeather={fetchWeather} />
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default App;
