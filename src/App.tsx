// src/App.tsx
import React, { useState } from 'react';
import { getWeatherForCities } from './api';
import WeatherCard from './WeatherCard';
import { cities } from './cities';
import './App.css'; // Import the CSS file

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [cityInput, setCityInput] = useState<string>('');
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCityInput(inputValue);

    // Filter cities based on the input value
    const filtered = cities.filter(city =>
      city.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleCitySelect = (city: string) => {
    if (!selectedCities.includes(city)) {
      setSelectedCities([...selectedCities, city]);
      console.log(`City added: ${city}`); // Debugging statement
    }
  };

  const handleFetchWeather = async () => {
    if (selectedCities.length > 0) {
      console.log('Fetching weather for:', selectedCities); // Debugging statement
      const data = await getWeatherForCities(selectedCities);
      setWeatherData(data);
    } else {
      console.log("No cities selected for weather fetch.");
    }
  };

  return (
    <div className="app-container">
      <input
        type="text"
        value={cityInput}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      <button onClick={handleFetchWeather}>Get Weather</button>
      <div>
        <h3>City Recommendations:</h3>
        <ul>
          {filteredCities.map((city, index) => (
            <li key={index}>
              <button onClick={() => handleCitySelect(city)}>
                {city}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Selected Cities:</h3>
        <ul>
          {selectedCities.map((city, index) => (
            <li key={index}>
              {city}
            </li>
          ))}
        </ul>
      </div>
      {weatherData.length > 0 && (
        <div>
          <h3>Weather Data:</h3>
          {weatherData.map((data, index) => (
            data && <div className="weather-card" key={index}>
              <WeatherCard weatherData={data} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
