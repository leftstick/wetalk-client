/**
 *  Defines the LogoutListener Module.
 *  This module handles quit event for application
 *
 *  @author  Howard.Zuo
 *  @date    Dec 31, 2015
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');
var app = require('electron').remote.app;

class Feature extends FeatureBase {

    constructor() {
        super('LogoutListenerModule');
    }

    _listener(Auth) {
        app.on('before-quit', function(e) {
            Auth.logout();
        });
    }

    execute() {
        this._listener.$inject = ['Auth'];
        this.run(this._listener);
    }
}

module.exports = Feature;
