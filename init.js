// same as previous lab
import './node_modules/@beneatspineapple/lib-general/general';
// without this I get an error at runtime.  babel 7 and preset env.
//const regeneratorRuntime = require("regenerator-runtime");

// my ES6 modules export functions that you need
// getLocation is the ONLY export (default) from googleMaps.js
import getLocation from './node_modules/@beneatspineapple/lib-google-maps/google-maps';
// getWeekday and getDate are named exports (functions) from dates.js
import {getWeekday, getDate} from './node_modules/@beneatspineapple/lib-date/dates';
import weather from './node_modules/@beaneatspineapple/lib-weather/weather';
//     onFormSubmit(){}.bind(this); for myself

// sample openweathermap api call
//https://api.openweathermap.org/data/2.5/onecall?lat=43.9698&lon=-123.2006&exclude=minutely,hourly,current&units=imperial&appid=3fca0a11ad63bd24761e381b964b5ae9


let weather = new Weather();

let coords = weather.getCoordinates("97401");
let forecast = weather.getSevenDayForecast("97401");
console.log(coords);
console.log(forecast);

window.onload = () => {weather = new Weather();}
