var APIKey = "be76eca0bfdd1a9df0350d3a1c6cf97e";

/*** GeoCoding API variables ***/
var geoCodingURL = "http://api.openweathermap.org/geo/1.0/direct?";
var geoCodingRequestParams = {
  "appid": APIKey,
  "limit": "1"
};

/* Forecast API variables */
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?";
var forecastRequestParams = {
  "appid": APIKey,
  "units": "metric"
};

//this is used for API calls
var cityWithCoordinates = {
  "city": "",
  "longitude": "",
  "latitude": ""
};

//the weeklyWeather array stores the daily weather objects, which has the following structure:
// dailyWeather.date
// dailyWeather.temp
// dailyWeather.humidity
// dailyWeather.wind
// dailyWeather.weather
// dailyWeather.weatherDescription
// dailyWeather.weatherIcon
var weeklyWeather = [];



