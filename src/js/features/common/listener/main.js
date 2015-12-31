/**
 *  Entrance of common listener
 *
 *  @author  Howard.Zuo
 *  @date    Dec 31, 2015
 *
 */
'use strict';

var logout = require('./LogoutListener');
var menu = require('./MenuListener');
var indicator = require('./RouteIndicator');
var routeListener = require('./RouteListener');

module.exports = [
    logout,
    menu,
    indicator,
    routeListener
];
