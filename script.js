var lat;
var lon;

//jQuery get request to weather api
var weatherAPI = 'https://fcc-weather-api.glitch.me/api/current';

$(document).ready(function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      lat = 'lat=' + position.coords.latitude;
      lon = 'lon=' + position.coords.longitude;
      weatherAPI += '?' + lat + '&' + lon;
      getWeather();
    });
  } else {
    $('.display').html('<p>Geolocation not supported.</p>')
  }
});

function getWeather(){
  $.ajax({
    url: weatherAPI,
    type: "GET",
    success: function(result){
      var displayHTML = '<p><span class=\'icon\'>'
      var weatherDesc= result.weather[0].description
      if(weatherDesc.includes('cloud')){
        displayHTML += '<i class=\"fas fa-cloud\"></i></span>'
      } else if (weatherDesc.includes('rain')){
        displayHTML += '<i class=\"fas fa-tint\"></i></span>'
      } else if (weatherDesc.includes('sun') || weatherDesc.includes('clear') ){
        displayHTML += '<i class=\"fas fa-sun\"></i></span>'
      } else if(weatherDesc.includes('snow')){
        displayHTML += '<i class=\"fas fa-snowflake\"></i></span>'
      } else{
        displayHTML += '<i class=\"fas fa-times\"></i></span>'
      }
      displayHTML += '<p>The weather will be ';
      displayHTML += result.weather[0].description;
      displayHTML += ' and the temperature is ';
      displayHTML += 9/5 + result.main.temp + 32;
      displayHTML += ' degrees Farenheight.</p>'
      $('.display').html(displayHTML);
    }
  });
}
