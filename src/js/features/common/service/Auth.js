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

        this.logout = function(user) {
            return http.post(utils.getApi('/logout'), user);
        };
    }

    execute() {
        this._authService.$inject = ['http', 'utils'];
        this.service('Auth', this._authService);
    }
}

module.exports = Feature;
