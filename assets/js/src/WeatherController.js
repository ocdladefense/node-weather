/** @jsx vNode */
import {vNode,View} from "../../../node_modules/@ocdladefense/view/view.js";
import {Forecast, WeatherDetail} from "./Components.js";
import GoogleGeocodeApi from "../lib-google-maps/src/GoogleGeocodeApi.js";
import OpenWeatherApi from "../lib-weather/src/OpenWeatherApi.js"

// sample openweathermap api call
//https://api.openweathermap.org/data/2.5/onecall?lat=43.9698&lon=-123.2006&exclude=minutely,hourly,current&units=imperial&appid=3fca0a11ad63bd24761e381b964b5ae9

class WeatherController
{
  constructor() {
    this.gApiKey = process.env.GEOCODE_API_KEY;
    this.wApiKey = process.env.WEATHERMAP_API_KEY;
    this.emailUrl = process.env.EMAIL_URL;
  }

  async handleEvent(e){
    e.preventDefault();
    let target = e.target;
    let dataset = target.dataset;
    let action = dataset.action;
    let index = dataset.index;
    let input = document.querySelector("#zipcode").value;


    if(action == "seven-day-forecast"){
      this.sevenDayForecast(input);
    } else if (action == "details") {
      this.renderDetails(index);
    } else if (action == "email") {
      this.sendWxMail();
    }
  }

  async sevenDayForecast(input){
    let googleGeoCodeApi = new GoogleGeocodeApi(this.gApiKey);
    let location = await googleGeoCodeApi.getLocation(input);
    let openWeatherApi = new OpenWeatherApi(this.wApiKey);
    this.forecast = await openWeatherApi.getSevenDayForecast(location.lat, location.lng);
    let vnode = <Forecast forecast={this.forecast} />;
    let node = View.createElement(vnode);
    let weatherList = document.getElementById('weatherList');
    weatherList.removeChild(weatherList.firstChild);
    weatherList.appendChild(node);
  }

  renderDetails(index) {
    let day = this.forecast[index];
    let vnode =  <WeatherDetail day={day} />;
    let node = View.createElement(vnode);
    console.log(node);
    let dayElem = document.getElementById("currentDay");
    dayElem.removeChild(dayElem.firstChild); 
    dayElem.appendChild(node);
  }


  async  WxMail(recipient, subject, body){
    let data = {
      recipient: recipient,
      subject: subject,
      body: body
    };
    if(this.emailUrl == null){
      throw new Error("You have to configure EMAIL_URL in .env");
    }
    let response = await fetch(this.emailUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let result = await response.text();
    console.log(result);
  }

  async sendWxMail(){
    let recipient = "mwpaulsen86@gmail.com";
    let subject = "This is the subject";
    let body = "this is the email body";

    await this.WxMail(recipient, subject, body);
  }
}

export default WeatherController;