const WeatherCard = ({ data }) => {
  if (!data) return null;

  const tempF = (data.main.temp * 9) / 5 + 32;
  const { name, main, weather, wind, sys } = data;
  const { temp, temp_min, temp_max, humidity } = main;
  const { description, icon } = weather[0];
  const { country } = sys;

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 shadow-xl rounded-2xl p-6 mt-6 text-center max-w-md mx-auto border border-gray-200">

      {/* City & Country /}
      <h2 className="text-2xl font-bold mb-2">{name}, {country}</h2>

      {/ Weather Icon & Description /}
      <div className="flex flex-col items-center mb-4">
        <img
          src={https://openweathermap.org/img/wn/${icon}@2x.png}
          alt={description}
          className="w-24 h-24"
        />
        <p className="capitalize text-gray-700">{description}</p>
      </div>

      {/ Temperature /}
      <p className="text-4xl font-bold mb-1">{temp.toFixed(1)}°C</p>
      <p className="text-gray-600 mb-4">({tempF.toFixed(1)}°F)</p>
      <p className="text-gray-700 mb-2">
        Min: {temp_min.toFixed(1)}°C | Max: {temp_max.toFixed(1)}°C
      </p>

      {/ Additional Info Grid */}
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <div>
          <p className="font-semibold">Humidity</p>
          <p>{humidity}%</p>
        </div>
        <div>
          <p className="font-semibold">Wind</p>
          <p>{wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;