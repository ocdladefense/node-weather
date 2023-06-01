//import { getDate } from "../../lib-date/src/dates";

class DayForecast
{
    constructor(day){
        this.dateTime = getDate(day.dt);
        this.monthNumber = this.dateTime.getMonth() + 1;
        this.dayOfMonth = this.dateTime.getDate();
        this.minTemp = Math.round(day.temp.min);
        this.maxTemp = Math.round(day.temp.max);
        this.morningTemp = Math.round(day.temp.morn);
        this.dayTemp = Math.round(day.temp.day);
        this.eveningTemp = Math.round(day.temp.eve);
        this.windSpeed = Math.round(day.wind_speed);
    }
}

export default DayForecast;