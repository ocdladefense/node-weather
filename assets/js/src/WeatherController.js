/** @jsx vNode */
import {vNode,View} from "../../../node_modules/@ocdladefense/view/view.js";
import {Forecast, WeatherDetail, EmailDraft} from "./Components.js";
import GoogleGeocodeApi from "../lib-google-maps/src/GoogleGeocodeApi.js";
import OpenWeatherApi from "../lib-weather/src/OpenWeatherApi.js";
import { Modal, ModalComponent } from "../../../dev_modules/node-modal/dist/modal.js";

window.EmailDraft = EmailDraft;
window.View = View;
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
    console.log(e.type);
    let target = e.target;
    let dataset = target.dataset;
    let action = dataset.action;
    let index = dataset.index; //Only applicable when showing weather details for given day.
    let input = document.querySelector("#user-input").value;


    if(action == "seven-day-forecast"){
      this.sevenDayForecast(input);
    } else if (action == "details") {
      this.renderDetails(index);
    } else if (action == "preview-forecast") {
      console.log("Email button clicked!");
      this.renderModal();
    } else if (action == "send-forecast"){
      console.log("Send forecast clicked");
      this.sendForecast();
    }

  }

  async sevenDayForecast(input){
    let googleGeoCodeApi = new GoogleGeocodeApi(this.gApiKey);
    let location = await googleGeoCodeApi.getLocation(input);

    let openWeatherApi = new OpenWeatherApi(this.wApiKey);
    this.forecast = await openWeatherApi.getSevenDayForecast(location.lat, location.lng);

    let vnode = <Forecast forecast={this.forecast} />;
    let node = View.createElement(vnode);
    // node.classList.add("weather-list");
    // node.classList.add("flex-parent");
    let forcastContainer = document.getElementById('weatherList');
    forcastContainer.appendChild(node);

    // let emailContainer = document.getElementById("emailFormContainer");
    // let emailButton = document.createElement("button");
    // emailButton.innerHTML = "Email Forecast";
    // emailButton.setAttribute("data-action", "email");
    // emailContainer.appendChild(emailButton);
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

  renderModal(){
    let vnode = <Forecast forecast={this.forecast} />;

    let email = <EmailDraft content={vnode} />;
    let node = View.createElement(email);
    document.body.appendChild(node);
  }

  async sendForecast(){
    let weatherList = document.getElementById("weatherList");    
    let content = weatherList.innerHTML;
    console.log("Content was: " + content);
    await this.WxMail("mwpaulsen86@gmail.com", "Test wx mail", content);
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