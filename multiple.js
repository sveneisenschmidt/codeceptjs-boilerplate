const glob = require('glob');
const path = require('path');
const fs = require('fs');

const splitFiles = (list, size) => {
  const sets = [];
  const chunks = list.length / size;
  let i = 0;

  while (i < chunks) {
    sets[i] = list.splice(0, size);
    i++;
  }

  return sets;
};

const findFiles = (pattern) => {
  const files = [];

  glob.sync(pattern).forEach((file) => {
    files.push(path.resolve(file));
  });

  return files;
};

const flattenFiles = (list) => {
  const pattern = list.join(',');
  return pattern.indexOf(',') > -1 ? `{${pattern}}` : pattern;
};

const grepFiles = (file, grep) => {
  const contents = fs.readFileSync(file);
  const pattern = new RegExp(`((Scenario|Feature)\(.*${grep}.*\))`, 'g'); // <- How future proof/solid is this?
  return !!pattern.exec(contents);
};

const createMultiple = (chunkSize, config, helperName = false) => {
    const files = findFiles(config.tests).filter((file) => {
        return config.grep ? grepFiles(file, config.grep) : true;
    });

    if (!helperName) {
      ['WebDriverIO', 'Protractor', 'Puppeteer', 'Nightmare'].forEach((lookupHelperName) => {
        if (!helperName && config.helpers[lookupHelperName]) {
          helperName = lookupHelperName;
        }
      });
    }

    const size = Math.ceil(files.length / chunkSize);
    const chunks = splitFiles(files, size);
    
    return chunks.map((chunkFiles) => {
        return {
          browsers: [ config.helpers[helperName] ],
          tests: flattenFiles(chunkFiles) 
        };
    });
};

module.exports = {
  createMultiple
};