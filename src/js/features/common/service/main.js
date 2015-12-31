/**
 *  Entrance of common service
 *
 *  @author  Howard.Zuo
 *  @date    Dec 31, 2015
 *
 */
'use strict';

var auth = require('./Auth');
var http = require('./Http');
var storageService = require('./StorageService');

module.exports = [auth, http, storageService];
