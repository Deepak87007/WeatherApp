import React, { useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
    }
  ];
  wind: {
    speed: number;
  }
}

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [city, setCity] = useState<string>("London");
  const [error, setError] = useState<string>();
  const api_key: string = 'ffd62ce856a9ea4a84414cb032b26883'
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
        );
        setWeatherData(result.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [city]);

  return (
    <center className="container my-5">
      <h1 className="text-center mb-5">Weather App</h1>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      {weatherData ? (
        <div className="card p-3 ">
          <h1 className="card-title text-primary"><i className="bi bi-geo-alt text-dark"></i>{weatherData.name}</h1>
          <h3 className="card-subtitle">{weatherData.weather[0].description} <i className="bi bi-cloudy-fill text-warning"></i></h3>
          <h2 className="card-text"><i className="bi bi-thermometer-low text-success"></i>Temperature: {weatherData.main.temp}°C</h2>
          <br/>
          <div className="row">
            <div className="col-3">
              <h5 className="text-info">MIN TEMP</h5>
              <p><i className="bi bi-cloud-fill text-info" style={{ fontSize: "30px" }}></i> {weatherData.main.temp_min}</p>
            </div>

            <div className="col-3">
              <h5 className="text-danger">MAX TEMP</h5>
              <p><i className="bi bi-cloud-sun-fill text-danger" style={{ fontSize: "30px" }}></i> {weatherData.main.temp_max}</p>
            </div>
            <div className="col-3">
              <h5 className="text-primary">HUMIDITY</h5>
              <p><i className="bi bi-droplet-fill text-primary" style={{ fontSize: "30px" }}></i> {weatherData.main.humidity}</p>
            </div>
            <div className="col-3">
              <h5 className="text-warning">WIND SPEED</h5>
              <p><i className="bi bi-wind text-warning" style={{ fontSize: "30px" }}></i> {weatherData.wind.speed}KM</p>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <p>Loading...</p>
      )}
    </center>
  );
};

export default App;
