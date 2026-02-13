import React from "react";

const WeatherCard = ({ data }) => {
  const tempF = (data.main.temp * 9) / 5 + 32;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6 text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold">{data.name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="mx-auto"
      />
      <p className="text-xl">
        {data.main.temp}°C / {tempF.toFixed(1)}°F
      </p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;