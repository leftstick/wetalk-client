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
var CreateGroupController = require('./controller/CreateGroupController');
var ChatService = require('./service/ChatService');

class Feature extends FeatureBase {

    constructor() {
        super('chat');
        this.routes = Routes;
    }

    execute() {
        this.controller('ChatController', ChatController);
        this.controller('CreateGroupController', CreateGroupController);
        this.service('ChatService', ChatService);
    }
}

module.exports = Feature;
