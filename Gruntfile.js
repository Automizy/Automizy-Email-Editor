module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        requirejs: {
            compile: {
                options: {
                    baseUrl: "src/",
                    paths: {
                       AutomizyEmailEditor: ''
                    },
                    name: "AutomizyEmailEditor/aee",
                    optimize: "none",
                    out: "dist/automizy-email-editor.js"
                }
            },
            css: {
                options: {
                    cssIn: "src/aee.css",
                    out: "dist/automizy-email-editor.css"
                }
            },
            cssMin: {
                options: {
                    cssIn: "dist/automizy-email-editor.css",
                    optimizeCss: "default",
                    out: "dist/automizy-email-editor.min.css"
                }
            }
        },
		uglify: {
			all: {
				files: {
					"dist/automizy-email-editor.min.js": ["dist/automizy-email-editor.js"]
				},
				options: {
					preserveComments: false,
					sourceMap: true,
					sourceMapName: "dist/automizy-email-editor.min.map",
					report: "min",
					beautify: {
						"ascii_only": true
					},
					compress: {
						hoist_funs: false,
						loops: false,
						unused: false,
						dead_code: false,
						conditionals: false,
						comparisons: false,
						evaluate: false,
						booleans: false,
						if_return: false,
						join_vars: false,
						warnings: false,
						negate_iife: false, //
						drop_console: false
					}
				}
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, cwd: '.bower/automizy-js/dist/', src: 'automizy.min.*', dest: 'src/vendor/automizy-js'},
					{expand: true, cwd: '.bower/automizy-js-api/dist/', src: 'automizy.api.min.*', dest: 'src/vendor/automizy-js-api'},
					{expand: true, cwd: '.bower/jquery/dist/', src: 'jquery.min.*', dest: 'src/vendor/jquery'},
					{expand: true, cwd: '.bower/jquery-cookie/', src: 'jquery.cookie.js', dest: 'src/vendor/jquery-cookie'},
					{expand: true, cwd: '.bower/jquery-mousewheel/', src: 'jquery.mousewheel.min.js', dest: 'src/vendor/jquery-mousewheel'},
					{expand: true, cwd: '.bower/tinymce/', src: '**/*', dest: 'src/vendor/tinymce'},
					{expand: true, cwd: '.bower/jquery-file-upload/js/', src: '**/*', dest: 'src/vendor/jquery-file-upload'},
					{expand: true, cwd: '.bower/jquery-ui/', src: 'jquery-ui.min.js', dest: 'src/vendor/jquery-ui'},
					{expand: true, cwd: '.bower/jquery-ui/themes/smoothness/', src: 'images/*', dest: 'src/vendor/jquery-ui'},
					{expand: true, cwd: '.bower/jquery-ui/themes/smoothness/', src: 'jquery-ui.min.css', dest: 'src/vendor/jquery-ui'},
					{expand: true, cwd: '.bower/jquery-ui/themes/smoothness/', src: 'theme.css', dest: 'src/vendor/jquery-ui'},
					{expand: true, cwd: '.bower/jquery-ui-timepicker-addon/dist/', src: 'jquery-ui-timepicker-addon.*', dest: 'src/vendor/jquery-ui-timepicker-addon'},
					{expand: true, cwd: '.bower/jquery-ui-multiselect/', src: 'jquery.multiselect*.css', dest: 'src/vendor/jquery-ui-multiselect'},
					{expand: true, cwd: '.bower/jquery-ui-multiselect/src/', src: 'jquery.multiselect*.js', dest: 'src/vendor/jquery-ui-multiselect'},
					{expand: true, cwd: '.bower/jquery-ui-tag-it/js/', src: 'tag-it.min.js', dest: 'src/vendor/jquery-ui-tag-it'},
					{expand: true, cwd: '.bower/jquery-ui-tag-it/css/', src: 'jquery.tagit.css', dest: 'src/vendor/jquery-ui-tag-it'},
					{expand: true, cwd: '.bower/jqueryui-touch-punch/', src: 'jquery.ui.touch-punch.min.js', dest: 'src/vendor/jqueryui-touch-punch'},
					{expand: true, cwd: '.bower/iphone-style-checkboxes/jquery/', src: 'iphone-style-checkboxes.js', dest: 'src/vendor/iphone-style-checkboxes'},
					{expand: true, cwd: '.bower/iphone-style-checkboxes/', src: 'style.css', dest: 'src/vendor/iphone-style-checkboxes'},
					{expand: true, cwd: '.bower/iphone-style-checkboxes/', src: 'images/**', dest: 'src/vendor/iphone-style-checkboxes'},
					{expand: true, cwd: '.bower/requirejs/', src: 'require.js', dest: 'src/vendor/requirejs'},
					{expand: true, cwd: '.bower/prettify/src', src: 'prettify.js', dest: 'src/vendor/prettify'},
					{expand: true, cwd: '.bower/prettify/styles', src: 'sunburst.css', dest: 'src/vendor/prettify'},
                    {expand: true, cwd: '.bower/colpick/js', src: 'colpick.js', dest: 'src/vendor/colpick'},
					{expand: true, cwd: '.bower/colpick/css', src: 'colpick.css', dest: 'src/vendor/colpick'},
                    {expand: true, cwd: '.bower/hammer.js', src: 'hammer.min.js', dest: 'src/vendor/hammer.js'},
                    {expand: true, cwd: '.bower/jquery.nicescroll', src: 'jquery.nicescroll.min.js', dest: 'src/vendor/jquery.nicescroll'}
				]
			},
			copytodist: {
				files: [
                    {expand: true, cwd: 'src/vendor/', src: '**/*', dest: 'dist/vendor'},
                    {expand: true, cwd: 'src/images/', src: '**/*', dest: 'dist/images'},
					{expand: true, cwd: 'src/vendor/', src: '**/*', dest: 'doc/dist/vendor'},
					{expand: true, cwd: 'src/images/', src: '**/*', dest: 'doc/dist/images'},

					{expand: true, cwd: 'src/vendor/', src: '**/*', dest: 'examples/1/vendor'},
					{expand: true, cwd: 'src/images/', src: '**/*', dest: 'examples/1/images'},
					{expand: true, cwd: 'dist/', src: 'automizy-email-editor.min.js', dest: 'examples/1'},
					{expand: true, cwd: 'dist/', src: 'automizy-email-editor.min.css', dest: 'examples/1'}
				]
			}
		},
        compress: {
            main: {
                options: {
                    archive: 'dist/automizy-email-editor.zip'
                },
                files: [
                    {
                        expand: true,
                        cwd : "dist/",
                        src: [
                            './vendor/**',
                            './images/**',
                            '*.js',
                            '*.css',
                            '*.map'
                        ]
                    }
                ]
            }
        },
    });
	
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadTasks('build/tasks');
    grunt.registerTask("default", ["requirejs", "require_clear", "uglify", "copy:main", "copy:copytodist", "compress"]);
    grunt.registerTask("bower", ["copy"]);
};

