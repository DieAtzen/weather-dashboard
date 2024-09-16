// src/api.ts
import axios from 'axios';


export const getWeather = async (city: string) => {
  try {
    console.log(`Fetching weather for ${city}`); // Debugging statement
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    return null;
  }
};

export const getWeatherForCities = async (cities: string[]) => {
  try {
    console.log('Fetching weather for cities:', cities); // Debugging statement
    const weatherPromises = cities.map(city => getWeather(city));
    const weatherData = await Promise.all(weatherPromises);
    return weatherData.filter(data => data !== null); // Filter out any null results
  } catch (error) {
    console.error('Error fetching weather data for cities:', error);
    return [];
  }
};
