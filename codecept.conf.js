let config = {
	'tests': 'features/*_test.js',
	'timeout': 10000,
	'output': './output',
	'helpers': {
		'WebDriverIO': {
			'url': 'https://www.google.com',
			'browser': 'chrome',
			'host': 'selenium-hub',
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

let multiple = {
	'my_parallel_suite': {
		'chunks': 2,
		'browsers': [config.helpers.WebDriverIO]
	}
};

exports.config = {...config, multiple };