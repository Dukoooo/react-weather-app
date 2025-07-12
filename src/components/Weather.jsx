import { useEffect, useState } from "react";
import SearchField from "./SearchField";
import styles from "./Weather.module.css";
import Loader from "./Loader";

import sun from "../assets/sun.png";
import rain from "../assets/rain.png";
import clouds from "../assets/cloudy.png";
import snow from "../assets/snow.png";
import thunder from "../assets/storm.png";

function Weather() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const KEY = `1ee9567da45698af17a8393925c57305`;

  function getWeatherIcon(main) {
    switch (main) {
      case "Clear":
        return <img src={sun} alt="Clear" />;
      case "Rain":
        return <img src={rain} alt="Rain" />;
      case "Clouds":
        return <img src={clouds} alt="Clouds" />;
      case "Snow":
        return <img src={snow} alt="Snow" />;
      case "Thunderstorm":
        return <img src={thunder} alt="Thunderstorm" />;
      default:
        return <img src={sun} alt="Default" />;
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}&units=metric`
        );
        const data = await res.json();
        setWeatherInfo(data);
        setCity(data.name);
      } catch (err) {
        setError("Unable to get weather by location");
        console.error("Geolocation error:", err.message);
        setError("Geolocation permission denied");
        setCity("bratislava");
      }
      (err) => {
        console.error("Geolocation error:", err.message);
        setError("Geolocation permission denied");
        setCity("bratislava");
      };
    });
  }, []);

  useEffect(() => {
    if (!city) return;

    async function searchCity(city) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`
        );
        const data = await response.json();
        setWeatherInfo(data);
      } catch (err) {
        setError(err.message);
        setWeatherInfo(null);
      } finally {
        setIsLoading(false);
      }
    }
    searchCity(city);
  }, [city]);

  return (
    <>
      <div className={styles.container}>
        <SearchField onSetCity={setCity} />

        {isLoading && (
          <>
            <Loader />
          </>
        )}

        {!isLoading && error && (
          <>
            <p>{error.message}</p>
          </>
        )}

        {!isLoading && !error && weatherInfo && weatherInfo.main && (
          <>
            <div className={styles.cityInfo}>
              <span className={styles.weatherIcon}>
                {getWeatherIcon(weatherInfo.weather[0].main)}
              </span>
              <h2 className={styles.cityTemperature}>
                {Math.floor(weatherInfo.main.temp)}°C
              </h2>
              <h3 className={styles.cityName}>{city}</h3>
              <div className={styles.otherInfo}>
                <span className={styles.humidity}>
                  {weatherInfo.main.humidity}% <p>Humidity</p>
                </span>
                <span className={styles.wind}>
                  {weatherInfo.wind.speed}km/h
                  <p>speed</p>
                </span>
              </div>
            </div>
          </>
        )}

        {!isLoading &&
          !error &&
          (!weatherInfo || !weatherInfo.main) &&
          !city && (
            <>
              <div className={styles.cityInfo}>
                <span className={styles.weatherIcon}>enter the city</span>
              </div>
            </>
          )}
      </div>
    </>
  );
}

export default Weather;
