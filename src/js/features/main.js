/**
 *  Entrance of features
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';
var chat = require('./chat/main');
var login = require('./login/main');
var common = require('./common/main');

module.exports = [chat, login, ...common];
