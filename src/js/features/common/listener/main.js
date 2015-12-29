/**
 *  Entrance of common listener
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';

var indicator = require('./RouteIndicator');
var routeListener = require('./RouteListener');

module.exports = [indicator, routeListener];
