//What is this?
//const regeneratorRuntime = require("regenerator-runtime");

import WeatherController from './assets/js/dist/WeatherController.js';

//let coords = weather.getCoordinates("97401");
//let forecast = weather.getSevenDayForecast("97401");
//console.log(coords);
//console.log(forecast);

window.onload = () => {
    let weather = new WeatherController();
    document.getElementById("zipForm").addEventListener("submit", weather);
    document.getElementById("weatherList").addEventListener("click", weather.renderForecastDayDetail.bind(weather));
}
