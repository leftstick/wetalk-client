/**
 *  Entrance of common listener
 *
 *  @author  Howard.Zuo
 *  @date    Feb 15, 2016
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
