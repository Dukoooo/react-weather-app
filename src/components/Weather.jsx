import { useEffect, useState } from "react";
import SearchField from "./SearchField";
import styles from "./Weather.module.css";
import Loader from "./Loader";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

function Weather() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const KEY = `1ee9567da45698af17a8393925c57305`;

  function getWeatherIcon(main) {
    switch (main) {
      case "Clear":
        return <WiDaySunny size={48} />;
      case "Rain":
        return <WiRain size={48} />;
      case "Clouds":
        return <WiCloudy size={48} />;
      case "Snow":
        return <WiSnow size={48} />;
      case "Thunderstorm":
        return <WiThunderstorm size={48} />;
      default:
        return <WiCloudy size={48} />;
    }
  }

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
            <div className={styles.cityInfo}>
              <span className={styles.weatherIcon}></span>
              <h2 className={styles.cityTemperature}>Loading in proces</h2>
              <h3 className={styles.cityName}></h3>
              <div className={styles.otherInfo}>
                <span className={styles.humidity}>%</span>
                <span className={styles.wind}>km/h</span>
              </div>
            </div>
          </>
        )}

        {!isLoading && !error && weatherInfo && weatherInfo.main && (
          <>
            <div className={styles.cityInfo}>
              <span className={styles.weatherIcon}>
                {getWeatherIcon(weatherInfo.weather[0].main)}
              </span>
              <h2 className={styles.cityTemperature}>
                {Math.floor(weatherInfo.main.temp)} C
              </h2>
              <h3 className={styles.cityName}>{city}</h3>
              <div className={styles.otherInfo}>
                <span className={styles.humidity}>
                  {weatherInfo.main.humidity}%
                </span>
                <span className={styles.wind}>
                  {weatherInfo.wind.speed}km/h
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
