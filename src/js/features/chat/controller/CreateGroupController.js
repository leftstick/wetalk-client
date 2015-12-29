/**
 *  Defines the CreateGroupController controller
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';

var CreateGroupController = function($scope, ChatService, $mdSidenav, $mdMedia, $mdDialog) {

    $scope.user = {};


    $scope.$on('$destroy', function() {});
};

CreateGroupController.$inject = [
    '$scope',
    'ChatService',
    '$mdSidenav',
    '$mdMedia',
    '$mdDialog'
];

module.exports = CreateGroupController;
