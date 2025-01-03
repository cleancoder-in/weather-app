/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const API_KEY = `d3d96c7d611b2a395a2422b879d0255d`;

async function getData(city) {
  const endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&units=metric&appid=${API_KEY}`;
  const response = await fetch(endpoint, { mode: "cors" });
  const data = await response.json();
  console.log(data);
}

getData("London");

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLEtBQUssc0JBQXNCLFFBQVE7QUFDeEcsMkNBQTJDLGNBQWM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEFQSV9LRVkgPSBgZDNkOTZjN2Q2MTFiMmEzOTVhMjQyMmI4NzlkMDI1NWRgO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YShjaXR5KSB7XHJcbiAgY29uc3QgZW5kcG9pbnQgPSBgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2NpdHl9JnVuaXRzPW1ldHJpYyZhcHBpZD0ke0FQSV9LRVl9YDtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGVuZHBvaW50LCB7IG1vZGU6IFwiY29yc1wiIH0pO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgY29uc29sZS5sb2coZGF0YSk7XHJcbn1cclxuXHJcbmdldERhdGEoXCJMb25kb25cIik7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==