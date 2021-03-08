 document.getElementById("form").addEventListener("submit",(e)=>{
    const proxy = "https://cors-anywhere.herokuapp.com/"
    var country = document.getElementById("country").value;
    var api = `https://api.covid19api.com/live/country/${country}` 
    covidData(api)
    e.preventDefault()
})

// Handling CORS Policy
function cors() {
  var cors_api_host = 'cors-anywhere.herokuapp.com';
  var cors_api_url = 'https://' + cors_api_host + '/';
  var slice = [].slice;
  var origin = window.location.protocol + '//' + window.location.host;
  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
      var args = slice.call(arguments);
      var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
      if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
          targetOrigin[1] !== cors_api_host) {
          args[1] = cors_api_url + args[1];
      }
      return open.apply(this, args);
  };
} 
// Calling CORS function
cors();

// Fetch data from api and display
 async function covidData(api){
  var headers = new Headers();
  headers.append('Accept', 'application/json');
  var response = await fetch(api,headers)

  var data = await response.json();

   
  //  catch(error){
  //    console.log("This is the " + error)
  //  }

   
   var length = data.length;
   var index = length -1;

   var confirmed = document.querySelector("#confirmed");
   var recovered = document.querySelector("#recovered");
   var deaths = document.querySelector("#deaths");
   var notifs = document.querySelector(".notifs");

   confirmed.innerHTML = (" Confirmed Cases: "  + data[index].Confirmed)
   recovered.innerHTML = (" Recovered Cases: "  + data[index].Recovered)
   deaths.innerHTML = ("Total Deaths: " + data[index].Deaths)
   var country = document.getElementById("country").value;
   notifs.innerHTML =   "Search results for " + country;

}


