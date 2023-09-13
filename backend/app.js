var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.status(200).json({
        result: 'WeatherApp'
      });
  });

app.listen(port, function () {
    console.log('App is running at port:', port);
  });