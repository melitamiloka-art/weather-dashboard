import { useState } from "react";
import { fetchWeatherData } from "./api";

import {SearchBar} from "../src/components/SearchBar"
import WeatherCard from "../src/components/WeatherCard"
import ForecastCard from "../src/components/ForecastCard"

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
    <>
      <SearchBar onSearch={handleSearch} />
      {weather && <WeatherCard data={weather}/>}
      {forecast && <ForecastCard forecast={forecast}/>}

    </>
  );
}

export default App;