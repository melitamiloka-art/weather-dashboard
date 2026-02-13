const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchCurrentWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
};

export const fetchForecast = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Forecast not available");
  }

  const data = await response.json();

  
  return data.list.filter((item, index) => index % 8 === 0).slice(0, 3);
};