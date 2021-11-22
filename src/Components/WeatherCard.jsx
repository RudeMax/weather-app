import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchWeather } from "../Redux/Actions";

const apiKey = "0b91e225f4f88eb850a4417d9735f59c";

function WeatherCard() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.weather);
  const currentCity = useSelector((state) => state.location.currentCity);

  useEffect(() => {
    dispatch(fetchWeather({ city: currentCity, key: apiKey }));
  }, [currentCity, dispatch]);

  if (!weather) return <div>Loading...</div>;

  return (
    <div className="weather-card">
      <div className="weather-card-top">
        <div className="weather-card-top-left">
          {Math.trunc(weather?.main?.temp)}&deg;
        </div>
        <div className="weather-card-top-right">
          <div className="feels-like">
            <p>
              feels like:{" "}
              <span className="feels-like-value">
                {Math.trunc(weather?.main?.feels_like)}&deg;
              </span>
            </p>
          </div>
          <div className="humidity">
            <p>
              humidity:{" "}
              <span className="humidity-value">
                {Math.trunc(weather?.main?.humidity)}%
              </span>
            </p>
          </div>
          <div className="wind">
            <p>
              wind:{" "}
              <span className="wind-value">
                {Math.trunc(weather?.wind?.speed)}m/s
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="weather-card-bottom">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
          alt=""
        />
        <span className="weather-description">
          {weather?.weather?.[0]?.main}, {weather?.weather?.[0]?.description}
        </span>
      </div>
    </div>
  );
}

export default WeatherCard;
