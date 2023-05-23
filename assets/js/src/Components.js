/** @jsx vNode */
import {vNode} from "../../../node_modules/@ocdladefense/view/view.js";
import {getDate, getWeekday} from "../lib-date/src/dates.js";

const WeatherDetail = function(props) {
    let day = props.day;
    let report = day.weather[0]; // The weather report; like you'd hear on the radio.
    let temp = day.temp;
    let iconUrl = `http://openweathermap.org/img/wn/${report.icon}.png`;
  
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

const Forecast = function(props){
    let forecast = props.forecast;
    let html = forecast.map((forecastDay, index) => {return <ForecastDay day={forecastDay} index={index} />;});
    return (
        <div>
            {html}
        </div>
    )
};

const ForecastDay = function(props){
    let day = props.day;
    let index = props.index;
    let theDate = getDate(day.dt);
 
    const foobar = (
        <div class="weather-list-item" data-action="details" data-index={index}>
            {(theDate.getMonth() + 1) + "/" + theDate.getDate()}<br />
            {getWeekday(theDate)}<br />
            {day.temp.min + " | " + day.temp.max}<br />
            <button data-action="email" data-index={index} >Email Forecast</button>
        </div>
    )
    return foobar;
};

const EmailDraft = function(props){
  
};




export {WeatherDetail, Forecast, ForecastDay, EmailDraft};