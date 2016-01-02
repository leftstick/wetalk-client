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
        if (user.id === loginUser.id) {
            return;
        }
        $scope.$apply(function() {
            $scope.messages.push({
                user: user,
                type: 'user-notify',
                data: 'joined ' + $scope.state.joinedGroup.name
            });
        });
    });

    chat.on('group-user-removed', function(user) {
        $scope.$apply(function() {
            $scope.messages.push({
                user: user,
                type: 'user-notify',
                data: 'left ' + $scope.state.joinedGroup.name
            });
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
