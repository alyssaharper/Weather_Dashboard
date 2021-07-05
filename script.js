var searchButtonEl = $('#searchButton');
var searchRequestEl = $('#search');

function getLocation(city) {
    var APIKey = "e2343ed8866af33baef64fd64ab7247e";

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (current) {
                console.log(current);

            })
        }
    })
    
};

searchButtonEl.on("submit", function(event) {
    event.preventDefault();
    var city = searchRequestEl.val().trim();
    if (city) {
        getLocation(city);
    }
});



