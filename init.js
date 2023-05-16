//What is this?
//const regeneratorRuntime = require("regenerator-runtime");

import Weather from './node_modules/@beneatspineapple/lib-weather/Weather.js';

//let coords = weather.getCoordinates("97401");
//let forecast = weather.getSevenDayForecast("97401");
//console.log(coords);
//console.log(forecast);

window.onload = () => {
    let weather = new Weather();
    document.getElementById("zipForm").addEventListener("submit", weather);
    document.getElementById("weatherList").addEventListener("click", weather.renderForecastDayDetail.bind(weather));
}
