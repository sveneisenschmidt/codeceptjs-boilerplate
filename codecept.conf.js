const fs = require('fs');

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

		let createChunks = function(list, groupsize){
			var sets = [], chunks, i = 0;
			chunks = list.length / groupsize;
			while(i < chunks){
				sets[i] = list.splice(0,groupsize);
				i++;
			}
			return sets;
		};

		let files = [];
		fs.readdirSync('features/').forEach(file => {
			files.push(file);
		});

		let chunkSize = Math.ceil(files.length/parallelCount);
		let chunks = createChunks(files, chunkSize);

		let groups = {};
		chunks.forEach((chunk, index) => {
			groups[index] = {
				'tests': chunk.map((item) => {
					return `features/${item}`
				}).join(','),
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