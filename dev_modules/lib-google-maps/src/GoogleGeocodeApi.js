// Utility functions that work with google geocode api
import formatQueryString from "../../lib-http/src/http.js";

//const regeneratorRuntime = require("regenerator-runtime");

// // my api key - replace this with yours!
// const apiKey = "AIzaSyBE9gS_ulRNi1TNaiv1OzwfgHe8I8UYsq8";

// // url pattern for api call
// const geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json";


//CONVERT TO A CLASS
//CONSTRUCTOR CAN TAKE API KEY
class GoogleGeocodeApi
{
   constructor(apiKey) {
      this.endPoint = "https://maps.googleapis.com/maps/api/geocode/json";
      this.apiKey = apiKey;
   }


// returns a promise of api data - see sample data above
async getLocation(location) {
   let params = {};
   // If the location is not a number, refer to 
   if(isNaN(location)) {
      params = {
         address: location,
         components: "US",
         key: this.apiKey
      }
   } else {
      params = {
         region: "us",
         address: location,
         key: this.apiKey
      };
    }
   // let params = {
   //    region: "us",
   //    address: zipcode,
   //    key: apiKey
   // };

   //console.log(geocodeUrl + "?" + formatQueryString(params));
    let response = await fetch(this.endPoint + "?" + formatQueryString(params));
    if(!response.ok) {
      throw new Error("API call failed.");
   }
    let data = await response.json();
    
   if(data.results.length < 1 && data.error_message != null) {
      throw new Error(data.error_message);
   }
   else if(data.results.length < 1) {
      throw new Error("No coordinates found for the requested location.");
   }
   let city = {};

   let name = data.results[0].address_components[1].long_name;
   let lat = data.results[0].geometry.location.lat;
   let lng = data.results[0].geometry.location.lng;

   city.name = name;
   city.lat = lat;
   city.lng = lng;

   return city;
}

}

export default GoogleGeocodeApi;