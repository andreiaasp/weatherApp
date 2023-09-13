require("dotenv").config();
var express = require("express");
const { fetchWeatherData } = require('./weatherService');
var app = express();

const port = process.env.PORT || 3000;
const apiKey = process.env.openWeatherAPIKey;

app.get("/api/weather/:city", async (req, res) => {
  try {
    const city_id = req.params.city;
    console.log(city_id);

    const weatherData = await fetchWeatherData(city_id,apiKey);

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching weather data." });
  }
});

app.listen(port, function () {
  console.log("App is running at port:", port);
});
