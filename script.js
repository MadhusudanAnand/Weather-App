const weatherApi = {
    key: "abfe07c7242727ad21ec691df7ab63b7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');
//event listner Function on Keypress
searchInputBox.addEventListener('keypress', (event) => {

    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector(".location-details").style.display = "block";
        document.querySelector(".weather-status").style.display = "block";
        document.querySelector(".temp").style.display = "block";
        document.querySelector(".min-max").style.display = "block";
        document.querySelector(".weather").style.display = "block";
    }
});
//Get weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}
//show weather Report
function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name} , ${weather.sys.country}`;

    let temp = document.getElementById('temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let max = document.getElementById('min-max');
    max.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C(min) / ${Math.ceil(weather.main.temp_max)}&deg;C(max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todatDate = new Date();
    date.innerText = dateManage(todatDate);

    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('a.jpg')";
    } else if (weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('cloudy.jpg')";
    } else if (weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('rainy.jpg')";
    } else if (weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('snowy.jpg')";
    } else if (weatherType.textContent == 'Thunderstrom') {
        document.body.style.backgroundImage = "url('thunderstrom.jpg')";
    } else if (weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage = "url('cloudy.jpg')";
    }
}

//Date manage
function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//abfe07c7242727ad21ec691df7ab63b7
