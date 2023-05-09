//gets the longitude and latitude for the given city name
function callGeoCodingAPI(cityName) {
  geoCodingRequestParams.q = cityName;
  var fullURL = geoCodingURL + $.param(geoCodingRequestParams);
  console.log(fullURL);

  return $.ajax({
    url: fullURL,
    method: "GET"
  });//.then(parseGeoCodingResponse);
}

function parseGeoCodingResponse(geoCodingResponse) {
  cityWithCoordinates.latitude = geoCodingResponse[0].lat;
  cityWithCoordinates.longitude = geoCodingResponse[0].lon;

  //we have to call the second API from here, to make sure it is being called in order
  //callForecastAPI();
}


function callForecastAPI() {
  forecastRequestParams.lat = cityWithCoordinates.latitude;
  forecastRequestParams.lon = cityWithCoordinates.longitude;

  var fullURL = forecastURL + $.param(forecastRequestParams);
  console.log(fullURL);

  return $.ajax({
    url: fullURL,
    method: "GET"
  });//.then(parseForecastResponse);
}

function parseForecastResponse(forecastResponse) {
  for(var i=0; i<=forecastResponse.list.length; i=i+8) {
    //this is a trick to get the 5th day's forecast
    if(i===forecastResponse.list.length) {
      i--;
    }
    var dailyWeather = {};
    dailyWeather.date = forecastResponse.list[i].dt_txt;
    dailyWeather.temp = forecastResponse.list[i].main.temp;
    dailyWeather.humidity = forecastResponse.list[i].main.humidity;
    dailyWeather.wind = forecastResponse.list[i].wind.speed;
    dailyWeather.weather = forecastResponse.list[i].weather[0].main;
    dailyWeather.weatherDescription = forecastResponse.list[i].weather[0].description;
    dailyWeather.weatherIcon = forecastResponse.list[i].weather[0].icon;
    weeklyWeather.push(dailyWeather);
  }
}