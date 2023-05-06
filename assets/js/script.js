var APIKey = "be76eca0bfdd1a9df0350d3a1c6cf97e";

/*** GeoCoding API variables ***/
var geoCodingURL = "http://api.openweathermap.org/geo/1.0/direct?";
var geoCodingRequestParams = {
  "appid": APIKey,
  "limit": "1"
};

/* Current Weather API variables */
var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?";
var currentWeatherRequestParams = {
  "appid": APIKey,
  "units": "metric"
};

/* Forecast API variables */
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?";
var forecastRequestParams = {
  "appid": APIKey,
  "units": "metric"
};


var cityWithCoordinates = {
  "city": "",
  "longitude": "",
  "latitude": ""
};



function callGeoCodingAPI(cityName) {
  geoCodingRequestParams.q = cityName;
  var fullURL = geoCodingURL + $.param(geoCodingRequestParams);
  console.log(fullURL);

  $.ajax({
    url: fullURL,
    method: "GET"
  }).then(parseGeoCodingResponse);
}

function parseGeoCodingResponse(geoCodingResponse) {

  console.log(geoCodingResponse[0]);
  cityWithCoordinates.city = geoCodingResponse[0].name;
  cityWithCoordinates.latitude = geoCodingResponse[0].lat;
  cityWithCoordinates.longitude = geoCodingResponse[0].lon;


  //we have to call the second API from here, to make sure it is being called in order
  callCurrentWeatherAPI();
}


function callCurrentWeatherAPI() {

  currentWeatherRequestParams.lat = cityWithCoordinates.latitude;
  currentWeatherRequestParams.lon = cityWithCoordinates.longitude;

  var fullURL = currentWeatherURL + $.param(currentWeatherRequestParams);
  console.log(fullURL);

  $.ajax({
    url: fullURL,
    method: "GET"
  }).then(parseCurrentWeatherResponse);
}

function parseCurrentWeatherResponse(currentWeatherResponse) {

  console.log("parseCurrentWeatherResponse")
  console.log(currentWeatherResponse);

  //we have to call the third API from here, to make sure it is being called in order
  callForecastAPI();

}


function callForecastAPI() {

  forecastRequestParams.lat = cityWithCoordinates.latitude;
  forecastRequestParams.lon = cityWithCoordinates.longitude;

  var fullURL = forecastURL + $.param(forecastRequestParams);
  console.log(fullURL);

  $.ajax({
    url: fullURL,
    method: "GET"
  }).then(parseForecastResponse);
}

function parseForecastResponse(forecastResponse) {

  console.log(forecastResponse);
}



// CLICK HANDLERS
// ==========================================================
$("#search-button").on("click", function(event) {
  event.preventDefault();

  var cityName = $("#search-input").val().trim();
  callGeoCodingAPI(cityName);
});

