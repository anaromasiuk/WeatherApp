// Feature 1 -In your project, display the current date and time using JavaScript: Tuesday 16:00

let Now = new Date();
function formatDate(Now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[Now.getDay()];

  let hour = Now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = Now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

// HW Week 5
function weatherTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let wind = document.querySelector(".wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
}

function findingCity(city) {
  let apiKey = "f47a3ec592b9d7c74815dad665355000";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(weatherTemp);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#type-city").value;
  findingCity(city);
}

function showPosition(position) {
  let apiKey = "f47a3ec592b9d7c74815dad665355000";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(weatherTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let dateElement = document.querySelector("#time");
dateElement.innerHTML = formatDate(Now);

let form = document.querySelector(".searchForm");
form.addEventListener("submit", submit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

findingCity("Berlin");
