const express = require('express');
const controllerLogin = require('./controllers/controllerLogin');
const controllerUser = require('./controllers/controllerUser');
const middlewareError = require('./middleware/error');

const app = express();

app.use(express.json());
app.use('/login', controllerLogin);
app.use('/user', controllerUser);

app.use(middlewareError);

module.exports = app;
