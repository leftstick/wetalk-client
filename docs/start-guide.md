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
gulp watch --api http://[server_address]:[server_port]/
```

>`api` is optional, `http://127.0.0.1:3000/` is used by default

If you are encountering error as following:

![](./imgs/builderror.png)

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
gulp release --api http://[server_address]:[server_port]/
```

>`api` is optional, `http://127.0.0.1:3000/` is used by default

Two applications will be generated in `./dist/` for `windows-x64`, `osx-x64` platforms.
