import {getDate, getWeekday} from "../lib-date/src/dates.js";
import GoogleGeocodeApi from "../lib-google-maps/src/GoogleGeocodeApi.js";
import OpenWeatherApi from "../lib-weather/src/OpenWeatherApi.js"

// sample openweathermap api call
//https://api.openweathermap.org/data/2.5/onecall?lat=43.9698&lon=-123.2006&exclude=minutely,hourly,current&units=imperial&appid=3fca0a11ad63bd24761e381b964b5ae9

class WeatherController
{
  constructor() {
  }


  async handleEvent(event){
    event.preventDefault();
    let input = document.querySelector("#zipcode").value;
    let googleGeoCodeApi = new GoogleGeocodeApi(process.env.GEOCODE_API_KEY);
    let location = await googleGeoCodeApi.getLocation(input);
    let openWeatherApi = new OpenWeatherApi(process.env.WEATHERMAP_API_KEY);
    this.forecast = await openWeatherApi.getSevenDayForecast(location.lat, location.lng);
    this.renderForecast(this.forecast);
  }

  renderForecast(forecast){
    let html = forecast.map(this.renderForecastDay);
    let htmlString = html.join('');

    document.getElementById('weatherList').innerHTML = htmlString;
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
    let day = this.forecast[index];
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

export default WeatherController;