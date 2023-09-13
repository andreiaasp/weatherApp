require('dotenv').config();
var express = require('express');
const axios = require('axios');
var app = express();

const port = process.env.PORT || 3000;
const apiKey = process.env.openWeatherAPIKey;

app.get("/weather/:city", async (req, res) => {
  try {
    console.log(req.params);
    const city_id = req.params.city;
    console.log(apiKey)

    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?id=${city_id}&appid=${apiKey}`
    );

    const weatherData = response.data;

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