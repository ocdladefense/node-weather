// same as previous lab
import './general';
// without this I get an error at runtime.  babel 7 and preset env.
const regeneratorRuntime = require("regenerator-runtime");

// my ES6 modules export functions that you need
// getLocation is the ONLY export (default) from googleMaps.js
import getLocation from './googleMaps';
// getWeekday and getDate are named exports (functions) from dates.js
import {getWeekday, getDate} from './dates';
//     onFormSubmit(){}.bind(this); for myself
class Weather
{
  constructor() {
    // Update three parts of the page: zipForm, weatherList, and currentDay.
    this.weatherMapUrl = "https://api.openweathermap.org/data/2.5/onecall";
    this.weatherMapApiKey = "3fca0a11ad63bd24761e381b964b5ae9";
    // this.form.onsubmit = this.onFormSubmit.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    document.getElementById("zipForm").onsubmit = this.onFormSubmit.bind(this);
    this.renderWeatherList = this.renderWeatherList.bind(this);
    this.renderCurrentDay = this.renderCurrentDay.bind(this);
  }

  getCoordinates(zip){
    getLocation(zip)
    .then(data => {
      let city = {};

      let name = data.results[0].address_components[1].long_name;
      let lat = data.results[0].geometry.location.lat;
      let lng = data.results[0].geometry.location.lng;

      city.name = name;
      city.lat = lat;
      city.lng = lng;

      return city;
  });
};

 formatQueryString(obj){
  let params = [];
  for (let prop in obj){
    let kvp;
    kvp = prop + "=" + obj[prop]; 
    params.push(kvp);
  };
  return params.join("&");
}

  onFormSubmit(event){
    event.preventDefault();
    let zipcode = document.querySelector("#zipcode").value;
    
    getSevenDayForecast(zipcode)
    .then(this.renderForecast);
    //.then(function(){document.getElementById("zipcode").value = "";})
    //.then(function(){document.getElementById("currentDay").innerHTML = "";})
  }

  getSevenDayForecast(zipcode){
    let city = this.getCoordinates(zipcode);
    let params = {
      lat: city.lat, 
      lon: city.lng, 
      exclude: "minutely,hourly,current",
      units: "imperial",
      appid: this.weatherMapApiKey
    };
    return fetch(this.weatherMapUrl + "?" + formatQueryString(params))
    .then(response => response.json())
    .then(forecast => {
      console.warn("FORECAST: " , forecast);
      let sevenDayForecast = forecast.daily;
      // Sometimes the api returns an eight day forecast.
      // Turn an eight day forecast into a seven day forecast.
      sevenDayForecast.splice(7, 1);
      //let timeZoneOffset = forecast.timezone_offset;
      return sevenDayForecast;
    });
  }

  renderForecast(forecast){
    let html = forecast.map(renderForecastDay);
    let htmlString = html.join('');
    document.getElementById('weatherList').innerHTML = htmlString;
    let elems = document.getElementsByClassName("weather-list-item");
    for(let i = 0; i < elems.length; i++){
      elems[i].onclick = this.renderForecastDayDetail.bind(this, i);
    }
  }
  // May need to rename this.
  renderForecastDay(day){
    return `
      <div class="weather-list-item">
        ${getDate(day.dt).getMonth() + 1}/${getDate(day.dt).getDate()}<br />
        ${getWeekday(getDate(day.dt))}<br />
        ${day.temp.min} | ${day.temp.max}<br />
      </div>
    `;
  }

  renderForecastDayDetail(index){
    let dayElem = document.getElementById("currentDay");
    
    let html = `
      <div id="currentDay">
      <img src='http://openweathermap.org/img/wn/${this.state.forecast[index].weather[0].icon}.png'>${this.state.forecast[index].weather[0].description}<br />
      Morning Temperature: ${this.state.forecast[index].temp.morn}<br />
      Day Temperature: ${this.state.forecast[index].temp.day}<br />
      Evening Temperature: ${this.state.forecast[index].temp.eve}<br />
      Wind Speed: ${this.state.forecast[index].wind_speed}<br />
      Humidity: ${this.state.forecast[index].humidity}
      </div>
    `;

    dayElem.innerHTML = html;
  }
}


// sample openweathermap api call
//https://api.openweathermap.org/data/2.5/onecall?lat=43.9698&lon=-123.2006&exclude=minutely,hourly,current&units=imperial&appid=3fca0a11ad63bd24761e381b964b5ae9


let weather = new Weather();

let coords = weather.getCoordinates("97401");
let forecast = weather.getSevenDayForecast("97401");


window.onload = () => {weather = new Weather();}

