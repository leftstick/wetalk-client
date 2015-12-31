## Prerequisites ##

1. Install [node](https://nodejs.org/)
2. Install [gulp](https://github.com/gulpjs/gulp) globally, for example: `npm install -g gulp`

## debug ##

### Install Dependencies ###

```bash
npm install
```

### Launch compiler watcher ###

Type below command in ternimal:

```bash
#This task help compile code whenever changed
gulp watch
```

If you are encountering error as following:

![](./docs/imgs/builderror.png)

execute `gulp fix` task, and try `gulp watch` again

### Launch dev electron ###

Type below command in terminal:

```bash
gulp dev
```

> Use `ctrl + shift + i`(for windows), or`cmd + option + i`(for mac) to open `DevTools`

Once code modified, press `ctrl + r`(for windows) or `cmd + r`(for mac) to check the updates

## Generate Application ##

Type below command in terminal:

```bash
gulp release
```

Two applications will be generated in `./dist/` for `windows-x64`, `osx-x64` platforms.
