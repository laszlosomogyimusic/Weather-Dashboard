// CLICK HANDLERS
// ==========================================================
$("#search-button").on("click", function(event) {
  event.preventDefault();

  cityWithCoordinates.city = $("#search-input").val().trim();
  callGeoCodingAPI(cityWithCoordinates.city);
  //callAPIs();
  //callGeoCodingAPI(cityName).then(callCurrentWeatherAPI).then(callForecastAPI);
});

