/**
 *  Defines the LoginController controller
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';

var LoginController = function($scope, LoginService, utils) {

    $scope.user = {};
    $scope.state = {busy: false};

    $scope.login = function() {
        $scope.state.busy = true;
        LoginService.login($scope.user.nickname)
            .success(function(res) {
                console.log('asdfasf', res)
                $scope.state.busy = false;
                utils.redirect('/chat/' + $scope.user.nickname);
            });
    };

    $scope.$on('$destroy', function() {});
};

LoginController.$inject = [
    '$scope',
    'LoginService',
    'utils'
];

module.exports = LoginController;
