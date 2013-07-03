var   xmpp        = require('xmpp-ftw')
    , express     = require('express')
    , app         = express()
    , engine      = require('ejs-locals')
    , cloneextend = require('cloneextend')  
    
var server = require('http').createServer(app)
server.listen(3000)
var io = require('socket.io').listen(server)

version = require('xmpp-ftw/package.json').version

io.configure(function(){
    io.set('transports', [
        'websocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling'
    ])
})

var muc = require('xmpp-ftw-muc')
var disco = require('xmpp-ftw-disco')
var pubsub = require('xmpp-ftw-pubsub')
var superfeedr = require('xmpp-ftw-superfeedr')
var buddycloud = require('xmpp-ftw-buddycloud')

var versions = {
    'xmpp-ftw': require('xmpp-ftw/package.json').version,
    'xmpp-ftw-disco': require('xmpp-ftw-disco/package.json').version,
    'xmpp-ftw-muc': require('xmpp-ftw-muc/package.json').version,
    'xmpp-ftw-pubsub': require('xmpp-ftw-pubsub/package.json').version,
    'xmpp-ftw-superfeedr': require('xmpp-ftw-superfeedr/package.json').version,
    'xmpp-ftw-buddycloud': require('xmpp-ftw-buddycloud/package.json').version
}

io.sockets.on('connection', function(socket) {
     var xmppFtw = new xmpp.Xmpp(socket);
     xmppFtw.addListener(new muc())
     xmppFtw.addListener(new disco())
     xmppFtw.addListener(new pubsub())
     xmppFtw.addListener(new superfeedr())
     xmppFtw.addListener(new buddycloud())
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

app.configure(function(){
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
    options.versions = versions
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

app.get('/manual/service-discovery', function(req, res) {
    var options = cloneextend.clone(configuration)
    res.render('service-discovery', options)
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
