$(document).ready(function() {
  const cities = JSON.parse(window.localStorage.getItem("history"))||[]; 
  console.log (cities)

  for (var x = 0; x < cities.length; x++) {
    var city = $("<p>").addClass("city").text(cities[x]);
    $('#saveHistory').append(city)
  }
//On click for 
$('#search-button').on("click", function () {

var searchValue = $("#search-value").val();

  // Get API  & API Key
  var queryURL =  "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&APPID=5d32c3c46f4249ead84cbc22d3498938";
 
  
  $.ajax({
    type: "GET",
    url: queryURL,
    dataType: "json",
    success: function(data) {
      // create history link for this search
     console.log(data);
   // create history link for this search
  //  if (history.indexOf(searchValue) === -1) {
  //   history.push(searchValue);
    cities.push(data.name)
    window.localStorage.setItem("history", JSON.stringify(cities)); 

  //   makeRow(searchValue);
  // }
      
      // clear any old content
      $("#today").empty();

      // create html content for current weather

     
     var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
      var card = $("<div>").addClass("card");
      var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
      var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
      var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
      var cardBody = $("<div>").addClass("card-body");
      var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

      // merge and add to page
      title.append(img);
      cardBody.append(title, temp, humid, wind);
      card.append(cardBody);
      $("#today").append(card);

      // call follow-up api endpoints
      getForecast(searchValue);
      getUVIndex(data.coord.lat, data.coord.lon);
    }
  });
 /* $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);
      var searchResponse = response.data.citySearchResponse;

      var usersSearch = $("<div>");

      userSearch.attr('id', searchResponse);


      // Preprepending 
      //$("citySearchResponse").prepend(Search Result);


    })*/

})

function getForecast(searchValue) {
  $.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=5d32c3c46f4249ead84cbc22d3498938&units=imperial",
    dataType: "json",
    success: function(data) {
      // overwrite any existing content with title and empty row
      $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

      // loop over all forecasts (by 3-hour increments)
      for (var i = 0; i < data.list.length; i++) {
        // only look at forecasts around 3:00pm
        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          // create html elements for a bootstrap card
          var col = $("<div>").addClass("col-md-2");
          var card = $("<div>").addClass("card bg-primary text-white");
          var body = $("<div>").addClass("card-body p-2");

          var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());

          var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");

          var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
          var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");

          // merge together and put on page
          col.append(card.append(body.append(title, img, p1, p2)));
          $("#forecast .row").append(col);
        }
      }
    }
  });
}

function getUVIndex(lat, lon) {
  $.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/uvi?appid=5d32c3c46f4249ead84cbc22d3498938&lat=" + lat + "&lon=" + lon,
    dataType: "json",
    success: function(data) {
      var uv = $("<p>").text("UV Index: ");
      var btn = $("<span>").addClass("btn btn-sm").text(data.value);
      
      // change color depending on uv value
      if (data.value < 3) {
        btn.addClass("btn-success");
      }
      else if (data.value < 7) {
        btn.addClass("btn-warning");
      }
      else {
        btn.addClass("btn-danger");
      }
      
      $("#today .card-body").append(uv.append(btn));
    }
  });
}

// get current history, if any
var history = JSON.parse(window.localStorage.getItem("history")) || [];

/* if (history.length > 0) {
  searchWeather(history[history.length-1]);
}

for (var i = 0; i < history.length; i++) {
  makeRow(history[i]);
}
*/

});
