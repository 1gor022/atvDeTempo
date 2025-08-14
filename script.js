const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherResult = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");

const cityName = document.getElementById("city-name");
const localTime = document.getElementById("local-time");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const uvIndex = document.getElementById("uv-index");

const apiKey = "97d9388073b842838b3224715251308";
const baseUrl = "https://api.weatherapi.com/v1/current.json";

async function getWeather(city) {
    try {
        const url = `${baseUrl}?key=${apiKey}&q=${city}&aqi=no&lang=pt`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Cidade não encontrada. Tente novamente.");
        }

        const data = await response.json();
        mostrarClima(data);
    } catch (error) {
        mostrarErro(error.message);
    }
}

function mostrarClima(data) {
    
    weatherResult.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    cityName.innerText = `${data.location.name}, ${data.location.region} - ${data.location.country}`;
    localTime.innerText = `Horário Local: ${data.location.localtime}`;
    weatherIcon.src = data.current.condition.icon;
    weatherIcon.alt = data.current.condition.text;
    temperature.innerText = `${data.current.temp_c}°C`;
    condition.innerText = data.current.condition.text;

    feelsLike.innerText = `${data.current.feelslike_c}°C`;
    humidity.innerText = `${data.current.humidity}%`;
    windSpeed.innerText = `${data.current.wind_kph} km/h`;
    pressure.innerText = `${data.current.pressure_mb} hPa`;
    visibility.innerText = `${data.current.vis_km} km`;
    uvIndex.innerText = data.current.uv;
}

function mostrarErro(msg) {
    weatherResult.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.querySelector("p").innerText = msg;
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

window.addEventListener("load", () => {
    getWeather("Arapiraca");
});