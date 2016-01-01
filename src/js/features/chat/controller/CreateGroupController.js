/**
 *  Defines the CreateGroupController controller
 *
 *  @author  Howard.Zuo
 *  @date    Jan 1, 2016
 *
 */
'use strict';

var CreateGroupController = function($scope, events, Auth, ChatService, $mdDialog) {

    $scope.loginUser = Auth.loggedInUser();

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
            name: $scope.group.name,
            owner: $scope.loginUser
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
    'Auth',
    'ChatService',
    '$mdDialog'
];

module.exports = CreateGroupController;
