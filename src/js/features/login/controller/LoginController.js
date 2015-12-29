/**
 *  Defines the LoginController controller
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';

var LoginController = function($scope) {

    $scope.user = {};

    $scope.login = function() {
        //TODO: post user info to the server
    };

    $scope.$on('$destroy', function() {});
};

LoginController.$inject = ['$scope'];

module.exports = LoginController;
