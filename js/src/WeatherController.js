/** @jsx vNode */
import {vNode,View} from "../../../node_modules/@ocdladefense/view/view.js";
import {Forecast, DayForecast} from "./Components.js";
import GoogleGeocodeApi from "../lib-google-maps/src/GoogleGeocodeApi.js";
import OpenWeatherApi from "../lib-weather/src/OpenWeatherApi.js";
import Mailer from "../lib-mail/dist/Mail.js"
import DayWeatherInfo from "../lib-weather/src/DayWeatherInfo.js";
import { EmailDraft } from "../lib-mail/dist/Components.js";

window.EmailDraft = EmailDraft;
window.View = View;


class WeatherController
{
  constructor() {
    this.gApiKey = process.env.GEOCODE_API_KEY;
    this.wApiKey = process.env.WEATHERMAP_API_KEY;
    
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
    this.forecast = await api.getDailyForecast(location.lat, location.lng);

    let vnode = <Forecast forecast={this.forecast} />;
    let node = View.createElement(vnode);
    let forcastContainer = document.getElementById('weatherList');
    forcastContainer.appendChild(node);
  }

  renderDetails(index) {
    let day = this.forecast[index];
    let vnode = <DayForecast day={day} details={true} index={index} />
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
    let mailer = new Mailer();
    let weatherList = document.getElementById("weatherList");    
    let content = weatherList.innerHTML;
    let recipient = document.getElementById("recipient").value;
    let subject = document.getElementById("subject").value ||"Hahaha it's still raining in Oregon";
    console.log("Content was: " + content);
    await mailer.WxMail(recipient, subject, content);
  }

  // async sendForecast(){
  //   let weatherList = document.getElementById("weatherList");    
  //   let content = weatherList.innerHTML;
  //   let recipient = document.getElementById("recipient").value;
  //   let subject = document.getElementById("subject").value ||"Hahaha it's still raining in Oregon";
  //   console.log("Content was: " + content);
  //   await this.WxMail(recipient, subject, content);
  // }


}

export default WeatherController;