/**
 *  Defines the ChatRoomContoller controller
 *
 *  @author  Howard.Zuo
 *  @date    Jan 1, 2016
 *
 */
'use strict';

var io = require('socket.io-client');

var ChatRoomContoller = function($scope, utils) {

    $scope.messages = [];
    var chat = io.connect(utils.getApi($scope.state.joinedGroup.id + ''));

    chat.on('connect', function() {
        chat.emit('init', $scope.state.loginUser.id);
    });

    chat.on('message', function(message) {
        $scope.$apply(function() {
            $scope.messages.push(message);
        });
    });

    chat.on('group-user-updated', function(users) {
        $scope.$apply(function() {
            $scope.users = users;
        });
    });

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

ChatRoomContoller.$inject = ['$scope', 'utils'];

module.exports = ChatRoomContoller;
