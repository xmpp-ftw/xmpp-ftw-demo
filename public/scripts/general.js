$('div.link.demo').on('click', function(e) {
    e.preventDefault()
    e.stopPropagation()
    document.location.href = '/demo'
})

$('div.link.install').on('click', function(e) {
    e.preventDefault()
    e.stopPropagation()
    document.location.href = '/install'
})

$('div.link.beginner').on('click', function(e) {
    e.preventDefault()
    e.stopPropagation()
    document.location.href = '/getting-started'
})