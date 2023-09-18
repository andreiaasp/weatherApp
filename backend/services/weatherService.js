
const axios = require("axios");
const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 1800 });

async function fetchWeatherData(city_id, apiKey) {
  try {
    const cachedData = cache.get(city_id);

    if (cachedData) {
      return cachedData;

    } else {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?id=${city_id}&appid=${apiKey}`
      );

      const weatherData = response.data;
      cache.set(city_id, weatherData);

      return weatherData;
    }

  } catch (error) {
    throw error; 
  }
}

module.exports = { fetchWeatherData };
