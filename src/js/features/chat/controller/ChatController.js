/**
 *  Defines the ChatController controller
 *
 *  @author  Howard.Zuo
 *  @date    Dec 30, 2015
 *
 */
'use strict';

var CreateGroupTpl = require('../partials/createGroup.html');

var ChatController = function($scope, ChatService, $mdSidenav, $mdDialog) {

    $scope.state = {};

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
        $scope.state.joinedGroup = group;
    };

    $scope.$on('$destroy', function() {});
};

ChatController.$inject = [
    '$scope',
    'ChatService',
    '$mdSidenav',
    '$mdDialog'
];

module.exports = ChatController;
