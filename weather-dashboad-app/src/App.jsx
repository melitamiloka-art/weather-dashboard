import { useState } from "react";
import { fetchWeatherData } from "./api";

import { SearchBar } from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    try {
      setError("");
      setWeather(null);
      setForecast([]);

      const { weatherData, forecastData } = await fetchWeatherData(city);

      setWeather(weatherData);

      const dailyForecast = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(dailyForecast);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Weather Dashboard
      </h1>

      <SearchBar onSearch={handleSearch} />

      {error && (
        <p className="text-red-500 text-center mt-4">
          {error}
        </p>
      )}

      {weather && (
        <div className="mt-6 flex justify-center">
          <WeatherCard data={weather} />
        </div>
      )}

      {forecast.length > 0 && (
        <div className="mt-6">
          <ForecastCard forecast={forecast} />
        </div>
      )}
    </div>
  );
}

export default App;