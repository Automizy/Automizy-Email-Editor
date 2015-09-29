module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
		copy: {
			main: {
				files: [
					{expand: true, cwd: '.bower/jquery/dist/', src: 'jquery.min.*', dest: 'www/vendor/jquery'},
					{expand: true, cwd: '.bower/automizy-email-editor/dist/', src: '**/*', dest: 'www/vendor/automizy-email-editor'}
				]
			}
		}
    });
	
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask("default", ["copy"]);
    grunt.registerTask("bower", ["copy"]);
};

