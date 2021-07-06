var searchButtonEl = document.querySelector('#searchButton');
var searchRequestEl = document.querySelector('#search');
var currentWeatherEl = document.querySelector('#currentWeather');

function currentLocation(city) {
    var APIKey = "e2343ed8866af33baef64fd64ab7247e";

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);

            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });

};

function clickHandler(event) {
    console.log('Button Clicked');
    event.preventDefault();

    var city = searchRequestEl.value.trim();

    console.log("city")
    console.log(city)

    if (city) {
        currentLocation(city);

        currentWeatherEl.textContent = '';
        searchRequestEl.value = '';
    } else {
        alert('Please enter a city');
    }



 }

searchButtonEl.addEventListener('click', clickHandler);


// searchButtonEl.addEventListener("submit", formSubmitHandler);
// console.log(currentLocation("London"));



