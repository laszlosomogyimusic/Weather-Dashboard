// CLICK HANDLERS
// ==========================================================
$("#search-button").on("click", function(event) {
  event.preventDefault();

  //see the structure in globalvariables
  cityWithCoordinates.city = $("#search-input").val().trim();
  
  //call this back end function
  callGeoCodingAPI(cityWithCoordinates.city);
});

