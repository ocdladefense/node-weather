/** @jsx vNode */
import {vNode} from "../../../node_modules/@ocdladefense/view/view.js";
import {getDate, getWeekday} from "../lib-date/src/dates.js";
import { Modal } from "../../../dev_modules/node-modal/dist/modal.js";


const Forecast = function(props){
  let forecast = props.forecast;
  let iconUrl = "http://openweathermap.org/img/wn/";
  let html = forecast.map((forecastDay, index) => {return <ForecastDay day={forecastDay} index={index} url={iconUrl} size="medium" />;});
    return (
      <div class="weather-list flex-parent">
          {html}
      </div>
    )
  };
  
  const ForecastDay = function(props){
    let day = props.day;
    let index = props.index;
    let theDate = getDate(day.dt);
    let url = props.url;
    let size = props.size
    let report = day.weather[0]; // The weather report; like you'd hear on the radio.

    let sizeObject = {
      small: ".png",
      medium: "@2x.png",
      large: "@4x.png"
    };
    let iconUrl = url + report.icon + sizeObject[size];
 
    return (
        <div class="weather-list-item" data-action="details" data-index={index}>
            {(theDate.getMonth() + 1) + "/" + theDate.getDate()}<br />
            <img src={iconUrl} data-action="details" data-index={index} /> <br />
            {getWeekday(theDate)}<br />
            {Math.round(day.temp.min) + " | " + Math.round(day.temp.max)}<br />
            {/* <button data-action="email" data-index={index} >Email Forecast</button> */}
        </div>
    )
};

const ForecastDayDetail = function(props) {
    let day = props.day;
    let url = props.url;
    let size = props.size
    let report = day.weather[0]; // The weather report; like you'd hear on the radio.
    let temp = day.temp;
    let sizeObject = {
      small: ".png",
      medium: "@2x.png",
      large: "@4x.png"
    };
    let iconUrl = url + report.icon + sizeObject[size];
  
    const foobar = (
        <div class="details">
            <img src={iconUrl} />
            {report.description}<br />
            {"Morning Temperature: " + temp.morn}<br />
            {"Day Temperature: " + temp.day}<br />
            {"Evening Temperature:  " + temp.eve}<br />
            {"Wind Speed: " + day.wind_speed}<br />
            {"Humidity: " + day.humidity}
        </div>
    )
    console.log(foobar);
    return foobar;
  };

const EmailDraft = function(props){
  let content = props.content;
  return (
    <div class="text-center m-2 p-4">
        <form>
          <label for="recipient">Send to: </label>
          <input type="text" id="recipient" name="recipient" />
          <br />
          <label for="subject" >Subject: </label>
          <input type="text" id="subject" name="subject" />
          <br />
          <button type="submit" data-action="send-forecast">Send Forecast</button>
        </form>
          <div id="body">
            {content}
          </div>
      </div>
  )

};




export {ForecastDayDetail, Forecast, ForecastDay, EmailDraft};