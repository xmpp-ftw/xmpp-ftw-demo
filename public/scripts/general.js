'use strict';

$('div.link.demo').on('click', function(e) {
    e.preventDefault()
    e.stopPropagation()
    window.document.location.href = '/demo'
})

$('div.link.install').on('click', function(e) {
    e.preventDefault()
    e.stopPropagation()
    window.document.location.href = '/install'
})

$('div.link.beginner').on('click', function(e) {
    e.preventDefault()
    e.stopPropagation()
    window.document.location.href = '/getting-started'
})