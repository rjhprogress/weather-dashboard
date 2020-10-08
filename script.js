

//On click for 
$('#search-city').on("click", function () {

var searchValue = $("#search-city").val();

  // Get API  & API Key
  var queryURL =  "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=appid=5d32c3c46f4249ead84cbc22d3498938";
 // "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=appid=5d32c3c46f4249ead84cbc22d3498938"


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
