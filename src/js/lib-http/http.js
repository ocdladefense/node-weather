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