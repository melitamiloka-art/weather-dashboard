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
      {forecast.map((day, index) => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
        const monthDay = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        const tempC = day.main?.temp?.toFixed(1);

        const icon = day.weather?.[0]?.icon;
        const description = day.weather?.[0]?.description;

        return (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl shadow-md text-center w-36 sm:w-32 hover:scale-105 transition-transform duration-300"
          >
            {/* Day & Date /}
            <p className="font-semibold text-sm text-gray-700">{dayName}</p>
            <p className="text-xs text-gray-500 mb-2">{monthDay}</p>

            {/ Weather Icon /}
            <img
              src={https://openweathermap.org/img/wn/${icon}@2x.png}
              alt={description}
              className="mx-auto w-16 h-16"
            />

            {/ Temperature /}
            <p className="text-lg font-bold mt-2">{tempC}°C</p>

            {/ Optional: Short description */}
            <p className="text-xs capitalize text-gray-600">{description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastCard;