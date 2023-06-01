//import { getDate } from "../../lib-date/src/dates";

export default DayForecast;


class DayForecast
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


    getIcon() {


    }
    getTimestamp() {
        return this.day.dt;
    }

    // has at least .description and .icon
    getWeatherReport() {
        return this.day.weather[0];
    }

    getLowTemp(units) {
        return Math.round(this.day.temp.min);
    }

    getHighTemp() {
        return Math.round(this.day.temp.max);
    }

    getMorningTemp() {

    }

    getAfternoonTemp() {

    }


    getEveningTemp() {

    }

    static newFromUnits(metric, imperial, kelvin) {
        
    }

}

