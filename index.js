var express = require('express');

var app = express();

app.use(require('morgan')('dev'))  // Enable access logging.

app.listen(3000)
