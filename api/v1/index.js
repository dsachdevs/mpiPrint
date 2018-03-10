const express = require('express');
const parser = require('body-parser');
// const db_config = require('./db_config.js');
const routes = require('./routes.js');
const cors = require('cors');

var app = express();
app.use(parser.json());

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use('/api', routes);

app.listen(3000);


