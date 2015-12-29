/**
 * ******************************************************************************************************
 *
 *   Defines a chat feature
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 * ******************************************************************************************************
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');
var Routes = require('./Routes');
var ChatController = require('./controller/ChatController');
var ChatService = require('./service/ChatService');

class Feature extends FeatureBase {

    constructor() {
        super('chat');
        this.routes = Routes;
    }

    execute() {
        this.controller('ChatController', ChatController);
        this.service('ChatService', ChatService);
    }
}

module.exports = Feature;
