/** @jsx vNode */
import {vNode} from "../../../node_modules/@ocdladefense/view/view.js";
import {FriendlyDate} from "../lib-date/src/FriendlyDate.js";
import {DayForecast} from "../lib-weather/src/DayForecast.js";



const Forecast = function(props){
  let forecast = props.forecast;

  let html = forecast.map((forecastDay, index) => {return <DayForecast day={forecastDay} index={index}  icon-size="medium" details={false} />;});
    return (
      <div class="weather-list flex-parent">
          {html}
      </div>
    )
  };



const DayForecast = function (props) {
  let day = new DayForecast(props.day);
  let theDate = FriendlyDate.newFromUnixTimestamp(day.getTimestamp());
  let index = props.index;
    // Whether to display additional details for the day's forecast.
  let details = props.details;
  let size = props.size;

  return details ? <ForecastDayDetail day={day} date={theDate} index={index} /> : <ForecastDaySimple day={day} date={theDate} index={index} />;
}


  
  const ForecastDaySimple = function(props){

    let day = props.day;
    let theDate = props.date;
    let report = day.getWeatherReport();
 
    return (
        <div class="weather-list-item" data-action="details" data-index={index}>
            {theDate.monthNumber() + "/" + theDate.dayOfMonth()}<br />
            <ForecastIcon icon={report.icon} size="medium" index={index} />
            {theDate.dayOfWeek()}<br />
            {day.getLowTemp() + " | " + day.getHighTemp()}<br />
        </div>
    )
};

const ForecastDayDetail = function(props) {
  let day = props.day;
  let theDate = props.date;
  let description = day.getWeatherReport();
  let icon = day.getIcon();

    const foobar = (
        <div class="details">
            <div class="text-center">
              <h3>{theDate.dayOfWeek()}</h3>
              <b>{description}</b><br />
            <ForecastIcon icon={icon} size="large" index={index} />
            </div>
            {"Morning Temperature: " + day.morningTemp()}<br />
            {"Afternoon Temperature: " + day.afternoonTemp()}<br />
            {"Evening Temperature:  " + day.eveningTemp()}<br />
            {"Wind Speed: " + day.windSpeed()}<br />
            {"Humidity: " + day.humidity()}
        </div>
    )
    console.log(foobar);
    return foobar;
  };


  const ForecastIcon = function(props) {
    let url = "http://openweathermap.org/img/wn";
    let icon = props.icon;
    let size = props.size;
    let index = props.index;

    const sizeObject = {
      small: "",
      medium: "@2x",
      large: "@4x"
    };

    function getImageFilename(icon, size) {
      return icon + sizeObject[size] + ".png";
  }

    let iconUrl = url + "/" + getImageFilename(icon,size);
    
    return (
      <span>
        <img src={iconUrl} data-action="show-details" data-index={index} />
      </span>
    )
  };








export {ForecastDayDetail, Forecast, ForecastDaySimple, ForecastDayDetail};