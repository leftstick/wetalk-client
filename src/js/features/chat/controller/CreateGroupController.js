/**
 *  Defines the CreateGroupController controller
 *
 *  @author  Howard.Zuo
 *  @date    Dec 30, 2015
 *
 */
'use strict';

var CreateGroupController = function($scope, events, ChatService, $mdSidenav, $mdDialog) {

    $scope.icons = [
        'icon-bell',
        'icon-attention-alt',
        'icon-paper-plane-empty',
        'icon-chart-bar',
        'icon-bicycle',
        'icon-wheelchair',
        'icon-skyatlas',
        'icon-reddit'
    ];

    $scope.group = {icon: $scope.icons[0], busy: false};

    $scope.selectGroupIcon = function(icon) {
        $scope.group.icon = icon;
    };

    $scope.createGroup = function() {
        $scope.group.busy = true;
        ChatService.createGroup({
            icon: $scope.group.icon,
            name: $scope.group.name
        })
            .success(function(group) {
                $scope.group.busy = false;
                $mdDialog.hide(group);
            })
            .error(function() {
                $scope.group.busy = false;
                events.emit('toast-warning', 'group name is already exist');
            });
    };

    $scope.$on('$destroy', function() {});
};

CreateGroupController.$inject = [
    '$scope',
    'events',
    'ChatService',
    '$mdSidenav',
    '$mdDialog'
];

module.exports = CreateGroupController;
