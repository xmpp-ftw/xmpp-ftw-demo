'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            allFiles: ['Gruntfile.js', './node_modules/xmpp-ftw-*/tests/**/*.js',
                       'index.js', 'routes.js', './public/**/*.js'],
            options: {
                jshintrc: '.jshintrc',
            }
        },
        mochacli: {
            all: ['test/**/*.js'],
            options: {
                reporter: 'spec',
                ui: 'tdd'
            }
        }
    })

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-mocha-cli')

    // Configure tasks
    grunt.registerTask('default', ['test'])
    grunt.registerTask('test', ['mochacli', 'jshint'])
}
