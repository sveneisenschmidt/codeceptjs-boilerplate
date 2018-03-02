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

// Creates a glob pattern based on a list
const createGlob = (list) => {
	let pattern = list.join(',');
	return pattern.indexOf(',') > -1 ?  `{${pattern}}` : pattern;
}

module.exports = (path, size, config) => {
    let files = findFiles(path);
    let chunkSize = Math.ceil(files.length/size);
    let chunks = createChunks(files, chunkSize);
    let groups = {};

    chunks.forEach((chunk, index) => {
        groups[index] = {
            ...config,
            'tests': createGlob(chunk.map((item) => `${path}/${item}`)),
        };
    });

    return groups;
};