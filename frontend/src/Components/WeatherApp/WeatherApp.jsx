import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import cloud_icon from "../Assets/cloud.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import clear_icon from "../Assets/clear.png";
import undefined_icon from "../Assets/undefined.png";

const getWeatherIcon = (skyCondition) => {
  if (skyCondition >= 200 && skyCondition <= 499) {
    return drizzle_icon;
  } else if (skyCondition >= 500 && skyCondition <= 599) {
    return rain_icon;
  } else if (skyCondition >= 600 && skyCondition <= 699) {
    return snow_icon;
  } else if (skyCondition >= 801 && skyCondition <= 899) {
    return cloud_icon;
  } else if (skyCondition === 800) {
    return clear_icon;
  } else {
    return undefined_icon;
  }
};

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const search = async () => {
    try {
      const response = await fetch(`http://localhost:5000/?city=${city}`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
      setError("");
    } catch (error) {
      console.error("Error: ", error);
      setError("City not found");
      setWeatherData(null); // Clear weather data in case of error
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="city-input"
          placeholder="Search City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      {weatherData && !error && (
        <>
          <div className="weather-image">
            <img
              src={weatherData && weatherData.sky_condition ? getWeatherIcon(weatherData.sky_condition) : cloud_icon}
              alt=""
            />
          </div>
          <div className="weather-temp">
            {weatherData && weatherData.temperature && `${weatherData.temperature}°C`}
          </div>
          <div className="weather-location">{city}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {weatherData && weatherData.humidity && `${weatherData.humidity}%`}
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {weatherData && weatherData.wind_speed && `${weatherData.wind_speed} km/h`}
                </div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
