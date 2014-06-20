'use strict';

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
        '/manual/extensions/buddycloud': 'buddycloud',
        '/manual/unknown-stanza-handling': 'unknown-stanza-handling',
        '/manual/jabber-rpc': 'jabber-rpc',
        '/manual/item-parser': 'item-parser',
        '/manual/jingle': 'jingle',
        '/manual/ad-hoc-commands': 'ad-hoc-commands',
        '/manual/ping': 'ping',
        '/manual/http-requests': 'http-requests'
    }

    Object.keys(routes).forEach(function(route) {
        app.get(route, function(req, res) {
            if (req.url[req.url.length - 1] !== '/') {
                return res.redirect(301, req.url + '/')
            }
            res.render(routes[route], configuration)
        })
    })

    app.get('/*', function(req, res) {
        res.send(404)
    })
}
