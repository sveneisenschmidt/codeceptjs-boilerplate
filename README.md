# codeceptjs-boilerplate

## Installation

```
make build
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
Connect with a preferred VNC client to 0.0.0.0:59001, the password is `secret`.
```
$ make start-selenium
Selenium VNC server is running at 0.0.0.0:59001
```

## Todo

1) Patch `node_modules/codeceptjs/lib/command/run-multiple.js`:`147`
```js
  // override tests configuration
  if (overriddenConfig.tests) {
    overriddenConfig.tests = suiteConf.tests;
  }
```

2) Replace function `loadTests`in `node_modules/codeceptjs/lib/codecept.js`:`86`
```js
  loadTests(pattern) {
    pattern = pattern || this.config.tests;

    let options = {
      cwd: global.codecept_dir
    };

    glob.sync(pattern, options).forEach((file) => {
      this.testFiles.push(fsPath.resolve(file));
    });
  }
```
