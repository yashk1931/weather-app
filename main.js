const API_KEY = "9b54948b82f3e9a37d96a48dec2191ce";

const input = document.querySelector(".Search_box");
const btn = document.querySelector(".Search_bttn");
const img = document.querySelector(".weather-img");

const weatherImages = {
    clear: "images/clear.png",
    clouds: "images/cloudy.png",
    rain: "images/rainy.jpg",
    thunderstorm: "images/storm.png",
    snow: "images/snowing.png",
    haze: "images/haze.png",
    mist: "images/haze.png",
    smoke: "images/cloudy.png",
    fog: "images/fogyy.png",
    dust: "images/cloudy.png",
    sand: "images/cloudy.png",
    ash: "images/cloudy.png",
    squall: "images/cloudy.png",
    tornado: "images/storm.png"
};

function searchCity() {
    let city = input.value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    getWeather(city);

}


btn.addEventListener("click", searchCity);

input.addEventListener("keydown", e => {
    if (e.key === "Enter")
        searchCity();
});

async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.cod !== 200) {
            return alert("City not found");
        }
        updateCard(data);

    } catch {
        alert("Something went wrong");
    }
}

function updateCard(data) {
    document.querySelector(".city-name").innerText = data.name;
    document.querySelector(".temp").innerText = `Temperature: ${data.main.temp}°C`;
    document.querySelector(".humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.querySelector(".condition").innerText = `Condition: ${data.weather[0].description}`;
    document.querySelector(".wind").innerText = `Wind: ${(data.wind.speed * 3.6).toFixed(1) + " km/h"}`;

    let weather = "default";

    weather = data.weather[0].description.toLowerCase();
    img.src = weatherImages[weather] || "images/default.png";

}

async function Container(city, name) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.cod !== 200) {
            return;
        }

        document.getElementById(name+ "-temp").innerText = data.main.temp + "°C";
        document.getElementById(`${name}-humidity`).innerText = data.main.humidity + "%";
        document.getElementById(`${name}-condition`).innerText = data.weather[0].description;
        document.getElementById(`${name}-wind`).innerText = `Wind: ${(data.wind.speed * 3.6).toFixed(1) + " km/h"}`;
    } catch {
        alert("Something went wrong");
    }
}

window.addEventListener("load", () => {
    defaultWeather("karachi");
    Container("Karachi", "karachi");
    Container("Hyderabad", "hyderabad");
    Container("Islamabad", "islamabad");
    Container("Sukkur", "sukkur");
});


async function defaultWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.cod !== 200) {
            return;
        }

        document.querySelector(".city-name").innerText = data.name;
        document.querySelector(".temp").innerText = `Temperature: ${data.main.temp}°C`;
        document.querySelector(".humidity").innerText = `Humidity: ${data.main.humidity}%`;
        document.querySelector(".condition").innerText = `Condition: ${data.weather[0].description}`;
        document.querySelector(".wind").innerText = `Wind: ${(data.wind.speed * 3.6).toFixed(1) + " km/h"}`;
        
        let weather = "default";

        weather = data.weather[0].description.toLowerCase();
        img.src = weatherImages[weather] || "images/default.png";

    } catch {
        alert("Something went wrong");
    }
}