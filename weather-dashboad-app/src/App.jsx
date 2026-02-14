import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import Error from "./components/Error";
import { fetchCurrentWeather, fetchForecast } from "./api";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "789d4d451818c1630180ec4cee4dd98e";

  const handleSearch = async (city) => {
    try {
      setError("");
      const currentData = await fetchCurrentWeather(city);
      const forecastData = await fetchForecast(city);

      setWeather(currentData);
      setForecast(forecastData);
    } catch (err) {
      setWeather(null);
      setForecast([]);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <h1 className="text-3xl font-bold text-center mt-6">
        Weather Dashboard
      </h1>

      <SearchBar onSearch={handleSearch} />

      {error && <Error message={error} />}

      {weather && <WeatherCard data={weather} />}

      {forecast.length > 0 && <ForecastCard forecast={forecast} />}
    </div>
  );
}

export default App;