import React, { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'ca8eef3a0a60ea620db1c23472d515ea';
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async (e) => {
    e.preventDefault();
    
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeather(data);
      setCity('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <div className="container">
        <h1>Weather App</h1>
        
        <form onSubmit={fetchWeather}>
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            
            <div className="temperature">
              <span className="temp">{Math.round(weather.main.temp)}°C</span>
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
            
            <p className="description">{weather.weather[0].description}</p>
            
            <div className="details">
              <div className="detail-item">
                <span>Feels like</span>
                <span>{Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="detail-item">
                <span>Humidity</span>
                <span>{weather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span>Wind Speed</span>
                <span>{weather.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span>Pressure</span>
                <span>{weather.main.pressure} hPa</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
