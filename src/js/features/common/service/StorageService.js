/**
 *  Defines the StorageService Module.
 *  This module used to control data in LocalStorage
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');

var PREFIX = 'wechat.';

class Feature extends FeatureBase {

    constructor() {
        super('StorageModule');
    }

    StorageService($window) {
        var storage = $window.localStorage;

        this.get = function(key, def) {
            return storage.getItem(PREFIX + key) || def;
        };

        this.indexOf = function(i) {
            if (!storage.key(i)) {
                return '';
            }
            return storage.getItem(storage.key(i));
        };

        this.set = function(key, value) {
            storage.setItem(PREFIX + key, value);
        };

        this.remove = function(key) {
            storage.removeItem(PREFIX + key);
        };

        this.removeAll = function() {
            storage.clear();
        };
    }

    execute() {
        this.StorageService.$inject = ['$window'];
        this.service('StorageService', this.StorageService);
    }
}

module.exports = Feature;
