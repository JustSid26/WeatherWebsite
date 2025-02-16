const apiKey = 'please use your api key!';
function convertUnixTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                if (response.cod === 200) {
                    document.getElementById("city").innerHTML = city;
                    document.getElementById("feels_like").innerHTML = response.main.feels_like;
                    document.getElementById("humidity").innerHTML = response.main.humidity;
                    document.getElementById("pressure").innerHTML = response.main.pressure;
                    document.getElementById("temp").innerHTML = response.main.temp;
                    document.getElementById("temp_max").innerHTML = response.main.temp_max;
                    document.getElementById("temp_min").innerHTML = response.main.temp_min;
                    document.getElementById("wind_deg").innerHTML = response.wind.deg;
                    document.getElementById("wind_speed").innerHTML = response.wind.speed;
                    const sunrise = response.sys.sunrise;
                    const sunset = response.sys.sunset;
                    document.getElementById("sunriseTime").innerHTML = convertUnixTimestamp(sunrise);
                    document.getElementById("sunsetTime").innerHTML = convertUnixTimestamp(sunset);
                    
                    const temp = response.main.temp; 
                    const weatherDescription = response.weather[0].main.toLowerCase(); 
                    let clothingRecommendation = "";
                    if (temp < 10) {
                        clothingRecommendation = "It's cold! Wear heavy jackets, gloves, and warm clothing.";
                    } else if (temp >= 10 && temp < 20) {
                        clothingRecommendation = "It's chilly. A sweater or light jacket will be perfect.";
                    } else if (temp >= 20 && temp < 30) {
                        clothingRecommendation = "The weather is mild. Comfortable clothes like t-shirts and jeans will do.";
                    } else {
                        clothingRecommendation = "It's hot! Wear light and breathable clothing like shorts and cotton t-shirts.";
                    }
                    if (weatherDescription.includes("rain")) {
                        clothingRecommendation += " Don't forget to carry an umbrella or raincoat!";
                    }
                    document.getElementById("clothing").innerHTML = clothingRecommendation;
                } else {
                    alert("City not found!");
                }
            })
            .catch(err => console.error(err));
    } else {
        alert("Please enter a city name.");
    }
});


const nightModeButton = document.getElementById('night');

nightModeButton.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
    if (document.body.classList.contains('night-mode')) {
        nightModeButton.textContent = 'Day Mode';
    } else {
        nightModeButton.textContent = 'Night Mode';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });
});