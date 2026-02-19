const handleSearch = async (city) => {
  try {
    setError("");
    setWeather(null);
    setForecast([]);

    
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData = await weatherResponse.json();

    if (weatherData.cod !== 200) {
      throw new Error(weatherData.message);
    }

    setWeather(weatherData);

    
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const forecastData = await forecastResponse.json();

    if (Number(forecastData.cod) !== 200) {
      throw new Error(forecastData.message);
    }

    
    const dailyForecast = forecastData.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    setForecast(dailyForecast);

  } catch (err) {
    setError(err.message);
  }
};