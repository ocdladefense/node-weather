// Takes an object(obj) as input, which contains key value pairs(kvp).
// Creates empty array 'params'.
// Iterates over each property(prop) in the object using a for in loop.
// Inside the looop it constructs a key value pair string by concatenating the key name, an equal sign, and the value.
// Pushes the string into the params array.
// Joins kvp's together using '&'.

function formatQueryString(obj){
    let params = [];
    for (let prop in obj){
      let kvp;
      kvp = prop + "=" + obj[prop]; 
      params.push(kvp);
    };
    return params.join("&");
  }
  
  export default formatQueryString;