module.exports = function( grunt ) {
	grunt.registerTask( "require_clear", function(arg1) {
		var jsFile = grunt.config([ 'requirejs', 'compile' ]).options.out;
		var fs = require('fs');
		var data = fs.readFileSync(jsFile);
		
		data = data.toString().replace(/requirejs.config[^;]*;/, '');
		data = data.toString().replace(/define\([^{]*{/g, '/*GRUNT_FLAG_1*/');
		data = data.toString().replace(/}\s*\)\s*;[\s]*\/\*GRUNT_FLAG_1\*\//g, '/*GRUNT_FLAG_2*/');
		data = data.toString().replace(/}\s*\)\s*;\s*$/, '/*GRUNT_FLAG_3*/');
		
		data = data.toString().replace(/\/\*GRUNT_FLAG_1\*\//g, "(function(){");
		data = data.toString().replace(/\/\*GRUNT_FLAG_2\*\//g, "})();\r\n\r\n(function(){");
		data = data.toString().replace(/\/\*GRUNT_FLAG_3\*\//g, "})();");
		
		fs.writeFileSync(jsFile, data);
	});
};