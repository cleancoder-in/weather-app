import { format, fromUnixTime, addDays, compareAsc } from "date-fns";
import cloudy_img from "../assets/images/cloudy.png";
import drizzle_img from "../assets/images/drizzle.png";
import sun_img from "../assets/images/sun.png";
import storm_img from "../assets/images/storm.png";
import snow_img from "../assets/images/snow.png";
import mist_img from "../assets/images/mist.png";
import humidity_img from "../assets/images/humidity.png";
import wind_img from "../assets/images/wind.png";

const weatherUtils = (() => {
  function dateBuilder(d) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  function getWeatherIcon(code) {
    if (code === "01d" || code === "01n") return sun_img;
    if (
      code === "02d" ||
      code === "02n" ||
      code === "03d" ||
      code === "03n" ||
      code === "04d" ||
      code === "04n"
    )
      return cloudy_img;
    if (code === "09d" || code === "09n" || code === "10d" || code === "10n")
      return drizzle_img;
    if (code === "11d" || code === "11n") return storm_img;
    if (code === "13d" || code === "13n") return snow_img;
    if (code === "50d" || code === "50n") return mist_img;
  }

  function getWeatherDetails(cardTitle) {
    switch (cardTitle) {
      case "wind speed":
        return [`<i class="fa-solid fa-wind"></i>`, "km/h"];
      case "humidity":
        return ['<i class="fa-solid fa-droplet"></i>', "%"];
      case "sunrise":
        return [
          '<svg color="#ffc755" fill="currentColor" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c.41 0 .75.34.75.75v.5a.75.75 0 01-1.5 0v-.5c0-.41.34-.75.75-.75zM8 9a4 4 0 118 0 4 4 0 01-8 0zm4.75 5.75a.75.75 0 00-1.5 0v.5a.75.75 0 001.5 0v-.5zM5.75 8a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM17 8.75c0-.41.34-.75.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM6.72 5.78a.75.75 0 001.06-1.06l-.5-.5a.75.75 0 00-1.06 1.06l.5.5zm1.06 6.44a.75.75 0 00-1.06 0l-.5.5a.75.75 0 101.06 1.06l.5-.5c.3-.3.3-.77 0-1.06zm9.5-6.44a.75.75 0 11-1.06-1.06l.5-.5a.75.75 0 111.06 1.06l-.5.5zm-1.06 6.44c.3-.3.77-.3 1.06 0l.5.5a.75.75 0 11-1.06 1.06l-.5-.5a.75.75 0 010-1.06zm-13 9.62c-.33.25-.8.2-1.06-.12-.4-.51.12-1.06.12-1.06h.02a3.49 3.49 0 01.18-.15l.54-.36A16.78 16.78 0 0112 17.5a16.78 16.78 0 019.7 3.15l.01.01a.75.75 0 01-.93 1.18l-.03-.03a5.63 5.63 0 00-.58-.4A15.28 15.28 0 0012 19a15.28 15.28 0 00-8.75 2.81l-.03.02z" fill="currentColor"></path></svg>',
          "AM",
        ];
      case "sunset":
        return [
          '<svg color="#5a7ec6" fill="currentColor" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.75 2.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zm6.28 2.22c.3.3.3.77 0 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06c.3-.3.77-.3 1.06 0zM6.59 13a5.5 5.5 0 1110.82 0h3.84a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5h3.84zm.16 3a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zm4 3a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5zM4.97 4.97c.3-.3.77-.3 1.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.97 6.03a.75.75 0 010-1.06z" fill="currentColor"></path></svg>',
          "PM",
        ];
      case "pressure":
        return [
          '<svg color="#db8cea" fill="currentColor" ="aria-hidden"="true" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 5.5h7a1 1 0 011 .88v7.12a1 1 0 01-2 .12V8.9l-7.3 7.3a1 1 0 01-1.31.08l-.1-.08L9 13.9l-5.28 5.3a1 1 0 01-1.5-1.32l.08-.1 6-6a1 1 0 011.32-.08l.1.08L12 14.1l6.58-6.59H14a1 1 0 01-.99-.88V6.5a1 1 0 01.88-1H21h-7z" fill="currentColor"></path></svg>',
          "hPa",
        ];
      case "visibility":
        return ['<i class="fa-regular fa-eye-slash"></i>', "km"];
    }
  }

  function convertUnixTimeToDate(unixTime, dateFormat) {
    return format(fromUnixTime(unixTime), dateFormat);
  }

  function getNextDayDate(date, dateFormat) {
    return format(addDays(date, 1), dateFormat);
  }

  function areDatesEqual(date1, date2) {
    return compareAsc(date1, date2) === 0 ? true : false;
  }

  return {
    dateBuilder,
    getWeatherIcon,
    getWeatherDetails,
    convertUnixTimeToDate,
    getNextDayDate,
    areDatesEqual,
  };
})();

export default weatherUtils;
