const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchWeatherData = async (city) => {

  const weatherResponse = await fetch(
    https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}
  );

  const weatherData = await weatherResponse.json();
  console.log(weatherData)

  if (!weatherResponse.ok) {
    throw new Error(weatherData.message  "Failed to fetch weather data");
  }

  const forecastResponse = await fetch(
    https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}
  );

  const forecastData = await forecastResponse.json();

  if (!forecastResponse.ok) {
    throw new Error(forecastData.message  "Failed to fetch forecast data");
  }

  return { weatherData, forecastData };
};