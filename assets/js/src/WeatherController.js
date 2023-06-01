/** @jsx vNode */
import {vNode,View} from "../../../node_modules/@ocdladefense/view/view.js";
import {Forecast, ForecastDayDetail, EmailDraft} from "./Components.js";
import GoogleGeocodeApi from "../lib-google-maps/src/GoogleGeocodeApi.js";
import OpenWeatherApi from "../lib-weather/src/OpenWeatherApi.js";
<<<<<<< Updated upstream
import { Modal, ModalComponent } from "../../../dev_modules/node-modal/dist/modal.js";
import DayForecast from "../lib-weather/src/DayForecast.js";
=======
import { Modal } from "../../../node_modules/@ocdladefense/node-modal/dist/modal.js";
>>>>>>> Stashed changes

window.EmailDraft = EmailDraft;
window.View = View;


class WeatherController
{
  constructor() {
    this.gApiKey = process.env.GEOCODE_API_KEY;
    this.wApiKey = process.env.WEATHERMAP_API_KEY;
    this.emailUrl = process.env.EMAIL_URL;
  }

  async handleEvent(e){
    let target = e.target;
    let dataset = target.dataset;
    let action = dataset.action;
    let actionArray = ["seven-day-forecast", "details", "preview-forecast", "send-forecast"];
    if (!actionArray.includes(action)){
      return false;
    }
    e.preventDefault();
    console.log(e.type);
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

  async sevenDayForecast(input, numDays) {
    let geo = new GoogleGeocodeApi(this.gApiKey);
    let location = await geo.getLocation(input);

    let api = new OpenWeatherApi(this.wApiKey);
    this.forecast = await api.getForecast(location.lat, location.lng);

    


    let vnode = <Forecast forecast={this.forecast} />;
    let node = View.createElement(vnode);
    // node.classList.add("weather-list");
    // node.classList.add("flex-parent");
    let forcastContainer = document.getElementById('weatherList');
    forcastContainer.appendChild(node);
  }

  renderDetails(index) {
    let day = this.forecast[index];
    let iconUrl = "http://openweathermap.org/img/wn/";
    let vnode =  <ForecastDayDetail day={day} url={iconUrl} size="large"/>;
    let node = View.createElement(vnode);
    console.log(node);
    let dayElem = document.getElementById("currentDay");
    dayElem.removeChild(dayElem.firstChild); 
    dayElem.appendChild(node);
  }

  renderModal(){
    let vnode = <Forecast forecast={this.forecast} />;

    let email = <EmailDraft content={vnode} />;

    modal.render(email);
    modal.show();
  }

  async sendForecast(){
    let weatherList = document.getElementById("weatherList");    
    let content = weatherList.innerHTML;
    let recipient = document.getElementById("recipient").value;
    let subject = document.getElementById("subject").value ||"Hahaha it's still raining in Oregon";
    console.log("Content was: " + content);
    await this.WxMail(recipient, subject, content);
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