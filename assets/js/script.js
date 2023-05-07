function initVariables() {
  weeklyWeather = [];
  $("#today").empty();
}

function displayToday() {
  var today = $("#today");
  today.append(weeklyWeather[0].date);
  icon = $("<img>");
  icon.attr("src", "http://openweathermap.org/img/w/" + weeklyWeather[0].weatherIcon + ".png");
  today.append(icon);
  var temperature = $("<p>");
  temperature.addClass("today-temp");
  temperature.text("Temp: " + weeklyWeather[0].temp + " ");
  temperature.append("<span>&#8451;</span>");

  var wind = $("<p>");
  wind.addClass("today-wind");
  wind.text("Wind: " + weeklyWeather[0].wind + " km/h");

  var humidity = $("<p>");
  humidity.addClass("today-humidity");
  humidity.text("Humidity: " + weeklyWeather[0].humidity + "%");


  today.append(temperature);
  today.append(wind);
  today.append(humidity);

};


// CLICK HANDLERS
// ==========================================================
$("#search-button").on("click", function(event) {
  event.preventDefault();

  initVariables();

  //see the structure in globalvariables
  cityWithCoordinates.city = $("#search-input").val().trim();
  

  $.when(
    callGeoCodingAPI(cityWithCoordinates.city)
    )
    .done(function(geoCodingResponse){
      parseGeoCodingResponse(geoCodingResponse);
      $.when(
        callForecastAPI()
        )
        .done(function(forecastResponse) {
          parseForecastResponse(forecastResponse);
          displayToday();
      })
    })
    .then(function(){
      console.log("then then theeeeeeen");
    })
    .fail(function(f1Val, f2Val){
      console.log('fail!    f1, f2: ' + JSON.stringify([f1Val, f2Val]));
    });

});

