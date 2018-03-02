const fsPath = require('path');
const glob = require('glob');

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
const findFiles = (pattern) => {
    let files = [];

    glob.sync(pattern).forEach((file) => {
        files.push(fsPath.resolve(file));
    });

	return files;
};

// Creates a glob pattern based on a list
const createGlob = (list) => {
	let pattern = list.join(',');
	return pattern.indexOf(',') > -1 ?  `{${pattern}}` : pattern;
}

module.exports = (size, pattern, config) => {
    let files = findFiles(pattern);
    let chunkSize = Math.ceil(files.length/size);
    let chunks = createChunks(files, chunkSize);
    let groups = {};

    chunks.forEach((chunk, index) => {
        groups[index] = {
            ...config,
            'tests': createGlob(chunk),
        };
    });

    return groups;
};