## Overview

Projects using [http-proxy-middleware][http-proxy-middleware] for Node.js may
require pattern-matching on the host header of the incoming request. As of
v1.0.6, http-proxy-middleware only matches on exact host strings or path
substrings. The project here shows how to add middleware to the middleware in
order to rewrite hosts to predicable strings, at which point they will match on
simple, deterministic keys of the proxy router.

Beyond the scope of this demo, be sure to review how host headers are passed
downstream to the proxied service, and adjust routing and middleware
accordingly.

[http-proxy-middleware]: https://github.com/chimurai/http-proxy-middleware


## Development

### make

Run `make` then visit, from the same host:

* http://localtest.me:3000/ - Not Found (the default)
* http://example.localtest.me:3000/ - A proxied request.
* http://my-one-loadbalancer.localtest.me:3000/ - Pattern-match "-one-".
* http://two-turtle-doves.localtest.me:3000/ - Pattern-match "two-".
* http://some-other-two.localtest.me:3000/ - Match "-two" again.
* http://another-two-etc.localtest.me:3000/ - Match "-two-" yet again.

Note that host keys are matched in order, such that:

* http://two-tone.localtest.me:3000/ - Matches "one" because it's listed first.

Hit Control-C to stop the development server.


### npm

Alternative to running `make`, run `npm install` then `npm start`.


### localtest.me

The localtest.me and *.localtest.me domains resolve to localhost at 127.0.0.1,
and are useful for testing how host headers are handled.

Note that these domains are provided by an open-source third-party and
categorically is subject to change, though it appears to have been online since
2012 (as of 2021).

See:
http://readme.localtest.me/
