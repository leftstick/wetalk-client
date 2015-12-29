/**
 *  Entrance of common ui
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';

var autofocus = require('./Autofocus');
var confirm = require('./Confirm');
var dialog = require('./Dialog');
var info = require('./Info');
var toast = require('./Toast');

module.exports = [
    autofocus,
    confirm,
    dialog,
    info,
    toast
];
