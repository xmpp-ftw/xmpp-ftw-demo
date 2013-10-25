var   xmpp        = require('xmpp-ftw')
    , express     = require('express')
    , app         = express()
    , engine      = require('ejs-locals')
    , Emitter     = require('primus-emitter')
    , Primus      = require('primus')
    , helmet      = require('helmet')
    , winston     = require('winston')

helmet.defaults(app)

var environment = process.env['NODE_ENV'] || 'production'

var server = require('http').createServer(app)
server.listen(3000)

version = require('xmpp-ftw/package.json').version

var options = {
    transformer: 'socket.io',
    parser: 'JSON',
    transports: [
        'websocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling'
    ]
}

var primus = new Primus(server, options)
primus.use('emitter', Emitter)
primus.save(__dirname + '/public/scripts/primus.js');

var Muc = require('xmpp-ftw-muc')
var Disco = require('xmpp-ftw-disco')
var Pubsub = require('xmpp-ftw-pubsub')
var Register = require('xmpp-ftw-register')
var Superfeedr = require('xmpp-ftw-superfeedr')
var Buddycloud = require('xmpp-ftw-buddycloud')
var Avatar = require('xmpp-ftw-avatar')
var Search = require('xmpp-ftw-search')
var Rpc = require('xmpp-ftw-rpc')
var Fanout = require('xmpp-ftw-fanout')
var Jingle = require('xmpp-ftw-jingle')
var Mam = require('xmpp-ftw-mam')

primus.on('connection', function(socket) {
     var xmppFtw = new xmpp.Xmpp(socket)
     xmppFtw.setLogger(winston)
     xmppFtw.addListener(new Muc())
     xmppFtw.addListener(new Disco())
     xmppFtw.addListener(new Pubsub())
     xmppFtw.addListener(new Register())
     xmppFtw.addListener(new Superfeedr())
     xmppFtw.addListener(new Buddycloud())
     xmppFtw.addListener(new Avatar())
     xmppFtw.addListener(new Search())
     xmppFtw.addListener(new Rpc())
     xmppFtw.addListener(new Fanout())
     xmppFtw.addListener(new Jingle())
     xmppFtw.addListener(new Mam())
})

var readme = require('express-middleware-readme.md')
readme.setOptions({
    htmlWrap: {
        meta: [
            { charset: 'utf-8' }
        ],
        title: 'XMPP-FTW Github README.md'
    }
})

app.configure(function() {
    app.disable('x-powered-by')
    app.use(express.static(__dirname + '/public'))
    app.set('views', __dirname + '/views')
    app.set('view engine', 'ejs')
    app.use(express.bodyParser())
    app.use(express.methodOverride())
    app.use(readme.run)
    app.use(app.router)
    app.use(express.logger);
    app.use(express.errorHandler({
        dumpExceptions: true, showStack: true
    }))
})

app.engine('ejs', engine);

var configuration = { 
    ga: process.env['GOOGLE_ANALYTICS_ID'] || null,
        webmasterTools: process.env['GOOGLE_WEBMASTER_TOOLS'] || null,
    username: process.env['NODE_XMPP_USERNAME'] || null,
    password: process.env['NODE_XMPP_PASSWORD'] || null,
    body:     {},
    title:    "XMPP-FTW ⟫ ",
    version:  version
}

require('./routes')(app, configuration)

process.on('uncaughtException', function(error) {
    // Try and prevent issues crashing the whole system 
    // for other users too
    console.error(error)
})
