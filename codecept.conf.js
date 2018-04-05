

const { createMultiple } = require('./multiple.js');

let config = {
	tests: 'features/*_test.js',
	timeout: 10000,
	output: './output',
	helpers: {
		WebDriverIO: {
			url: 'https://www.google.com',
			browser: 'chrome',
			host: 'selenium-hub',
		}
	},
	include: {
		I: './support/steps_file.js'
	},
	bootstrap: false,
	mocha: {}
}

exports.config = { ...config, multiple: createMultiple(2, config) };