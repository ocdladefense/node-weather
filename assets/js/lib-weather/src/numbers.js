export function minTemp(day){
    return Math.round(day.temp.min);
}

export function maxTemp(day){
    return Math.round(day.temp.max);
}

export function morningTemp(day){
    return Math.round(day.temp.morn);
  }
  
  export function dayTemp(day){
    return Math.round(day.temp.day);
  }
  
  export function eveningTemp(day){
    return Math.round(day.temp.eve);
  }
  
  export function windSpeed(day){
    return Math.round(day.wind_speed);
  }