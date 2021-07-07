var searchButtonEl = document.querySelector('#searchButton');
var searchRequestEl = document.querySelector('#search');
var currentWeatherEl = document.querySelector('#currentWeather');
var cityEl = document.getElementById('city');
var tempEl = document.querySelector('#temperature');
var dateEl = document.querySelector('#date');
var weatherIconEl = document.querySelector('#weatherIcon');
var windEl = document.querySelector('#wind');
var humidityEl = document.querySelector('#humidity');
var uvIndexEl = document.querySelector('#uvIndex');

function currentLocation(city) {
    var APIKey = "e2343ed8866af33baef64fd64ab7247e";

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;

    fetch(queryURL)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayWeather(data, city)
            });
        } 
    });

};

// function fetchUVIndex(lat, long) {
//     var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=e2343ed8866af33baef64fd64ab7247e";

//     fetch(uvURL)
//     .then(function (response) {
//         if (response.ok) {
//             console.log(response)
//             response.json().then(function (data) {
//                 console.log(data);
//                 getCoords(data, coordinates)

//             });
//         }
//     });
// }

function clickHandler(event) {
    // console.log('Button Clicked');
    event.preventDefault();

    var city = searchRequestEl.value.trim();

    // console.log("city")
    // console.log(city)

    if (city) {
        currentLocation(city);

        currentWeatherEl.textContent = '';
        searchRequestEl.value = '';
    } else {
        alert('Please enter a city');
    }

 }

 function displayWeather(weather, cityname) {
document.getElementById('city').innerHtml = cityname;
dateEl.textContent = moment().format("MM-DD-YY");
tempEl.textContent = weather.main.temp + "°F";
weatherIconEl.textContent = weather.weather.icon; //Need to figure this one out
windEl.textContent = weather.wind.speed + " MPH";
humidityEl.textContent = weather.main.humidity + "%";
// var getLat = weather.coord.lat;
// var getLon = weather.coord.lon;
// fetchUVIndex(getLat, getLon);
console.log(cityEl.innerHtml = cityname);
 }

searchButtonEl.addEventListener('click', clickHandler);


// searchButtonEl.addEventListener("submit", formSubmitHandler);
// console.log(currentLocation("London"));



