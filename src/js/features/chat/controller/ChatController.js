/**
 *  Defines the ChatController controller
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';

var ChatController = function($scope, LoginService) {

    $scope.user = {};

    $scope.$on('$destroy', function() {});
};

ChatController.$inject = ['$scope', 'LoginService'];

module.exports = ChatController;
