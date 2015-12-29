/**
 *  Entrance of common service
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';

var http = require('./Http');
var storageService = require('./StorageService');

module.exports = [http, storageService];
