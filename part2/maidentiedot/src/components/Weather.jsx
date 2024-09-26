import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apikey = import.meta.env.VITE_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apikey}&units=metric`
      )
      .then((result) => setWeather(result.data));
  }, [country.capital]);

  if (!weather) return null;
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temparature {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt=""
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
