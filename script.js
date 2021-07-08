var searchButtonEl = document.querySelector('#searchButton');
var searchRequestEl = document.querySelector('#search');
var currentWeatherEl = document.querySelector('#currentWeather');
var cityEl = document.getElementById('city');
var tempEl = document.getElementById('temperature');
var dateEl = document.getElementById('date');
var weatherIconEl = document.getElementById('weatherIcon');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var uvIndexEl = document.getElementById('uvIndex');


function currentLocation(city) {
    var APIKey = "e2343ed8866af33baef64fd64ab7247e";

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;

    fetch(queryURL)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayWeather(data)
            });
        } 
    });

};

function clickHandler(event) {
    // console.log('Button Clicked');
    event.preventDefault();

    var city = searchRequestEl.value.trim();

    // console.log("city")
    // console.log(city)

    if (city) {
        currentLocation(city);

        // currentWeatherEl.textContent = '';
        searchRequestEl.value = '';
    } else {
        alert('Please enter a city');
    }

 }

 function displayWeather(weather) {

    // debugger;
    cityEl.textContent = weather.name;
    dateEl.textContent = moment().format("MM-DD-YY");
    tempData = weather.main.temp
    tempEl.textContent = "Temp: " + tempData + "°F";
    weatherIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"); //Need to figure this one out
    windEl.textContent = "Wind: " + weather.wind.speed + " MPH";
    humidityEl.textContent = "Humidity: " + weather.main.humidity + "%";
    var getLat = weather.coord.lat;
    var getLon = weather.coord.lon;

    var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + getLat + "&lon=" + getLon + "&exclude=hourly&exclude=minutely&appid=e2343ed8866af33baef64fd64ab7247e";
    console.log(uvURL);
        fetch(uvURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function (data) {
                    console.log(data);
                    uvIndexEl.textContent = "UV Index: " + data.current.uvi;
                    if (data.current.uvi < 3) {
                        uvIndexEl.setAttribute("class", "favorable");
                    } else if (data.current.uvi > 3 && data.current.uvi <= 5) {
                        uvIndexEl.setAttribute("class", "moderate");
                    } else {
                        uvIndexEl.setAttribute("class", "severe");
                    }
                    fiveDayForecast(data);
                });
            }
        });

function fiveDayForecast(daily) {
    
}


 }

searchButtonEl.addEventListener('click', clickHandler);


// searchButtonEl.addEventListener("submit", formSubmitHandler);
// console.log(currentLocation("London"));



