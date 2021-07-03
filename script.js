var searchButtonEl = $('#searchButton');

function fetchAPI() {
    var APIKey = "e2343ed8866af33baef64fd64ab7247e";

    var city;

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
};

searchButtonEl.on("submit", function(event) {
    event.preventDefault();
    var location = event.target.search.value;
    getLocation(location);
})

function getLocation(location) {
    fetchAPI(location);
}

