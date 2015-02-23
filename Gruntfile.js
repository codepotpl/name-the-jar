module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dev: {
                options: {
                    includePaths: ['bower_components/foundation/scss']
                },
                files: {
                    'static/style.css': 'src/style.scss'
                }
            }
        },

        jade: {
            compile: {
                files: {
                    "index.html": ["src/index.jade"]
                }
            }
        },

        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/foundation/js/foundation/foundation.js',
                    'bower_components/foundation/js/foundation/foundation.equalizer.js',
                    'bower_components/foundation/js/foundation/foundation.clearing.js',
                    'src/script.js'
                ],
                dest: 'static/script.js'
            }
        },

        cssmin: {
            dist: {
                files: {
                    'static/style.css': ['static/style.css']
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'static/modernizr.js': ['static/modernizr.js'],
                    'static/script.js': ['static/script.js']
                }
            }
        },

        watch: {
            sass: {
                files: 'src/style.scss',
                tasks: ['sass']
            },
            jade: {
                files: 'src/index.jade',
                tasks: ['jade']
            },
            js: {
                files: 'src/script.js',
                tasks: ['concat']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-ember-templates');
    //grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('distribution', ['sass', 'concat', 'cssmin', 'uglify:dist']);
};
