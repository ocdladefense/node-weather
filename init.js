import WeatherController from './assets/js/dist/WeatherController.js';

//What is this?
//const regeneratorRuntime = require("regenerator-runtime");



//let coords = weather.getCoordinates("97401");
//let forecast = weather.getSevenDayForecast("97401");
//console.log(coords);
//console.log(forecast);
let weather = new WeatherController();

window.onload = () => {
    document.getElementById("zipForm").addEventListener("submit", weather);
    document.getElementById("weatherList").addEventListener("click", weather);
}

