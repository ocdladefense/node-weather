// Utility functions that work with google geocode api
import formatQueryString from "../lib-http/http.js";

//const regeneratorRuntime = require("regenerator-runtime");

// my api key - replace this with yours!
const apiKey = "AIzaSyBE9gS_ulRNi1TNaiv1OzwfgHe8I8UYsq8";

// url pattern for api call
const geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json";



// returns a promise of api data - see sample data above
export default async function(zipcode) {
   console.log("Zipcode being converted: " + zipcode);
   let params = {
      region: "us",
      address: zipcode,
      key: apiKey
   };


    let response = await fetch(geocodeUrl + "?" + formatQueryString(params));
    let data = await response.json();
    if(!response.ok) {
        throw new Error("API call failed.");
    }
    else if(response.ok) {
      if(data.results.length < 1 && data.error_message != null) {
         throw new Error(data.error_message);
      }
      else if(data.results.length < 1) {
         throw new Error("No coordinates found for the requested zipcode.");
      }
      return data;
   }
}

// sample api call
// https://maps.googleapis.com/maps/api/geocode/json?address=97405&region=us&key=AIzaSyC7QBEyXbpXf53jPvM4lXfgXEHD5caa61A

// sample response as json
/*
{
   "results" : [
      {
         "address_components" : [
            {
               "long_name" : "97405",
               "short_name" : "97405",
               "types" : [ "postal_code" ]
            },
            {
               "long_name" : "Eugene",
               "short_name" : "Eugene",
               "types" : [ "locality", "political" ]
            },
            {
               "long_name" : "Lane County",
               "short_name" : "Lane County",
               "types" : [ "administrative_area_level_2", "political" ]
            },
            {
               "long_name" : "Oregon",
               "short_name" : "OR",
               "types" : [ "administrative_area_level_1", "political" ]
            },
            {
               "long_name" : "United States",
               "short_name" : "US",
               "types" : [ "country", "political" ]
            }
         ],
         "formatted_address" : "Eugene, OR 97405, USA",
         "geometry" : {
            "bounds" : {
               "northeast" : {
                  "lat" : 44.040783,
                  "lng" : -122.941963
               },
               "southwest" : {
                  "lat" : 43.8140499,
                  "lng" : -123.3366001
               }
            },
            "location" : {
               "lat" : 43.9697922,
               "lng" : -123.2005853
            },
            "location_type" : "APPROXIMATE",
            "viewport" : {
               "northeast" : {
                  "lat" : 44.040783,
                  "lng" : -122.941963
               },
               "southwest" : {
                  "lat" : 43.8140499,
                  "lng" : -123.3366001
               }
            }
         },
         "place_id" : "ChIJfbVn2e4iwVQRFHAnUlfzC8Q",
         "types" : [ "postal_code" ]
      }
   ],
   "status" : "OK"
}
*/