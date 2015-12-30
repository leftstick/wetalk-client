/**
 *  Defines the LoginController controller
 *
 *  @author  Howard.Zuo
 *  @date    Dec 30, 2015
 *
 */
'use strict';

var LoginController = function($scope, events, LoginService, utils, StorageService) {

    $scope.user = {nickname: StorageService.get('nickname', '')};
    $scope.state = {busy: false};

    $scope.login = function() {
        $scope.state.busy = true;
        LoginService.login($scope.user.nickname)
            .success(function(res) {
                $scope.state.busy = false;
                StorageService.set('nickname', $scope.user.nickname);
                utils.redirect('/chat/' + res.id);
            })
            .error(function() {
                $scope.state.busy = false;
                events.emit('toast-warning', 'nickname is already exist');
            });
    };

    $scope.$on('$destroy', function() {});
};

LoginController.$inject = [
    '$scope',
    'events',
    'LoginService',
    'utils',
    'StorageService'
];

module.exports = LoginController;
