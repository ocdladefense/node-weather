import WeatherController from './assets/js/dist/WeatherController.js';
import { Modal } from "./dev_modules/node-modal/dist/modal.js";
import DayForecast from './assets/js/lib-weather/src/DayForecast.js';

//What is this?
//const regeneratorRuntime = require("regenerator-runtime");



//let coords = weather.getCoordinates("97401");
//let forecast = weather.getSevenDayForecast("97401");
//console.log(coords);
//console.log(forecast);
let weather = new WeatherController();

window.onload = () => {
    //document.getElementById("zipForm").addEventListener("submit", weather);
    document.addEventListener("click", weather);
}
window.weather = weather;

//Setup modal
let modal = new Modal();
window.modal = modal;

let dayForecast = new DayForecast();
window.dayForecast = dayForecast;