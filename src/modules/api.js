import { format } from "date-fns";
import weatherUtils from "./weatherUtils.js";

const api = (() => {
  const API_KEY = `d3d96c7d611b2a395a2422b879d0255d`;
  const { getNextDayDate, areDatesEqual } = weatherUtils;

  async function fetchApiData(URL) {
    try {
      const response = await fetch(URL, { mode: "cors" });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error("Sorry, couldn't find the location");
    } catch (error) {
      return error;
    }
  }

  async function getLocation(city) {
    const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`;
    const locationData = fetchApiData(URL);
    return locationData;
  }

  function processData(data) {
    const processedData = {
      weatherDataMain: {
        city: data.city.name,
        country: data.city.country,
        temp: data.list[0].main.temp,
        temp_min: data.list[0].main.temp_min,
        temp_max: data.list[0].main.temp_max,
        feels_like: data.list[0].main.feels_like,
        weather_desc: data.list[0].weather[0].description,
        weather_icon: data.list[0].weather[0].icon,
      },
      weatherDetails: {
        sunrise: data.city.sunrise,
        sunset: data.city.sunset,
        humidity: data.list[0].main.humidity,
        pressure: data.list[0].main.pressure,
        "wind speed": data.list[0].wind.speed,
        visibility: data.list[0].visibility,
      },
      dailyWeatherDetails: [],
    };

    let todayDate = format(data.list[0].dt_txt, "MM/dd/yyyy");
    let nextDayDate = getNextDayDate(todayDate, "MM/dd/yyyy");
    data.list.forEach((item) => {
      if (areDatesEqual(nextDayDate, format(item.dt_txt, "MM/dd/yyyy"))) {
        const weatherCard = {
          date: format(nextDayDate, "EEE, dd MMM"),
          weather_desc: item.weather[0].description,
          weather_icon: item.weather[0].icon,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
        };
        processedData.dailyWeatherDetails.push(weatherCard);
        nextDayDate = getNextDayDate(nextDayDate, "MM/dd/yyyy");
      }
    });
    console.log(processedData.dailyWeatherDetails);
    return processedData;
  }

  async function getWeather(city) {
    try {
      let location = await getLocation(city);
      console.log("location-->", location);
      if (Array.isArray(location)) {
        [location] = location;
        const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&cnt=40&appid=${API_KEY}&units=metric`;
        // const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`;
        const weatherData = await fetchApiData(URL);
        console.log(weatherData);
        return processData(weatherData);
      } else throw location;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return { getWeather };
})();

export default api;
