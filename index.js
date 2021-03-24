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
  '/one',
  function (_, res) {
    res.end("Route One")
  }
)

app.use(
  '/two',
  function (_, res) {
    res.end("Route Two")
  }
)

var middleware = proxy({
  target: 'http://localtest.me:3000/404',
  changeOrigin: true,
  router: {
    'example.localtest.me:3000': 'http://example.com',
    'hooli.localtest.me:3000': 'http://hooli.xyz',
    'one': 'http://localtest.me:3000/one',
    'two': 'http://localtest.me:3000/two'
  }
})

var one = /.*-?one-?.*/
var two = /.*-?two-?.*/

app.use(
  '/',
  function (req, res, next) {
    // Rewrite host header for `router` lookup when regular expression matches.
    if (req.headers.host.match(one)) {
      req.headers.host = 'one'
    } else if (req.headers.host.match(two)) {
      req.headers.host = 'two'
    }
    return middleware(req, res, next)
  }
)

app.listen(3000)
