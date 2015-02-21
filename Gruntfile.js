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
                src: ['bower_components/jquery/dist/jquery.js', 'src/script.js'],
                dest: 'static/script.js'
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
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-uglify');

    //grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('distribution', ['sass', 'concat', 'emberTemplates', 'preprocess:dist', 'cssmin:dist', 'uglify:dist']);
};
