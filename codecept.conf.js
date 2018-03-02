
const withMultiple = require('./lib/with-multiple.js');

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

exports.config = withMultiple(
	2, // how many parallel runs
	config, // the default configuration
	'WebDriverIO' // what helper should be used
);