/**
 *  Defines the Auth Module.
 *  This module used to communicated with server
 *
 *  @author  Howard.Zuo
 *  @date    Dec 31, 2015
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');

class Feature extends FeatureBase {

    constructor() {
        super('AuthModule');
    }

    _authService(http, utils) {
        var user;

        this.login = function(nickname) {
            var promise = http.post(utils.getApi('/login'), {
                nickname: nickname
            });
            promise.success(function(u) {
                user = u;
            });
            return promise;
        };

        this.logout = function() {
            if (!user) {
                return utils.promise(resolve => resolve());
            }
            var promise = http.post(utils.getApi('/logout/' + user.id));
            promise.success(function() {
                user = null;
            });
            return promise;
        };

        this.loggedInUser = function() {
            return user;
        };
    }

    execute() {
        this._authService.$inject = ['http', 'utils'];
        this.service('Auth', this._authService);
    }
}

module.exports = Feature;
