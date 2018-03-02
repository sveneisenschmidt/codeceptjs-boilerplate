
const createMultiple = require('./lib/create-multiple.js');



// Configuration
const parallelCount = 3;

let config = {
	'tests': 'features/*_test.js',
	'timeout': 10000,
	'output': './output',
	'helpers': {
		'WebDriverIO': {
			'url': 'https://www.google.com',
			'browser': 'chrome',
			'host': 'selenium.local',
			'port': 4444
		}
	},
	'include': {
		'I': './support/steps_file.js'
	},
	'bootstrap': false,
	'mocha': {},
	'name': 'data'
}

config.multiple = createMultiple(
	parallelCount,
	config.tests,  
	{ 'browsers': [config.helpers.WebDriverIO] }
);

exports.config = config;