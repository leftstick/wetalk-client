/**
 *  Defines the ChatController controller
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';

var CreateGroupTpl = require('../partials/createGroup.html');

var ChatController = function($scope, ChatService, $mdSidenav, $mdMedia, $mdDialog) {

    $scope.user = {};

    $scope.toggleGroupsPanel = function(componentId) {
        $mdSidenav(componentId).toggle();
    };

    $scope.createGroup = function($event) {
        var useFullScreen = $mdMedia('sm') || $mdMedia('xs');
        $mdDialog.show({
            controller: 'CreateGroupController',
            template: CreateGroupTpl,
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    $scope.$on('$destroy', function() {});
};

ChatController.$inject = [
    '$scope',
    'ChatService',
    '$mdSidenav',
    '$mdMedia',
    '$mdDialog'
];

module.exports = ChatController;
