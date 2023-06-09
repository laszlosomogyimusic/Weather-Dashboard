var searchedCities = [];

function initVariables() {
  weeklyWeather = [];
 // searchedCities = [];
  $("#today").empty();
  $("#forecast").empty();
}

function saveSearchedCity() {
  searchedCities.push(cityWithCoordinates.city);

  console.log(searchedCities);

  var button = $("<button>")
  button.text(cityWithCoordinates.city).addClass("btn");

  $("#history").append(button);

  localStorage.setItem("weaterAppSearches",JSON.stringify(searchedCities));
}

function loadSearchedCities() {
  var savedSearches = JSON.parse(localStorage.getItem("weaterAppSearches"))

  if(savedSearches != null){
    searchedCities = savedSearches;
  }

  for(var i=0; i<searchedCities.length;i++){
      var button = $("<button>");
      button.text(searchedCities[i]).addClass("btn");

      $("#history").append(button);
  }
}

function generateTemperature(id, text) {
    var temperature = $("<p>");
    temperature.attr("id", "day-" + id + "-temp");
    temperature.text("Temp: " + text  + " ");
    temperature.append("<span>&#8451;</span>");

    return temperature;
}

function generateWind(id, text) {
  var wind = $("<p>");
  wind.attr("id", "day-" + id + "-wind");
  wind.text("Wind: " + text + " km/h");

  return wind;
}

function generateHumidity(id, text) {
  var humidity = $("<p>");
  humidity.attr("id", "day-" + id + "-humidity");
  humidity.text("Humidity: " + text + "%");

  return humidity;
}

function displayToday() {
  var today = $("#today");
  var header = $("<h3>");
  header.text(cityWithCoordinates.city + " " + moment(weeklyWeather[0].date).format("D/M/Y"));

  icon = $("<img>");
  icon.attr("src", "http://openweathermap.org/img/w/" + weeklyWeather[0].weatherIcon + ".png");
  header.append(icon);
  today.append(header);

  today.append(generateTemperature(0, weeklyWeather[0].temp));
  today.append(generateWind(0, weeklyWeather[0].wind));
  today.append(generateHumidity(0, weeklyWeather[0].humidity));
};



function displayForecast() {
  var forecast = $("#forecast");

  for(var i=1; i<weeklyWeather.length; i++) {
    var cardDiv = $("<div>");
    cardDiv.addClass("card");
    cardDiv.attr("id", "day-" + i);


    var header = $("<h3>");
    header.text(moment(weeklyWeather[i].date).format("D/M/Y"));

    icon = $("<img>");
    icon.attr("src", "http://openweathermap.org/img/w/" + weeklyWeather[i].weatherIcon + ".png");
    header.append(icon);


    cardDiv.append(header);
    cardDiv.append(generateTemperature(i, weeklyWeather[i].temp));
    cardDiv.append(generateWind(i, weeklyWeather[i].wind));
    cardDiv.append(generateHumidity(i, weeklyWeather[i].humidity));

    forecast.append(cardDiv);

  }
}

loadSearchedCities();

function doTheSearch() {

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
          displayForecast();
          saveSearchedCity();
      })
    })
    .then(function(){
      console.log("then then theeeeeeen");
    })
    .fail(function(f1Val, f2Val){
      console.log('fail!    f1, f2: ' + JSON.stringify([f1Val, f2Val]));
    });
};

// CLICK HANDLERS
// ==========================================================
$("#search-button").on("click", function(event) {
  event.preventDefault();

  initVariables();

  //see the structure in globalvariables
  cityWithCoordinates.city = $("#search-input").val().trim();
  doTheSearch();

});

