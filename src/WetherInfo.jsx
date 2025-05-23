import React from "react";

const WetherInfo = ({ data }) => {
  if (!data || !data.main || !data.weather) {
    return <p>Loading...</p>;
  }
  return (
    <main>
      <div className="city-info">
        <h2>{data.name}</h2>
        <img
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt="weather icon"
        />
      </div>
      <div className="details">
        <p>
          <span>{Math.round(data.main.temp)}°C</span>
        </p>
        <p>{data.weather[0].description}</p>
        <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
        <p>Humidity: {data.main.humidity}%</p>
      </div>
    </main>
  );
};

export default WetherInfo;
