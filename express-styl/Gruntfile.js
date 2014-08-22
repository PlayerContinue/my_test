module.exports = function(grunt)
{
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		karma:
		{
			unit:
			{
				configFile: 'test/karma.conf.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-karma');

	//default tasks
	grunt.registerTask('default', ['karma']);
};
