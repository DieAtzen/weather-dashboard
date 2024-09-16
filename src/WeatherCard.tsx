// src/WeatherCard.tsx
import React from 'react';
import './WeatherCard.css'; // Import the CSS file if you create one

interface WeatherCardProps {
  weatherData: any;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  return (
    <div className="weather-card-content">
      <h3>{weatherData.name}</h3>
      <p>Temperature: {weatherData.main.temp} °C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
