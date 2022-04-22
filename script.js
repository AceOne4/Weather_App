"use strict";
const city = document.querySelector(".weather h1");
const temprature = document.querySelector(".degre");
const img = document.querySelector(".icon");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind");
const description = document.querySelector(".description");
const searchbtn = document.querySelector(".search button");
const searchBar = document.querySelector(".search-bar");
//global Variables
let weather_API = "6edec281407dbf3b2d3907a41cd7f44e";
const allOucs = ["Clear", "Clouds", "Mist", "Rain", "Snow"];
let weatherDetails = {};
//helper functions
//DOM manpulation function
const domManpulation = function (obj) {
  document.querySelector(
    "body"
  ).style.backgroundImage = `url("./img/${allOucs.find((el) =>
    el.includes(obj.maindescribe)
  )}.jpg")`;
  city.innerHTML = `Weather in ${obj.cityName}`;
  temprature.innerHTML = `${obj.temprature}°C`;
  description.innerHTML = obj.describe;
  humidity.innerHTML = `Humidity: ${obj.humidity}%`;
  windSpeed.innerHTML = `Wind Speed: ${obj.windSpeed} km/h`;
  img.src = `http://openweathermap.org/img/wn/${obj.icon}.png`;
};
//rewrite our object
const weather = function (data) {
  weatherDetails = {
    cityName: data.name,
    temprature: Math.floor(data.main.temp - 272.15),
    icon: data.weather[0].icon,
    describe: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    maindescribe: data.weather[0].main,
  };
};
//render the Dom
const render = function (searchBar) {
  callWeather(searchBar.value);
  searchBar.value = "";
};
//rendering api
const callWeather = async function (name) {
  const respond = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${weather_API}`
  );

  const data = await respond.json();
  weather(data);
  domManpulation(weatherDetails);
};
//callWeather("CAIRO");

//handler events
searchbtn.addEventListener("click", function () {
  if (!searchBar.value) return;
  render(searchBar);
});
searchBar.addEventListener("keyup", function (e) {
  if (searchBar.value !== "" && e.key === "Enter") {
    render(searchBar);
  }
});

//optional functions
//to get your Curren Position
navigator.geolocation.getCurrentPosition((pose) => {
  const lat = pose.coords.latitude;
  const lng = pose.coords.longitude;
  getCityNAme(lat, lng);
});
//to converts coords to cityname
const getCityNAme = async function (lat, lng) {
  const respond = await fetch(
    `https://www.mapquestapi.com/geocoding/v1/reverse?key=G1moSFJkXvMTf7kCVqTOPMh1SxtvJaGi&location=${lat}%2C${lng}&outFormat=json&thumbMaps=false`
  );
  const data = await respond.json();

  const currCity = data.results[0].locations[0].adminArea5;
  callWeather(currCity);
};
//getCityNAme("31.033697", "31.033697");
