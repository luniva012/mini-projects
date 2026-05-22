async function getWeather() {
  const city = document.getElementById("cityInput").value;
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    document.getElementById("weatherResult").innerHTML =
     // ` ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
  `<h3>${data.name}</h3>
   <p>🌡️ Temp: ${data.main.temp}°C</p>
   <p>💧 Humidity: ${data.main.humidity}%</p>
   <p>🌬️ Wind: ${data.wind.speed} m/s</p>
   <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
        alt="${data.weather[0].description}">`;

  } catch (error) {
    document.getElementById("weatherResult").innerHTML = "❌ City not found";
  }
}
async function getForecast() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    let forecastHTML = `<h3>5-Day Forecast for ${data.city.name}</h3>`;
    const dailyData = {};

    // Group by date, pick midday (12:00:00) if available
    data.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      const time = item.dt_txt.split(" ")[1];
      if (time === "12:00:00") {
        dailyData[date] = item;
      }
    });

    // Render forecast
    Object.keys(dailyData).slice(0, 5).forEach(date => {
      const item = dailyData[date];
      const temp = item.main.temp;
      const desc = item.weather[0].description;
      const icon = item.weather[0].icon;

      forecastHTML += `
        <div class="day">
          <p><strong>${date}</strong></p>
          <p>🌡️ ${temp}°C, ${desc}</p>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
        </div>
      `;
    });

    document.getElementById("forecastResult").innerHTML = forecastHTML;
  } catch (error) {
    document.getElementById("forecastResult").innerHTML = "❌ Forecast not available";
  }
}



