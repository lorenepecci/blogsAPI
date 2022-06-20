const express = require('express');
const router = require('./routes');
const middlewareError = require('./middleware/error');

const app = express();

app.use(express.json());
app.use(router);
app.use(middlewareError);

module.exports = app;
