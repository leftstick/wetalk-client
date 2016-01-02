/**
 *  Defines the ChatRoomContoller controller
 *
 *  @author  Howard.Zuo
 *  @date    Jan 2, 2016
 *
 */
'use strict';

var io = require('socket.io-client');

var ChatRoomContoller = function($scope, utils) {

    $scope.messages = [];

    var loginUser = $scope.state.loginUser;

    var chat = io(utils.getApi($scope.state.joinedGroup.id + ''), {
        multiplex: false
    });

    chat.on('connect', function() {
        chat.emit('init', loginUser.id);
    });

    chat.on('message', function(message) {
        $scope.$apply(function() {
            $scope.messages.push(message);
        });
    });

    chat.on('group-user-added', function(user) {
        $scope.$apply(function() {
            $scope.state.joinedGroup.users.push(user);
        });
    });

    chat.on('group-user-removed', function(user) {
        $scope.$apply(function() {
            $scope.state.joinedGroup.users.splice($scope.state.joinedGroup.users.findIndex(u => u.id === user.id), 1);
        });
    });

    $scope.submitMessage = function(message) {
        chat.emit('message', {
            user: loginUser,
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
