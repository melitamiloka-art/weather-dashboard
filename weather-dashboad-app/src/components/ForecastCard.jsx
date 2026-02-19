import React from "react";

const ForecastCard = ({ forecast }) => {
  if (!forecast || forecast.length === 0) {
    return (
      <p className="text-center mt-6 text-gray-600">
        No forecast data available
      </p>
    );
  }

  return (
    <div className="flex justify-center gap-4 mt-6 flex-wrap px-4">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="bg-gray-100 p-4 rounded shadow text-center w-40 sm:w-32"
        >
          
          <p className="font-semibold text-sm">
            {new Date(day.dt_txt).toLocaleDateString()}
          </p>

          
          <img
            src={`https://openweathermap.org/img/wn/${day.weather?.[0]?.icon}.png`}
            alt="Weather icon"
            className="mx-auto"
          />

          
          <p className="text-lg font-medium">
            {day.main?.temp}°C
          </p>
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;