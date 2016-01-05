'use strict';
process.env.ELECTRON_HIDE_INTERNAL_MODULES = 'true';

var electron = require('electron');
var app = electron.app;

var launcher = require('./Launcher');

//launch the app
launcher(app)
    .then(function(win) {
        return win;
    });
