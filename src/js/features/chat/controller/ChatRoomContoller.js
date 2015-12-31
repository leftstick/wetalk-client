/**
 *  Defines the ChatRoomContoller controller
 *
 *  @author  Howard.Zuo
 *  @date    Dec 31, 2015
 *
 */
'use strict';

var io = require('socket.io-client');

var ChatRoomContoller = function($scope, utils, ChatService, $routeParams) {

    $scope.messages = [];

    var chat = io.connect(utils.getApi($scope.state.joinedGroup.id + ''));

    chat.on('connect', function() {
        if ($scope.state.loginUser) {
            return chat.emit('init', $scope.state.loginUser.id);
        }

        ChatService.getUser($routeParams.id)
            .success(function(user) {
                $scope.state.loginUser = user;
            });
    });

    chat.on('message', function(message) {
        $scope.$apply(function() {
            $scope.messages.push(message);
        });
    });

    $scope.state = {};

    $scope.submitMessage = function(message) {
        chat.emit('message', {
            user: $scope.state.loginUser,
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
    'utils',
    'ChatService',
    '$routeParams'
];

module.exports = ChatRoomContoller;
