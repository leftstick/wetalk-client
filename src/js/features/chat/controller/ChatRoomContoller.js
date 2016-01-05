/**
 *  Defines the ChatRoomContoller controller
 *
 *  @author  Howard.Zuo
 *  @date    Jan 5, 2016
 *
 */
'use strict';

var io = require('socket.io-client');
var Tray = require('electron').remote.Tray;
var nativeImage = require('electron').remote.nativeImage;

var ChatRoomContoller = function($scope, utils) {

    $scope.messages = [];

    var loginUser = $scope.state.loginUser;

    var joinedGroup = $scope.state.joinedGroup;

    var chat = io(utils.getApi(joinedGroup.name), {
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
            $scope.messages.push({
                user: user,
                type: 'user-notify',
                data: 'joined ' + joinedGroup.name
            });
        });
    });

    chat.on('group-user-removed', function(user) {
        $scope.$apply(function() {
            $scope.messages.push({
                user: user,
                type: 'user-notify',
                data: 'left ' + joinedGroup.name
            });
        });
    });

    $scope.submitMessage = function(text) {
        var message = {user: loginUser, type: 'normal', data: text};
        chat.emit('message', message);
        $scope.messages.push(message);

        var isWin = /^win/.test(process.platform);

        if (isWin) {
            Tray.displayBalloon({
                icon: nativeImage.createFromPath(require('img/message-icon.png')),
                content: 'Lorem Ipsum Dolor Sit Amet'
            });
            return;
        }

        var myNotification = new Notification('Title', {
            body: 'Lorem Ipsum Dolor Sit Amet',
            icon: require('img/message-icon.png')
        });
    };

    $scope.showUsers = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    };

    $scope.$on('$destroy', function() {
        chat.disconnect();
    });
};

ChatRoomContoller.$inject = ['$scope', 'utils'];

module.exports = ChatRoomContoller;
