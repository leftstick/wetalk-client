/**
 *  Defines the ChatController controller
 *
 *  @author  Howard.Zuo
 *  @date    Dec 31, 2015
 *
 */
'use strict';

var CreateGroupTpl = require('../partials/createGroup.html');

var ChatController = function($scope, ChatService, Auth, $mdSidenav, $mdDialog, $routeParams, utils, events) {

    $scope.state = {};

    ChatService.getUser($routeParams.id)
        .success(function(user) {
            $scope.state.loginUser = user;
        });

    ChatService.getGroups()
        .success(function(groups) {
            $scope.groups = groups;
        });

    $scope.toggleGroupsPanel = function(componentId) {
        $mdSidenav(componentId).toggle();
    };

    $scope.createGroup = function($event) {
        $mdDialog.show({
            controller: 'CreateGroupController',
            template: CreateGroupTpl,
            targetEvent: $event,
            clickOutsideToClose: true
        })
            .then(function(answer) {
                $scope.groups.push(answer);
                $scope.joinGroup(answer);
            });
    };

    $scope.joinGroup = function(group) {
        if ($scope.state.joinedGroup && $scope.state.joinedGroup.id === group.id) {
            return;
        }
        utils
            .delay(() => $scope.state.joinedGroup = undefined)
            .then(() => $scope.state.joinedGroup = group);
    };

    $scope.quit = function() {
        events.emit('confirm', {
            title: 'Would you like to quit?',
            onComplete: function() {
                Auth.logout()
                    .success(function() {
                        utils.redirect('/login');
                    });
            }
        });
    };

    $scope.$on('$destroy', function() {});
};

ChatController.$inject = [
    '$scope',
    'ChatService',
    'Auth',
    '$mdSidenav',
    '$mdDialog',
    '$routeParams',
    'utils',
    'events'
];

module.exports = ChatController;
