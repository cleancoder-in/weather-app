import api from "./api.js";
import weatherUtils from "./weatherUtils.js";

const dom = (() => {
  const {
    getWeatherIcon,
    dateBuilder,
    getWeatherDetails,
    convertUnixTimeToDate,
  } = weatherUtils;
  const errorEl = document.getElementById("error");
  const dashboardEl = document.querySelector(".dashboard");

  async function renderApp(location = "new delhi") {
    loader("loading");
    const data = await api.getWeather(location);
    loader("done");
    if (data) {
      errorEl.classList.add("hide");
      dashboardEl.classList.remove("hide");
      updateDashboardPrimary(data);
      updateDashboardSecondary(data);
    } else {
      errorEl.classList.remove("hide");
      dashboardEl.classList.add("hide");
      errorEl.textContent =
        "Looks like location does n't exist, please try other location!";
    }
  }

  function updateDashboardPrimary(data) {
    const { weatherDataMain, weatherDetails } = data;
    updateDashboardPrimaryLeft(weatherDataMain);
    updateDashboardPrimaryRight(weatherDetails);
  }

  function updateDashboardPrimaryLeft(weatherDataMain) {
    const regionEl = document.querySelector(".left__location .region");
    const dateEl = document.querySelector(".left__location .date");
    const weatherIconEl = document.querySelector(".temp__details .weatherIcon");
    const tempEl = document.querySelector(".left__weatherData .temp");
    const minEl = document.querySelector(".min");
    const maxEl = document.querySelector(".max");
    const feelsLikeEl = document.querySelector(".temp .feels-like");

    regionEl.firstElementChild.textContent = weatherDataMain.city;
    regionEl.lastElementChild.textContent = weatherDataMain.country;
    dateEl.textContent = dateBuilder(new Date());
    weatherIconEl.firstElementChild.src = getWeatherIcon(
      weatherDataMain.weather_icon
    );
    weatherIconEl.lastElementChild.textContent = weatherDataMain.weather_desc;
    tempEl.firstElementChild.textContent = `${weatherDataMain.temp}°C`;
    minEl.lastElementChild.lastElementChild.textContent = `${weatherDataMain.temp_min}°C`;
    maxEl.lastElementChild.lastElementChild.textContent = `${weatherDataMain.temp_max}°C`;
    feelsLikeEl.textContent = `feels like ${weatherDataMain.feels_like}°C`;
  }

  function updateDashboardPrimaryRight(weatherDetails) {
    const weatherListItemsEl = document.querySelector(
      ".right__weatherListItems"
    );
    weatherListItemsEl.innerHTML = createWeatherListItem(weatherDetails);
  }

  function updateDashboardSecondary(data) {
    const { dailyWeatherDetails } = data;
    const weatherCardsEl = document.querySelector(".secondary__weatherCards");
    weatherCardsEl.innerHTML = createWeatherCard(dailyWeatherDetails);
  }

  function createWeatherListItem(data) {
    const listItemsArr = Object.entries(data);
    const listItems = listItemsArr.map((listItem) => {
      let [listItemTitle, listItemVal] = listItem;
      const listItemDetails = getWeatherDetails(listItemTitle);
      if (listItemTitle === "sunrise" || listItemTitle === "sunset") {
        listItemVal = convertUnixTimeToDate(listItemVal, "hh:mm");
      }
      if (listItemTitle === "visibility") {
        listItemVal = listItemVal / 1000;
      }
      return `<li class="weatherListItem">
                            <span class="listItem__icon">
                                ${listItemDetails[0]}
                                <em class="listItem__title smallText">${listItemTitle}</em>
                            </span>
                            <span class="listItem__details">
                                <strong class="listItemVal">${listItemVal} ${listItemDetails[1]}</strong>
                            </span>
                        </li>`;
    });
    return listItems.join("");
  }

  function createWeatherCard(data) {
    const weatherCards = data.map((item) => {
      return `<div class="weatherCard">
                        <div class="weatherCard__icon">
                            <img src="${getWeatherIcon(
                              item.weather_icon
                            )}" alt="weather icon">
                            <p class="icon__desc smallText">${
                              item.weather_desc
                            }</p>
                        </div>
                        <div class="weatherCard__details">
                            <p class="details__date">${item.date}</p>
                            <div class="details__temp">
                                <p class="temp">
                                    ${Math.round(item.temp_min)} &deg;C
                                    <span class="smallText">Min</span>
                                </p>
                                <p class="temp">
                                    ${Math.round(item.temp_max)} &deg;C
                                    <span class="smallText">Max</span>
                                </p>
                            </div>
                        </div>
                    </div>`;
    });
    console.log("weatherCards-->", weatherCards);
    return weatherCards.join("");
  }

  function loader(state) {
    const loaderEl = document.getElementById("loading");
    const dashboardEl = document.querySelector(".dashboard");
    if (state === "loading") {
      loaderEl.style.display = "block";
      dashboardEl.style.visibility = "hidden";
    }
    if (state === "done") {
      loaderEl.style.display = "none";
      dashboardEl.style.visibility = "visible";
    }
  }
  return {
    renderApp,
  };
})();

export default dom;
