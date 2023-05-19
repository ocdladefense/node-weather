import formatQueryString from "../../lib-http/src/http.js";

class OpenWeatherApi 
{
    constructor(apiKey) {
        this.endPoint = "https://api.openweathermap.org/data/2.5/onecall";
        this.apiKey = apiKey;
    }

    async getSevenDayForecast(lat, lng){
    //let city = await this.getCoordinates(zipcode);

    // console.log("city " , city);
    let params = {
      lat: lat, 
      lon: lng, 
      exclude: "minutely,hourly,current",
      units: "imperial",
      appid: this.apiKey
    };
    console.log(this.endPoint + "?" + formatQueryString(params));
    return fetch(this.endPoint + "?" + formatQueryString(params))
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
}

export default OpenWeatherApi;