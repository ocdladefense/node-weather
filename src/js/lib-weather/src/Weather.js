import {getDate, getWeekday} from "../../lib-date/src/dates.js";
import getLocation from "../../lib-google-maps/dist/google-maps.js";
import formatQueryString from "../../lib-http/src/http.js";


// sample openweathermap api call
//https://api.openweathermap.org/data/2.5/onecall?lat=43.9698&lon=-123.2006&exclude=minutely,hourly,current&units=imperial&appid=3fca0a11ad63bd24761e381b964b5ae9

class Weather
{
  constructor() {
    // Update three parts of the page: zipForm, weatherList, and currentDay.
    this.weatherMapUrl = process.env.WEATHERMAP_URL;
    this.weatherMapApiKey = process.env.WEATHERMAP_API_KEY;
    // this.form.onsubmit = this.onFormSubmit.bind(this);
    // this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.getSevenDayForecast = this.getSevenDayForecast.bind(this);
    // this.renderForecastDay = this.renderForecastDay.bind(this);
    // this.renderForecast = this.renderForecast.bind(this);
    // this.renderForecastDayDetail = this.renderForecastDayDetail.bind(this);
    // this.getCoordinates = this.getCoordinates.bind(this);
    // this.formatQueryString = this.formatQueryString.bind(this);
  }

  //Get longitude, latitude, and name of city based on zip code from google maps geocode api.
  getCoordinates(zip){
    return getLocation(zip)
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


  handleEvent(event){
    event.preventDefault();
    let zipcode = document.querySelector("#zipcode").value;
    // this.test(zipcode)
    // .then((forecast) => this.renderForecast(forecast));


    this.getSevenDayForecast(zipcode)
    .then((forecast) => this.renderForecast(forecast));

    
    //.then(function(){document.getElementById("zipcode").value = "";})
    //.then(function(){document.getElementById("currentDay").innerHTML = "";})
  }

  // Use the zipcode entered to get longitude and latitude from google api because openweathermap api requires coordinates. Fetches forecast with formatted query string. 
  async getSevenDayForecast(zipcode){
    let city = await this.getCoordinates(zipcode);

    // console.log("city " , city);
    let params = {
      lat: city.lat, 
      lon: city.lng, 
      exclude: "minutely,hourly,current",
      units: "imperial",
      appid: this.weatherMapApiKey
    };
    console.log(this.weatherMapUrl + "?" + formatQueryString(params));
    return fetch(this.weatherMapUrl + "?" + formatQueryString(params))
    .then(response => response.json())
    .then(forecast => {
      // console.warn("FORECAST: " , forecast.daily);
      let sevenDayForecast = forecast.daily;
      // Sometimes the api returns an eight day forecast.
      // Turn an eight day forecast into a seven day forecast.
      sevenDayForecast.splice(7, 1);
      this.sevenDayForecast = sevenDayForecast;
      //let timeZoneOffset = forecast.timezone_offset;
      // console.log("SDF " , sevenDayForecast);
      return sevenDayForecast;
    });
  }
  // async test(zipcode){
  //   let city = await this.getCoordinates(zipcode);
  //   // console.log("city " , city);
  //   let params = {
  //     lat: city.lat, 
  //     lon: city.lng, 
  //     exclude: "minutely,hourly,current",
  //     units: "imperial",
  //     appid: this.weatherMapApiKey
  //   };
  //   return fetch(this.weatherMapUrl + "?" + formatQueryString(params))
  //   .then(response => response.json())
  //   .then(forecast => {
  //     console.warn("FORECAST: " , forecast.daily);
  //     let sevenDayForecast = forecast.daily;
  //     // Sometimes the api returns an eight day forecast.
  //     // Turn an eight day forecast into a seven day forecast.
  //     sevenDayForecast.splice(7, 1);
  //     this.sevenDayForecast = sevenDayForecast;
  //     //let timeZoneOffset = forecast.timezone_offset;
  //     console.log("SDF " , sevenDayForecast);
  //     return sevenDayForecast;
  //   });
  // }
  renderForecast(forecast){
    let html = forecast.map(this.renderForecastDay);
    let htmlString = html.join('');
    //console.log(htmlString);
    document.getElementById('weatherList').innerHTML = htmlString;
    // let elems = document.getElementsByClassName("weather-list-item");
    // for(let i = 0; i < elems.length; i++){
    //   elems[i].onclick = (forecast) => this.renderForecastDayDetail(forecast[i]);
    // }
  }
  
  renderForecastDay(day, index){
    let theDate = getDate(day.dt);
 
    return `
      <div class="weather-list-item" data-index="${index}">
        ${theDate.getMonth() + 1}/${theDate.getDate()}<br />
        ${getWeekday(theDate)}<br />
        ${day.temp.min} | ${day.temp.max}<br />
      </div>
    `;
  }

  renderForecastDayDetail(e){
    let target = e.target;
    let dataset = target.dataset;
    let index = dataset.index;
    let day = this.sevenDayForecast[index];
    let dayElem = document.getElementById("currentDay");
    // console.log("day is " , index);
    let html = `
      <div id="currentDay">
      <img src='http://openweathermap.org/img/wn/${day.weather[0].icon}.png'>${day.weather[0].description}<br />
      Morning Temperature: ${day.temp.morn}<br />
      Day Temperature: ${day.temp.day}<br />
      Evening Temperature: ${day.temp.eve}<br />
      Wind Speed: ${day.wind_speed}<br />
      Humidity: ${day.humidity}
      </div>
    `;

    dayElem.innerHTML = html;
  }
}

export default Weather;