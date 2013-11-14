var cloneextend = require('cloneextend')

module.exports = function(app, configuration) {
    
    var routes = {
        '/': 'index',
        '/demo': 'demo',
        '/chat': 'chat',
        '/manual': 'manual',
        '/manual/core': 'core',
        '/manual/multi-user-chat': 'multi-user-chat',
        '/manual/publish-subscribe': 'publish-subscribe',
        '/manual/in-band-registration': 'in-band-registration',
        '/manual/service-discovery': 'service-discovery',
        '/manual/delayed-delivery': 'delayed-delivery',
        '/manual/data-forms': 'data-forms',
        '/manual/result-set-management': 'result-set-management',
        '/manual/out-of-band-data': 'out-of-band-data',
        '/manual/avatar': 'avatar',
        '/manual/jabber-search': 'jabber-search',
        '/manual/message-archive-management': 'message-archive-management',
        '/manual/extensions': 'extensions',
        '/manual/unknown-stanza-handling': 'unknown-stanza-handling',
        '/manual/jabber-rpc': 'jabber-rpc',
        '/manual/item-parser': 'item-parser'
    }

    Object.keys(routes).forEach(function(route) {
        app.get(route, function(req, res) {
            res.render(routes[route], configuration)
        })
    })

    app.get('/*', function(req, res) {
        res.send(404)
    })
}