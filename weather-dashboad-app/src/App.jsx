import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import Error from "./components/Error";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    try {
      setError("");
      setWeather(null);
      setForecast([]);

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();
      if (weatherData.cod !== 200) throw new Error(weatherData.message);
      setWeather(weatherData);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      if (forecastData.cod !== "200") throw new Error(forecastData.message);

      const dailyForecast = forecastData.list.filter((_, index) => index % 8 === 0);
      setForecast(dailyForecast);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <h1 className="text-3xl font-bold text-center">Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <Error message={error} />}
      {weather && <WeatherCard data={weather} />}
      {forecast.length > 0 && <ForecastCard forecast={forecast} />}
    </div>
  );
}

export default App;