const apiKey = 'c4cda0c80da6ed7ec911c9e92ba496f0';

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
                    const temp = response.main.temp; 
                    const weatherDescription = response.weather[0].main.toLowerCase();
                    const windSpeed = response.wind.speed;
                    let healthImpact = "";
                    let travelImpact = "";
                    let energyImpact = "";
                    if (temp > 35) {
                        healthImpact += "High heat detected! Stay hydrated and avoid outdoor activities during midday. ";
                    } else if (temp < 5) {
                        healthImpact += "It's freezing cold! Wear warm layers and limit time outdoors. ";
                    } else {
                        healthImpact += "The weather seems comfortable for most activities. ";
                    }
                    document.getElementById("health").innerHTML = healthImpact;

                    if (weatherDescription.includes("rain")) {
                        travelImpact += "Rain detected. Roads may be slippery; drive cautiously and carry an umbrella. ";
                    }
                    if (windSpeed > 15) {
                        travelImpact += "Strong winds reported. Avoid outdoor activities like hiking or cycling. ";
                    }else{
                        travelImpact += 'Not so windy, hence outdoor activities can be conducted'
                    }
                    document.getElementById("travel").innerHTML = travelImpact;
                    
                    if (temp > 30) {
                        energyImpact += "High temperature may increase electricity usage for cooling. ";
                    } else if (temp < 10) {
                        energyImpact += "Cold weather may increase heating costs. ";
                    }

                    document.getElementById("energy").innerHTML = energyImpact;
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
