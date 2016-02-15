/**
 *  Defines the ChatRoomContoller controller
 *
 *  @author  Howard.Zuo
 *  @date    Feb 15, 2016
 *
 */
'use strict';

var io = require('socket.io-client');
var mainWindow = require('electron').remote.getCurrentWindow();

var ChatRoomContoller = function($scope, utils){

    $scope.messages = [];

    var loginUser = $scope.state.loginUser;

    var joinedGroup = $scope.state.joinedGroup;

    var chat = io(utils.getApi(joinedGroup.name), {
        multiplex: false
    });

    chat.on('connect', function(){
        chat.emit('init', loginUser.id);
    });

    chat.on('message', function(message){
        $scope.$apply(function(){
            $scope.messages.push(message);
        });

        if (mainWindow.isFocused()){
            return;
        }
        new Notification('Message', {
            body: message.user.nickname + '  ' + message.data
        });
    });

    chat.on('group-user-added', function(user){
        $scope.$apply(function(){
            $scope.messages.push({
                user: user,
                type: 'user-notify',
                data: 'joined ' + joinedGroup.name
            });
        });
    });

    chat.on('group-user-removed', function(user){
        $scope.$apply(function(){
            $scope.messages.push({
                user: user,
                type: 'user-notify',
                data: 'left ' + joinedGroup.name
            });
        });
    });

    $scope.submitMessage = function(text){
        var message = { user: loginUser, type: 'normal', data: text };
        chat.emit('message', message);
        $scope.messages.push(message);
    };

    $scope.showUsers = function($mdOpenMenu, ev){
        $mdOpenMenu(ev);
    };

    $scope.$on('$destroy', function(){
        chat.disconnect();
    });
};

ChatRoomContoller.$inject = ['$scope', 'utils'];

module.exports = ChatRoomContoller;
