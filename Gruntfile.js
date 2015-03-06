'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            js: "src/",
            build: "dist"
        },

        banner: "\n" +
            "/*\n" +
            " * -------------------------------------------------------\n" +
            " * Project: <%= pkg.title %>\n" +
            " * Version: <%= pkg.version %>\n" +
            " *\n" +
            " * Author:  <%= pkg.author.name %>\n" +
            " * Site:     <%= pkg.author.url %>\n" +
            " * Contact: <%= pkg.author.email %>\n" +
            " *\n" +
            " *\n" +
            " * Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %>\n" +
            " * -------------------------------------------------------\n" +
            " */\n" +
            "\n",

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    'src/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            // dist: [
            //     '.tmp',
            //     '<%= dirs.build %>/{,*/}*',
            //     '!<%= dirs.build %>/.git{,*/}*'
            //   ]
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= dirs.build %>/{,*/}*',
                        '!<%= dirs.build %>/.git{,*/}*'
                    ]
                }]
            }
        },

        uglify: {
            options: {
                mangle: false,
                banner: '<%= banner %>'
            },
            dist: {
                files: {
                    "<%= dirs.build %>/ss-validate.min.js": "<%= dirs.js %>/**/*.js"
                }
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: '<%= dirs.build %>/<%= pkg.name %>.min.js'
            }
        },

        watch: {
            js: {
                options: {
                    spawn: true,
                    interrupt: true,
                    debounceDelay: 250
                },
                files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
                tasks: ['mochaTest']
            }
        },

        browserify: {
            main: {
                src: ['src/**/*.js'],
                dest: '<%= dirs.build %>/ss-validate.js'
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false) 
                    require: 'should'
                },
                src: ['test/**/*.js']
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['clean', 'mochaTest', 'browserify', 'uglify']);
};