import sun from "../assets/sun.png";
import rain from "../assets/rain.png";
import clouds from "../assets/cloudy.png";
import snow from "../assets/snow.png";
import thunder from "../assets/storm.png";
import clearNight from "../assets/moon.png";
import rainNight from "../assets/moonRain.png";
import cloud from "../assets/cloud.png";
import stormNight from "../assets/moonStorm.png";

function getWeatherIcon(main, currentTime = new Date()) {
  const hour = currentTime.getHours();
  const isNight = hour >= 22 || hour < 6;

  if (isNight) {
    switch (main) {
      case "Clear":
        return clearNight;
      case "Rain":
        return rainNight;
      case "Clouds":
        return cloud;
      case "Snow":
        return snow;
      case "Thunderstorm":
        return stormNight;
      default:
        return clearNight;
    }
  } else {
    switch (main) {
      case "Clear":
        return sun;
      case "Rain":
        return rain;
      case "Clouds":
        return clouds;
      case "Snow":
        return snow;
      case "Thunderstorm":
        return thunder;
      default:
        return sun;
    }
  }
}

export default getWeatherIcon;
