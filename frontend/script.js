document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("predictionForm");
  const resultDiv = document.getElementById("result");
  const countEl = document.getElementById("count");
  const categoryEl = document.getElementById("category");
  const priceEl = document.getElementById("suggestedPrice");
  // Auto-set current datetime
  const datetimeInput = document.getElementById("datetime");
  const now = new Date();
  datetimeInput.value = now.toISOString().slice(0, 16); // format as YYYY-MM-DDTHH:mm

  // Show loading status during weather fetch
  const tempEl = document.getElementById("temp");
  tempEl.placeholder = "Fetching...";

  // Autofill weather data using Geolocation + OpenWeatherMap API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const apiKey = "f8dbaaa5356c1593534a9c679e9d10b1"; // your API key
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        const data = await weatherResponse.json();
        console.log("Weather data:", data);

        const tempC = data.main.temp - 273.15;
        const feelsC = data.main.feels_like - 273.15;
        const humidity = data.main.humidity;
        const windspeed = data.wind.speed * 3.6;

        document.getElementById("temp").value = tempC.toFixed(1);
        document.getElementById("atemp").value = feelsC.toFixed(1);
        document.getElementById("humidity").value = humidity;
        document.getElementById("windspeed").value = windspeed.toFixed(1);

        const condition = data.weather[0].main.toLowerCase();
        let weatherCode = 1;
        if (condition.includes("cloud")) weatherCode = 2;
        else if (condition.includes("rain") || condition.includes("drizzle")) weatherCode = 3;
        else if (condition.includes("storm") || condition.includes("thunder")) weatherCode = 4;

        document.getElementById("weather").value = weatherCode;
      } catch (error) {
        console.error("Weather fetch failed:", error);
      }
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      datetime: datetimeInput.value,
      weather: document.getElementById("weather").value,
      temp: document.getElementById("temp").value,
      atemp: document.getElementById("atemp").value,
      humidity: document.getElementById("humidity").value,
      windspeed: document.getElementById("windspeed").value,
      user_count: document.getElementById("user_count").value,
      price: document.getElementById("price").value,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        countEl.textContent = `Predicted Demand: ${result.predicted_count}`;
        categoryEl.textContent = `Category: ${result.category}`;
        categoryEl.style.color = getColorForDemand(result.category);
        priceEl.textContent = `Suggested Price: ₹${result.price}`;

        resultDiv.classList.remove("hidden");
        resultDiv.classList.add("animated");

        // Optional: Reset animation if clicked again
        setTimeout(() => resultDiv.classList.remove("animated"), 600);
      } else {
        alert(result.error || "Prediction failed");
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  });
});

function getColorForDemand(demand) {
  switch (demand.toLowerCase()) {
    case "very high":
      return "red";
    case "high":
      return "orange";
    case "normal":
      return "green";
    case "low":
      return "blue";
    case "very low":
      return "gray";
    default:
      return "black";
  }
}
