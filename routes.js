var cloneextend = require('cloneextend')

module.exports = function(app, configuration) {
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
    
    app.get('/manual/unknown-stanza-handling', function(req, res) {
        var options = cloneextend.clone(configuration)
        res.render('unknown-stanza-handling', options)
    })
    
    app.get('/manual/jabber-rpc', function(req, res) {
        var options = cloneextend.clone(configuration)
        res.render('jabber-rpc', options)
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
}