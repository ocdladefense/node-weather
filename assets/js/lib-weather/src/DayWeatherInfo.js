//import { getDate } from "../../lib-date/src/dates";




class DayWeatherInfo
{
    constructor(day) {
        this.day = day;


        /*
        this.minTemp = Math.round(day.temp.min);
        this.maxTemp = Math.round(day.temp.max);
        this.morningTemp = Math.round(day.temp.morn);
        this.dayTemp = Math.round(day.temp.day);
        this.eveningTemp = Math.round(day.temp.eve);
        this.windSpeed = Math.round(day.wind_speed);
        */
    }


    icon() {
        return this.day.weather[0].icon;
    }
    timestamp() {
        return this.day.dt;
    }

    // has at least .description and .icon
    weatherReport() {
        return this.day.weather[0];
    }

    lowTemp(units) {
        return Math.round(this.day.temp.min);
    }

    highTemp() {
        return Math.round(this.day.temp.max);
    }

    morningTemp() {
        return Math.round(this.day.temp.morn);
    }

    afternoonTemp() {
        return Math.round(this.day.temp.day);
    }


    eveningTemp() {
        return Math.round(this.day.temp.eve);
    }

    windSpeed(){
        return  Math.round(this.day.wind_speed);
    }
    humidity(){
        return this.day.humidity;
    }
    static newFromUnits(metric, imperial, kelvin) {
        
    }

}

export default DayWeatherInfo;