var express = require('express');

var app = express();

app.use(require('morgan')('dev'))  // Enable access logging.

app.use(
  '/404',
  function (_, res) {
    res.sendStatus(404)
  }
)

app.listen(3000)
