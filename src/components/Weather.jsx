import { useEffect, useState } from "react";
import styles from "./Weather.module.css";
import SearchField from "./SearchField";
import Loader from "./Loader";
import getWeatherIcon from "./GetWeatherIcon";
import noResult from "../assets/no-results.png";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";

function Weather() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const KEY = import.meta.env.VITE_API_KEY;

  let localTime = null;
  if (weatherInfo?.timezone) {
    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    localTime = new Date(utc + weatherInfo.timezone * 1000);
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
      }
      (err) => {
        console.error("Geolocation error:", err.message);
        setError("Geolocation permission denied");
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
            <p>{error}</p>
          </>
        )}

        {!isLoading &&
          !error &&
          weatherInfo &&
          weatherInfo.main &&
          localTime && (
            <div className={styles.cityInfo}>
              <img
                className={styles.weatherIcon}
                src={getWeatherIcon(weatherInfo.weather[0].main, localTime)}
                alt={weatherInfo.weather[0].main}
              />
              <h2 className={styles.cityTemperature}>
                {Math.floor(weatherInfo.main.temp)}°C
              </h2>
              <h3 className={styles.cityName}>{city}</h3>
              <div className={styles.otherInfo}>
                <span>
                  <WiHumidity className={styles.weatherIcon} />
                  {weatherInfo.main.humidity}%
                  <p className={styles.humidity}>Humidity</p>
                </span>
                <span>
                  <FaWind className={styles.weatherIcon} />
                  {weatherInfo.wind.speed}km/h
                  <p className={styles.wind}>Speed</p>
                </span>
              </div>
            </div>
          )}

        {!isLoading &&
          !error &&
          (!weatherInfo || !weatherInfo.main) &&
          city && (
            <>
              <div className={styles.cityInfo}>
                <p className={styles.wrongCity}>
                  City not found... <br />
                  <img src={noResult} alt="no result" />
                </p>
              </div>
            </>
          )}
      </div>
    </>
  );
}

export default Weather;
