var   xmpp        = require('xmpp-ftw')
    , express     = require('express')
    , app         = express()
    , engine      = require('ejs-locals')
    , cloneextend = require('cloneextend') 
    , Emitter     = require('primus-emitter')
    , Primus      = require('primus')
    , helmet      = require('helmet')
    , winston     = require('winston')

helmet.defaults(app)

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

app.get('/', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('index', options)
})

app.get('/demo', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('demo', options)
})

app.get('/chat', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('chat', options)
})


app.get('/manual', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('manual', options)
})

app.get('/manual/core', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('core', options)
})

app.get('/manual/multi-user-chat', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('multi-user-chat', options)
})

app.get('/manual/publish-subscribe', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('publish-subscribe', options)
})

app.get('/manual/in-band-registration', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('in-band-registration', options)
})

app.get('/manual/service-discovery', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('service-discovery', options)
})

app.get('/manual/delayed-delivery', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('delayed-delivery', options)    
})

app.get('/data-forms', function(req, res) {
    res.redirect('/manual/data-forms')
})

app.get('/manual/data-forms', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('data-forms', options)
})

app.get('/manual/result-set-management', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('result-set-management', options)
})

app.get('/manual/out-of-band-data', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('out-of-band-data', options)
})

app.get('/manual/avatar', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('avatar', options)
})

app.get('/manual/jabber-search', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('jabber-search', options)
})

app.get('/extensions', function(req, res) {
    res.redirect('/manual/extensions')
})

app.get('/manual/extensions', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('extensions', options)
})

app.get('/publishing', function(req, res) {
    res.redirect('/manual/item-parser')
})

app.get('/manual/item-parser', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('item-parser', options)
})
app.get('/*', function(req, res) {
    res.send(404)
})

process.on('uncaughtException', function(error) {
    // Try and prevent issues crashing the whole system 
    // for other users too
    console.error(error)
})
