/**
 *  Defines the ChatController controller
 *
 *  @author  Howard.Zuo
 *  @date    Feb 15, 2016
 *
 */
'use strict';

var io = require('socket.io-client');
var CreateGroupTpl = require('../partials/createGroup.html');

var ChatController = function($scope, ChatService, Auth, $mdSidenav, $mdDialog, utils, events){

    var chatroom = io(utils.getApi('/chatroom'), { multiplex: false });

    chatroom.on('group-added', function(group){
        $scope.$apply(function(){
            $scope.groups.push(group);
        });
    });

    chatroom.on('group-removed', function(group){
        $scope.$apply(function(){
            $scope.groups.splice($scope.groups.findIndex(g => g.id === group.id), 1);
        });
    });

    chatroom.on('group-user-updated', function(group){
        $scope.$apply(function(){
            $scope.groups.find(g => g.id === group.id).users = group.users;
            if ($scope.state.joinedGroup && $scope.state.joinedGroup.id === group.id){
                $scope.state.joinedGroup.users = group.users;
            }
        });
    });

    $scope.state = { };
    $scope.state.loginUser = Auth.loggedInUser();

    ChatService.getGroups()
        .success(function(groups){
            $scope.groups = groups;
        });

    $scope.toggleGroupsPanel = function(componentId){
        $mdSidenav(componentId).toggle();
    };

    $scope.createGroup = function($event){
        $mdDialog.show({
            controller: 'CreateGroupController',
            template: CreateGroupTpl,
            targetEvent: $event,
            clickOutsideToClose: true
        })
            .then(function(answer){
                $scope.joinGroup(answer);
            });
    };

    $scope.joinGroup = function(group){
        if ($scope.state.joinedGroup && $scope.state.joinedGroup.id === group.id){
            return;
        }
        utils
            .delay(() => {
                delete $scope.state.joinedGroup;
            })
            .then(() => utils.delay(() => {
                $scope.state.joinedGroup = group;
            }));
    };

    $scope.quit = function(){
        events.emit('confirm', {
            title: 'Would you like to logout?',
            onComplete: function(){
                Auth.logout()
                    .success(function(){
                        utils.redirect('/login');
                    });
            }
        });
    };

    var quitGroup = function(){
        var index = $scope.state.joinedGroup.users.findIndex(u => u.id === $scope.state.loginUser.id);
        $scope.state.joinedGroup.users.splice(index, 1);
        utils
            .delay(() => {
                delete $scope.state.joinedGroup;
            });
    };

    var quitApp = function(){
        events.emit('confirm', {
            title: 'Would you like to quit?',
            onComplete: function(){
                Auth.logout()
                    .success(function(){
                        require('electron').remote.app.exit(0);
                    });
            }
        });
    };

    events.on('quit-group', quitGroup);

    events.on('quit-app', quitApp);

    $scope.$on('$destroy', function(){
        events.off('quit-group', quitGroup);
        events.off('quit-app', quitApp);
        chatroom.disconnect();
    });
};

ChatController.$inject = [
    '$scope',
    'ChatService',
    'Auth',
    '$mdSidenav',
    '$mdDialog',
    'utils',
    'events'
];

module.exports = ChatController;
