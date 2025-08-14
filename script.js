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

// Passo 2: Configuração da API
const apiKey = "97d9388073b842838b3224715251308";
const baseUrl = "https://api.weatherapi.com/v1/current.json";

// Passo 3: Função para buscar dados
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

// Passo 4: Função para mostrar o clima na tela
function mostrarClima(data) {
    // Mostrar o container de resultado e esconder o erro
    weatherResult.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    cityName.innerText = `${data.location.name} - ${data.location.country}`;
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

// Passo 5: Função para mostrar erro
function mostrarErro(msg) {
    weatherResult.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.querySelector("p").innerText = msg;
}

// Passo 6: Evento de clique no botão
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

// Passo 7: Buscar automaticamente "Arapiraca" ao carregar a página
window.addEventListener("load", () => {
    getWeather("Arapiraca");
});