const express = require('express');
const { fetchWeatherData } = require('../services/weatherService');
const apiLimiter = require('../middleware/rate-limit');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

const apiKey = process.env.openWeatherAPIKey;

router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

router.get('/api/weather/:city', apiLimiter, async (req, res) => {
  try {
    const city_id = req.params.city;
    console.log(city_id);

    const weatherData = await fetchWeatherData(city_id, apiKey);

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching weather data.' });
  }
});

module.exports = router;
