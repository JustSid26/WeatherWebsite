const apiKey = 'c4cda0c80da6ed7ec911c9e92ba496f0';


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
                    let clothingRecommendation = "";
                    if (temp < 10) {
                        clothingRecommendation = "It is freezing. If you are at home, comfort yourself with hoodies and warm trousers, if you have to commute, then do not forget to wear jackets/overcoats and warm gloves";
                    } else if (temp >= 10 && temp < 20) {
                        clothingRecommendation = "It is cold. A sweater/sweatshirt or light jacket will be perfect with sweatpants.";
                    } else if (temp >= 20 && temp < 30) {
                        clothingRecommendation = "The weather is mild. Comfortable clothes like t-shirts, jeans will do.";
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




document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });
});