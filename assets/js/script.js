var cityWithCoordinates = {
  "city": "",
  "longitude": "",
  "latitude": ""
};

var APIKey = "be76eca0bfdd1a9df0350d3a1c6cf97e";

/*** GeoCoding API variables ***/
var geoCodingURL = "http://api.openweathermap.org/geo/1.0/direct?";
var geoCodingRequestParams = {
  "limit": "1",
  "appid": APIKey
};

function buildGeoCodingURL(cityName) {
  geoCodingRequestParams.q = cityName;
  return geoCodingURL + $.param(geoCodingRequestParams);
}

function callGeoCodingAPI(fullURL) {
  console.log(fullURL);

  $.ajax({
    url: fullURL,
    method: "GET"
  }).then(displayLocation);
}

function displayLocation(geoCodingData) {

  console.log(geoCodingData[0]);
  cityWithCoordinates.city = geoCodingData[0].name;
  cityWithCoordinates.latitude = geoCodingData[0].lat;
  cityWithCoordinates.longitude = geoCodingData[0].lon;

  console.log(cityWithCoordinates);
}


// CLICK HANDLERS
// ==========================================================
$("#search-button").on("click", function(event) {
  event.preventDefault();

  var cityName = $("#search-input").val().trim();

  var queryURL = buildGeoCodingURL(cityName);
  callGeoCodingAPI(queryURL);
});

