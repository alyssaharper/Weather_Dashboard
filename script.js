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
var historyEl = document.getElementById('history');
var fiveDayForecastEl = document.getElementById('5DayForecast');
var citiesArr = JSON.parse(localStorage.getItem('city')) || [];


function currentLocation(city) {
    var APIKey = "e2343ed8866af33baef64fd64ab7247e";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;

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
        citiesArr.push(city)
        localStorage.setItem('city', JSON.stringify(citiesArr));
        cityHistory();
        searchRequestEl.value = '';
    } else {
        alert('Please enter a city');
    }

 }

 cityHistory();

function cityHistory() {
    historyEl.innerHTML = "";
for (var i = 0; i < citiesArr.length; i++) {
    var button = document.createElement('button');
    button.textContent = citiesArr[i];
    historyEl.append(button);
    
}
}

 function displayWeather(weather) {

    cityEl.textContent = weather.name;
    dateEl.textContent = moment().format("MM-DD-YY");
    tempData = weather.main.temp
    tempEl.textContent = "Temp: " + tempData + "°F";
    weatherIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"); //Need to figure this one out
    windEl.textContent = "Wind: " + weather.wind.speed + " MPH";
    humidityEl.textContent = "Humidity: " + weather.main.humidity + "%";
    var getLat = weather.coord.lat;
    var getLon = weather.coord.lon;

    var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + getLat + "&lon=" + getLon + "&units=imperial" + "&exclude=hourly&exclude=minutely&appid=e2343ed8866af33baef64fd64ab7247e";
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
    
for (var i = 1; i <= 5; i++) {
    var cardEl= document.createElement('div');
    cardEl.setAttribute("class", "card bg-primary text-white")
    var cardBodyEl= document.createElement('div');
    cardBodyEl.setAttribute("class", "card-body");
    var dailyWeatherIconEl = document.createElement('img');
    dailyWeatherIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + daily.daily[i].weather[0].icon + ".png");
    cardBodyEl.append(dailyWeatherIconEl);
    var cardTempEl = document.createElement('div');
    cardTempEl.setAttribute("class", "card-text");
    cardTempEl.textContent = "Temp: " + daily.daily[i].temp.day + "°F";
    cardBodyEl.append(cardTempEl);
    var cardWindEl = document.createElement('div');
    cardWindEl.textContent = "Wind: " + daily.daily[i].wind_speed + " MPH";
    cardBodyEl.append(cardWindEl);
    var cardHumidityEl = document.createElement('div');
    cardHumidityEl.setAttribute("class", "card-text");
    cardHumidityEl.textContent = "Humidity: " + daily.daily[i].humidity + "%";
    cardBodyEl.append(cardHumidityEl);
    cardEl.append(cardBodyEl);
    
fiveDayForecastEl.append(cardEl);
}

}


 }

searchButtonEl.addEventListener('click', clickHandler);


