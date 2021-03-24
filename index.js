var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use(require('morgan')('dev'))  // Enable access logging.

app.use(
  '/404',
  function (_, res) {
    res.sendStatus(404)
  }
)

app.use(
  '/',
  proxy({
    target: 'http://localtest.me:3000/404',
    changeOrigin: true,
    router: {
      'example.localtest.me:3000': 'http://example.com',
      'hooli.localtest.me:3000': 'http://hooli.xyz'
    }
  })
)

app.listen(3000)
