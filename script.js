

//On click for 
$('#search-city').on("click", function () {

var searchValue = $("#search-city").val();

  // Get API  & API Key
  var queryURL =  "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&APPID=924064a95edd0c1c942e4fa79c7d8039";


  //Ajax GET request to our queryURL 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);
      var searchResponse = response.data.citySearchResponse;

      var usersSearch = $("<div>");

      userSearch.attr('id', searchResponse);


      // Preprepending 
      //$("citySearchResponse").prepend(Search Result);


    })

})
