# codeceptjs-boilerplate

## Installation

```
make install
```

## Tests

Start the Selelnium Server first so you can connect to thr VNC server beforehand.
Although through container linking the Selenium Server container will be started automatically.
```
$ make start-selenium
Selenium VNC server is running at 0.0.0.0:59001
```

```
$ make shell
$ npm test

> codeceptjs-boilerplate@1.0.0 test /data
> codeceptjs run --steps

CodeceptJS v1.1.5
Using test root "/data"

Example --
 test something
 • I am on page "/?hl=en"
 • I see "Sign in"
 ✓ OK in 1193ms


  OK  | 1 passed   // 1s
```
```
# stop selenium server
$ make stop-selenium
```

## Other

### Start interactive shell
```
$ make shell
```

### Start debugging via VNC
Connect with a preferred VNC client to 0.0.0.0:59001/59002, the password is `secret`.
```
$ make start-selenium
Chrome #1 VNC server is running at 0.0.0.0:59001
Chrome #2 VNC server is running at 0.0.0.0:59002
```

## Todo

1) Move contents to `node_modules/codeceptjs/lib/chunk.js`
```js
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const split = (list, size)  => {
    let sets = [];
    let chunks = list.length / size;
    let i = 0;

    while (i < chunks) {
        sets[i] = list.splice(0, size);
        i++;
    }

    return sets;
};

const find = (pattern) => {
    let files = [];

    glob.sync(pattern).forEach((file) => {
        files.push(path.resolve(file));
    });

    return files;
};

const flatten = (list) => {
    let pattern = list.join(',');
    return pattern.indexOf(',') > -1 ?  `{${pattern}}` : pattern;
};

const grep = (file, grep) => {
    const contents = fs.readFileSync(file);
    const pattern = new RegExp(`((Scenario|Feature)\(.*${grep}.*\))`, 'g'); // <- How future proof/solid is this?
    return !!pattern.exec(contents);
};

const create = (config, pattern) => {
    let files = find(pattern).filter((file) => {
        return !!config.grep ? grep(file, config.grep) : true;
    });

    const size = Math.ceil(files.length/config.chunks);
    let chunks = split(files, size);
    let chunkConfig = { ...config };

    delete chunkConfig.chunks;

    return chunks.map((chunkFiles) => {
        return { ...chunkConfig, tests: flatten(chunkFiles) }
    });
}

module.exports = {
    createChunks: create
};

```

2. Patch `node_modules/codeceptjs/command/run-multiple.js`
```js
// Line 12
const chunk = require('../chunk');
// ..
// Line 58
  suites.forEach((suite, index) => {
    // get suites
    const [suiteName, browser] = suite.split(':');
    const suiteConfig = configMultiple[suiteName];

    if (!suiteConfig) {
      throw new Error(`Suite ${suiteName} was not configured in "multiple" section of config`);
    }
    let pattern = config.tests || null;
    if(!suiteConfig.chunks || !Number.isFinite(suiteConfig.chunks) || !pattern) {
      return;
    }

    delete suites[index];
    chunk.createChunks(suiteConfig, pattern).forEach((suiteChunkConfig, index) => {
      let chunkSuiteName = `${suite}--chunk${index+1}`;
      configMultiple[chunkSuiteName] = suiteChunkConfig;
      suites.push(chunkSuiteName);
    });
  });
```