require("dotenv").config();
var express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
var app = express();

const port = process.env.PORT || 3000;
const apiKey = process.env.openWeatherAPIKey;
const cache = new NodeCache({ stdTTL: 1800 });

app.get("/weather/:city", async (req, res) => {
  try {
    const city_id = req.params.city;
    console.log(city_id);

    const cachedData = cache.get(city_id);

    if (cachedData) {

      console.log("it was cached");
      res.status(200).json(cachedData);

    } else {

      console.log("it was NOT cached");
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?id=${city_id}&appid=${apiKey}`
      );

      const weatherData = response.data;
      cache.set(city_id, weatherData);

      res.status(200).json(weatherData);

    }
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
