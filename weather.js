// access all the elements to be formatted
let notification = document.getElementById("notification");
let descPic = document.getElementById("descriptive-picture");
let temp = document.getElementById("temperature");
let weatherDesc = document.getElementById("weather-description");
let CountryCity = document.getElementById("Country-City");

// use the html geolocator api to find the user's location
function getCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
  else {
    notification.innerHTML = "Geolocation not supported";
  }
}

// if access allowed, store the position and call the weather api function
function showPosition(position) {
  notification.innerHTML = "Location found";
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

// if location blocked, display a notification
function showError(error) {
    if(error.PERMISSION_DENIED){
      notification.innerHTML = "Location access not granted <br> Reload the page or reset your location settings <br> to give location access and use the app";
    }
  }

// create a weather object to store the api information
var weather = {};

// set temperature unit to celcius (default)
weather.temperature = {
  unit = "celcius"
}

// weather api call function
function getWeather(latitude, longitude){
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=09ca28f467aa94c207b9ce9c95473bc9`;

      fetch(api)
          .then(function(response){
              let data = response.json();
              return data;
          })
          .then(function(data){
              weather.temperature.value = Math.floor(data.main.temp - 273);
              weather.description = data.weather[0].description;
              weather.iconId = data.weather[0].icon;
              weather.city = data.name;
              weather.country = data.sys.country;
          })
          .then(function(){
              outputWeather();
          });
  }
}

// outputWeather function of chage the html
function outputWeather(){
    notification.innerHTML = "Click the temperature unit to convert to another unit";
    descPic.innerHTML = `<img src="images/icons/${weather.iconId}.png"/>`;
    temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weatherDesc.innerHTML = weather.description;
    CountryCity.innerHTML = `${weather.city}, ${weather.country}`;
}
