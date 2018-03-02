
const createMultiple = require('./lib/create-multiple.js');



// Configuration
const parallelCount = 3;
const WebDriverIO = {
	'url': 'https://www.google.com',
	'browser': 'chrome',
	'host': 'selenium.local',
	'port': 4444
};

exports.config = {
	'tests': 'features/*_test.js',
	'timeout': 10000,
	'output': './output',
	'multiple': createMultiple(
		'./features', 
		parallelCount, 
		{ 'browsers': [WebDriverIO] }
	),
	'helpers': {
		'WebDriverIO': WebDriverIO 
	},
	'include': {
		'I': './support/steps_file.js'
	},
	'bootstrap': false,
	'mocha': {},
	'name': 'data'
}