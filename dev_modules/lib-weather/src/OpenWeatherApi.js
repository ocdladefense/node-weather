import formatQueryString from "../../lib-http/src/http.js";

// For more information,
//  see https://openweathermap.org/api

const OPEN_WEATHER_API_VERSION = '2.5';
// const OPEN_WEATHER_API_VERSION = '3.0';


// One Call API 3.0
const OPEN_WEATHER_API_ONE_CALL = "https://api.openweathermap.org/data/" + OPEN_WEATHER_API_VERSION + "/onecall";

// Historical weather data
// Example: https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={apiKey}
const OPEN_WEATHER_API_HISTORICAL = "https://api.openweathermap.org/data/" +OPEN_WEATHER_API_VERSION+"/onecall/timemachine";

// sample openweathermap api call
//https://api.openweathermap.org/data/2.5/onecall?lat=43.9698&lon=-123.2006&exclude=minutely,hourly,current&units=imperial&appid=3fca0a11ad63bd24761e381b964b5ae9

class OpenWeatherApi 
{

  static MAX_FORECAST_DAYS = 8;

  static DEFAULT_FORECAST_DAYS = 7;

    constructor(apiKey) {
        this.endPoint = OPEN_WEATHER_API_ONE_CALL;
        this.apiKey = apiKey;
    }

    async getDailyForecast(lat, lng, numDays) {
    //let city = await this.getCoordinates(zipcode);

    // console.log("city " , city);
    let params = {
      lat: lat, 
      lon: lng, 
      exclude: "minutely,hourly,current",
      units: "imperial",
      appid: this.apiKey
    };
    let DEFAULT_FORECAST_DAYS = 7; //It seems like the static DEFAULT_FORECAST_DAYS was not in scope here?
    numDays = numDays || DEFAULT_FORECAST_DAYS;
    
    return fetch(this.endPoint + "?" + formatQueryString(params))
    .then(response => response.json())
    .then(forecast => {
      let daily = forecast.daily;
      return daily.slice(0,DEFAULT_FORECAST_DAYS);
    });
  }
}

export default OpenWeatherApi;

