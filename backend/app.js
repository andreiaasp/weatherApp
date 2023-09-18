require('dotenv').config();
const express = require('express');
const { auth } = require('express-openid-connect');
const config = require('./config/auth-config');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(auth(config));

app.use('/', routes);

const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('App is running at port:', port);
});
