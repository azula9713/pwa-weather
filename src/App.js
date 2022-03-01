import React, { useState } from "react";
import "./App.css";

import { fetchWeather } from "./api/weather";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const searchWeather = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      <input
        type="search"
        className="search"
        placeholder="Search city..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyPress={searchWeather}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>°C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
