/**
 *  Defines the ChatRoomContoller controller
 *
 *  @author  Howard.Zuo
 *  @date    Dec 30, 2015
 *
 */
'use strict';

var config = require('etc/config');
var io = require('socket.io-client');

var ChatRoomContoller = function($scope, ChatService, $routeParams) {

    $scope.messages = [];

    var chat = io.connect(config.apiRoot + $scope.state.joinedGroup.id);

    chat.on('connect', function() {
        if ($scope.loginUser) {
            return chat.emit('init', $scope.loginUser.id);
        }

        ChatService.getUser($routeParams.id)
            .success(function(user) {
                $scope.loginUser = user;
            });
    });

    chat.on('message', function(message) {
        $scope.messages.push(message);
    });

    $scope.state = {};

    $scope.submitMessage = function(message) {
        chat.emit('message', {
            user: $scope.loginUser,
            type: 'normal',
            data: message
        });
    };

    $scope.$on('$destroy', function() {
        chat.disconnect();
    });
};

ChatRoomContoller.$inject = [
    '$scope',
    'ChatService',
    '$routeParams'
];

module.exports = ChatRoomContoller;
