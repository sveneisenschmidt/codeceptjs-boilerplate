const fs = require('fs');

// Creates chunks from a list
const createChunks = (list, size) => {
    var sets = [], chunks, i = 0;
    chunks = list.length / size;
    while (i < chunks) {
        sets[i] = list.splice(0, size);
        i++;
    }
    return sets;
};

// Returns files from a directory
const findFiles = (directory) => {
	let files = [];
	fs.readdirSync(directory).forEach(file => {
		files.push(file);
	});
	return files;
};

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
	'multiple': (() => {

		let files = findFiles('features/');
		let chunkSize = Math.ceil(files.length/parallelCount);
		let chunks = createChunks(files, chunkSize);
		let groups = {};

		chunks.forEach((chunk, index) => {
			groups[index] = {
				'tests': chunk.map((item) => `features/${item}`).join(','),
				'browsers': [WebDriverIO]
			};
		});

		return groups;
	})(),
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