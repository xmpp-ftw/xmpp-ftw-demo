# XMPP-FTW (For The Web/Win) Demo/Examples

[![Greenkeeper badge](https://badges.greenkeeper.io/xmpp-ftw/xmpp-ftw-demo.svg)](https://greenkeeper.io/)

This repository runs a server which loads (xmpp-ftw)[https://github.com/xmpp-ftw/xmpp-ftw] and sets it up for experimentation/development.

The user is given acccess to both a demo system and the manual for `xmpp-ftw`.

For more information on `xmpp-ftw` please see http://xmpp-ftw.org.

# Try it out...

The code is now up and running at http://xmpp-ftw.org so you can try it out. Be aware that this
setup is only for trying xmpp-ftw out and may be slow as we need to go client ↔ heroku (east coast US) ↔  your XMPP server and back each time.

* http://xmpp-ftw.org/manual -- XMPP-FTW manual
* http://xmpp-ftw.org/demo -- Awesome demo tool, generated from manual

# Build status

[![Build Status](https://secure.travis-ci.org/xmpp-ftw/xmpp-ftw-demo.png)](http://travis-ci.org/xmpp-ftw/xmpp-ftw-demo)

# Components

XMPP-FTW is built up of smaller components (although is currently in tne process of bieng split).

The main module XMPP-FTW has code for login, roster, and presence as well as a few utilities that are used through most of XMPP.

* XMPP-FTW: [![Build Status](https://secure.travis-ci.org/xmpp-ftw/xmpp-ftw.png)](http://travis-ci.org/xmpp-ftw/xmpp-ftw)
* DISCO (XEP-0030): [![Build Status](https://secure.travis-ci.org/xmpp-ftw/xmpp-ftw-disco.png)](http://travis-ci.org/xmpp-ftw/xmpp-ftw-disco)
* Multi User Chat / MUC (XEP-0045)  [![Build Status](https://secure.travis-ci.org/xmpp-ftw/xmpp-ftw-muc.png)](http://travis-ci.org/xmpp-ftw/xmpp-ftw-muc)
* Jabber Search (XEP-0055)  [![Build Status](https://secure.travis-ci.org/xmpp-ftw/xmpp-ftw-search.png)](http://travis-ci.org/xmpp-ftw/xmpp-ftw-search)
* Publish-Subscribe / PubSub (XEP-0060)  [![Build Status](https://secure.travis-ci.org/xmpp-ftw/xmpp-ftw-pubsub.png)](http://travis-ci.org/xmpp-ftw/xmpp-ftw-pubsub)
* In-Band Registration (XEP-0077)  [![Build Status](https://secure.travis-ci.org/xmpp-ftw/xmpp-ftw-register.png)](http://travis-ci.org/xmpp-ftw/xmpp-ftw-register)
* Superfeedr  [![Build Status](https://secure.travis-ci.org/xmpp-ftw/xmpp-ftw-superfeedr.png)](http://travis-ci.org/xmpp-ftw/xmpp-ftw-superfeedr)
* buddycloud  [![Build Status](https://secure.travis-ci.org/xmpp-ftw/xmpp-ftw-buddycloud.png)](http://travis-ci.org/xmpp-ftw/xmpp-ftw-buddycloud)

* Item parser - builder and parser for "common" pubsub payloads
  * [![Build Status](https://secure.travis-ci.org/xmpp-ftw/xmpp-ftw-item-parser.png)](http://travis-ci.org/xmpp-ftw/xmpp-ftw-item-parser)

# Run the demos locally

* npm i -g xmpp-ftw-demo
* xmpp-ftw-demo
* Go to `http://localhost:3000/`

To work on the code in 'development mode' (where process restarts as files change) run `npm run-script develop`.

If installing globally then the `xmpp-ftw-demo` needs to be able to write to the `public/scripts` directory; this is so [Primus](https://github.com/primus/primus) can generate and save its client side javascript.

## Logging

`xmpp-ftw-demo` uses [winston](https://github.com/flatiron/winston) for logging. `xmpp-ftw` itself will accept any logging object that implements the same interface as winston or will generate itself a null logger object.

By default the configuration for winston sits in `config/logger.config.default.json`. Output is sent to the console.

If you wish to use your own configuration for `xmpp-ftw-demo` create the file `config/logger.json` and this will be used instead.

For instructions on using the config file see [winston-config](https://github.com/triplem/winston-config).

# License

License is Apache 2.0, please let me know if this doesn't suit.


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/xmpp-ftw/xmpp-ftw-demo/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

