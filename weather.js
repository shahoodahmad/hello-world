
var x = document.getElementById("notification");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
  else {
    x.innerHTML = "Geolocation not supported";
    ;
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
    if(error.PERMISSION_DENIED){}
      x.innerHTML = "Location access not granted <br> Allow location access to use the app"
    }
