/**
 *  Defines the LogoutListener Module.
 *  This module handles quit event for application
 *
 *  @author  Howard.Zuo
 *  @date    Jan 5, 2016
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');

class Feature extends FeatureBase {

    constructor() {
        super('LogoutListenerModule');
    }

    _listener(events, $document) {

        window.onbeforeunload = function(e) {
            if ($document[0].body.id !== 'login') {
                e.returnValue = false;
                events.emit('quit-app');
            }
        };
    }

    execute() {
        this._listener.$inject = ['events', '$document'];
        this.run(this._listener);
    }
}

module.exports = Feature;
