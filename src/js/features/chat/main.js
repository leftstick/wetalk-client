/**
 * ******************************************************************************************************
 *
 *   Defines a chat feature
 *
 *  @author  Howard.Zuo
 *  @date    Dec 30, 2015
 *
 * ******************************************************************************************************
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');
var Routes = require('./Routes');
var ChatController = require('./controller/ChatController');
var CreateGroupController = require('./controller/CreateGroupController');
var ChatRoomContoller = require('./controller/ChatRoomContoller');
var ChatService = require('./service/ChatService');
var ChatSender = require('./directive/ChatSender');
var Contenteditable = require('./directive/Contenteditable');

var chatroomTemplate = require('./partials/chatroom.html');

class Feature extends FeatureBase {

    constructor() {
        super('chat');
        this.routes = Routes;
    }

    execute() {
        this.controller('ChatController', ChatController);
        this.controller('CreateGroupController', CreateGroupController);
        this.controller('ChatRoomContoller', ChatRoomContoller);
        this.service('ChatService', ChatService);
        this.directive('chatSender', ChatSender);
        this.directive('contenteditable', Contenteditable);
        this.run([
            'utils',
            function(utils) {
                utils.cache('chatroomTemplate', chatroomTemplate);
            }
        ]);
    }
}

module.exports = Feature;
