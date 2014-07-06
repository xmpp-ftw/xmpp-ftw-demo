'use strict';

var socket = null
var messageCount = 1
var manualPageRetrievalQueue = 0

var outgoingMessages = []
var outgoing         = []
var incoming         = {}

var getEntryHtml = function(callback) {
    if (callback) {
        return $('<div class="message-container payload callback-yes">' +
            '<div class="message"></div>' +
            '<div class="data zoomable"></div>' +
            '<div class="callback"></div>' +
            '</div>')
    }
    return $('<div class="message-container payload callback-no">' +
        '<div class="message"></div>' +
        '<div class="data zoomable"></div>' +
        '</div>')
}

var addMessage = function(message, direction, data, callback) {
    console.log('IN: ', message, direction, data, callback)
    var html = getEntryHtml(callback)

    html.addClass(direction)
    html.find('.data').html(
        JSON.stringify(data, undefined, 2).replace(/\n/g, '<br/>')
    )
    html.find('.message').html(message)

    var id = messageCount
    html.attr('id', id)
    messageCount++
    var isCallback = (incoming[message] && (-1 !== incoming[message].indexOf('callback')))
    
    if (('in' === direction) && isCallback) {

        var callbackDiv = html.find('.callback')
        callbackDiv.attr('contenteditable', 'true')
            .text('{...Write JSON callback data here...}')
        callbackDiv.addClass('out')
        var callbackButtonDiv = $('<div class="in-callback-submit"></div>')
        var callbackButton = $('<button>Send callback</button>')
        callbackButtonDiv.append(callbackButton)
        html.append(callbackButtonDiv)
        setTimeout(function() {
            $(callbackButtonDiv).css('height', $(callbackDiv).css('height'))
        }, 100)
        callbackButton.click(function() {
            var parsed = null
            try {
                parsed = JSON.parse(callbackDiv.text())
            } catch (e) {
                console.error(e)
                return window.alert('You must enter valid JSON:\n\n' + e.toString())
            }
            callback(parsed)
            callbackButtonDiv.remove()
        })
        callbackDiv.append()
    }
    $('#messages').append(html)
    return id
}

var useLocalStorage = function() {
    return $('input[name=useStorage]').is(':checked')
}

var setupAutocomplete = function() {
    $('#message').autocomplete({
        minLength: 0,
        source: outgoing,
        select: function(event, ui) {
            $('.send .callback').removeClass('callback-yes').removeClass('callback-no')

            var example = ui.item.example
            if ((true === useLocalStorage()) &&
                localStorage[ui.item.label])
                example = localStorage[ui.item.label]
                    .replace('{', '{<br/>')
                    .replace('\',', '",<br/>')
                    .replace('}', '<br/>}')
            $('.send .data').html(example)
            $('.send .callback').attr('callback', ui.item.callback)
            $('.send .callback').addClass((true === ui.item.callback) ? 'callback-yes' : 'callback-no')
            $('.send .callback').html((true === ui.item.callback) ? 'Yes' : 'No')
            return false
        },
        focus: function(event, ui) {
            $('#message').val(ui.item.label)
            return false
        }
    })
}

var setupListener = function() {
    Object.keys(incoming).forEach(function(message) {
        socket.on(message, function(data, callback) {
            addMessage(message, 'in', data, callback)
        })
    })
}

var increaseQueue = function() {
    ++manualPageRetrievalQueue
}

var decreaseQueue = function() {
    --manualPageRetrievalQueue
    if (manualPageRetrievalQueue > 0) return
    setupListener()
    setupAutocomplete()
    console.log('Listening for the following messages', Object.keys(incoming))
    console.log('Logging the following outgoing messages', outgoingMessages)
    $('.messages-container').css('display', 'block')
}

var parsePage = function(incomingData) {

    var data = $(incomingData.replace(/^\n/, ''))

    data.each(function(i, ele) {

        if ('container' !== $(ele).attr('id')) return

        $(ele).find('pre.in').each(function(i, message) {
            incoming[$(message).attr('message')] = $(message).attr('class')
        })

        $(ele).find('pre.out').each(function(i, message) {
            var example = $(message).text().split($(message).attr('message') + '\',')[1]
            if (example) {
                var splitString = (-1 === example.indexOf(', rsm)')) ?
                    'function(error, data) { console.log(error, data) }' :
                    'function(error, data, rsm) { console.log(error, data, rsm) }'
                example = example.split(splitString)[0].trim().slice(0, -1)
            }
            var out = {
                value: $(message).attr('message'),
                label: $(message).attr('message'),
                callback: $(message).hasClass('callback'),
                example: (example || '{}').replace(/\n/g, '<br/>')
            }
            outgoing.push(out)
            outgoingMessages.push(out.value)
        })
    })
    decreaseQueue()
}

var getMessages = function(path, delay) {
    if (!delay) delay = 0
    increaseQueue()
    setTimeout(function() {
        $.ajax({
            url: path || '/manual',
            type: 'get',
            dataType: 'html',
            success: parsePage,
            error: function(error) {
                console.log(error)
                window.alert('Failed to start: ' + error.statusText)
            }
        })
    }, delay)
}

$(window.document).on('click', 'span.clear-storage', function(e) {
    e.stopPropagation()
    console.debug('localStorage cleared')
    localStorage.clear()
})

var modalTarget

var showModal = function(target) {
    var content = target.html()
    $('body').css('cursor', 'wait')
    $('#modal pre').html(content)
    $('body').css('cursor', '')
    if (target.hasClass('data')) {
        $('#modal pre').attr('contenteditable', 'true')
        modalTarget = target
    }
    $('#modal').show()
}

$(window.document).on('click', 'div.zoomable', function(e) {
    if (!e.ctrlKey && !e.metaKey) return true
    showModal($(e.target))
    e.stopPropagation()
})

var hideModal = function(e) {
    if (!e.ctrlKey && !e.metaKey) return true
    if (modalTarget) {
        modalTarget.html($('#modal pre').html())
        modalTarget = null
    }
    $('#modal').hide()
    $('#modal pre').attr('contenteditable', 'false')
    e.stopPropagation()
}

var clearForm = function() {
    $('#demo .send .message, #message, #data, #callback').effect('highlight', 'slow');
    $('#message').val('')
    $('#data').html('')
    $('#callback').removeClass('callback-yes').removeClass('callback-no').html('')
}

$(window.document).on('click', '#modal', hideModal)

$('#send').on('click', function() {
    var message = $('#message').val()
    var payload = $('#data').text()
    var callback = $('#callback').hasClass('callback-yes')

    if (message.length < 6) return window.alert('You must enter a valid message')
    if (payload.length < 2) return window.alert('You must enter a valid payload, at least empty JSON object...\n\n{}')

    var parsed = null
    try {
        parsed = JSON.parse(payload)
    } catch (e) {
        console.error(e)
        return window.alert('You must enter valid JSON:\n\n' + e.toString())
    }
    var id = addMessage(message, 'out', parsed, callback)
    console.debug('OUT: ', '(id=' + id + ')', message, parsed)
    if (true === useLocalStorage())
        localStorage[message] = JSON.stringify(parsed)
    if (true === callback) {
        console.time('id=' + id)
        socket.send(message, parsed, function(error, data, rsm) {
            var callback = $('#' + id).find('.callback')
            callback.addClass('zoomable')
            if (error) {
                callback.addClass('error')
                callback.html(JSON.stringify(error, null, 2).replace(/\n/g, '<br/>'))
            } else {
                callback.addClass('success')
                callback.html(JSON.stringify(data, null, 2).replace(/\n/g, '<br/>'))
                if (null != rsm) {
                    callback.addClass('rsm')
                    callback.attr('title', JSON.stringify(rsm))
                }
            }
            console.log('Response', '(id=' + id + ')', error, data, rsm)
            console.timeEnd('id=' + id)
        })
    } else {
        socket.send(message, parsed)
    }
    clearForm()
})

/* jshint -W117 */
$(window.document).ready(function() {

    console.log('Page loaded...')
            
    socket = new Primus('//' + window.document.location.host)
    socket.on('error', function(error) { console.log(error); })

    socket.on('open', function() {
        console.log('Connected')
        getMessages('/manual/ping', 2000)
        getMessages('/manual/ad-hoc-commands', 2000)
        getMessages('/manual/message-archive-management', 2000)
        getMessages('/manual/service-discovery', 2000)
        getMessages('/manual/multi-user-chat', 2000)
        getMessages('/manual/publish-subscribe', 2000)
        getMessages('/manual/jabber-search', 2000)
        getMessages('/manual/jabber-rpc', 2000)
        getMessages('/manual/in-band-registration', 2000)
        getMessages('/manual/extensions', 2000)
        getMessages('/manual/extensions/buddycloud', 2000)
        getMessages('/manual/core')
        getMessages()
    })

    socket.on('timeout', function(reason) {
        console.log('Connection failed: ' + reason)
    })

    socket.on('end', function() {
        addMessage('exit(0)', 'in', 'SOCKET CONNECTION CLOSED', false)
        socket = null
    })
})
