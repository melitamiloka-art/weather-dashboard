import React, { useState } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";
import Error from "./Error";

const API_KEY = "YOUR_API_KEY";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    try {
      setError("");
      setWeather(null);
      setForecast([]);

      // Current Weather API
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();

      if (weatherData.cod !== 200) {
        throw new Error(weatherData.message);
      }

      setWeather(weatherData);

      // 5-day Forecast API
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();

      if (forecastData.cod !== "200") {
        throw new Error(forecastData.message);
      }

      // Filter to one forecast per day (every 8th item ≈ 24hrs)
      const dailyForecast = forecastData.list.filter(
        (item, index) => index % 8 === 0
      );

      setForecast(dailyForecast);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <h1 className="text-3xl font-bold text-center">Weather App</h1>

      <SearchBar onSearch={handleSearch} />

      {error && <Error message={error} />}

      {weather && <WeatherCard data={weather} />}

      {forecast.length > 0 && <ForecastCard forecast={forecast} />}
    </div>
  );
}

export default App;