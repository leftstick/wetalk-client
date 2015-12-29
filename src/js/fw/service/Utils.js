/**
 *
 *  Defines `utils` service
 *
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';
var ServiceBase = require('lib/ServiceBase');

class Service extends ServiceBase {
    constructor(features, app) {
        super(features, app);
    }

    execute() {
        this.app.service('utils', [
            '$q',
            '$timeout',
            '$location',
            'promiseify',
            function($q, $timeout, $location, promiseify) {

                this.delay = function(func, delay) {
                    return $timeout(func, delay);
                };

                this.redirect = function(url) {
                    $location.url(url);
                };

                this.base64ToString = function(str) {
                    return decodeURIComponent(escape(atob(str)));
                };

                this.stringTobase64 = function(str) {
                    return btoa(unescape(encodeURIComponent(str)));
                };

                var promiseExtra = function(promise) {
                    promise.success = function(fn) {
                        promise.then(function(response) {
                            fn(response);
                        });
                        return promise;
                    };
                    promise.error = function(fn) {
                        promise.then(null, function(response) {
                            fn(response);
                        });
                        return promise;
                    };
                    return promise;
                };

                this.promise = function(func) {
                    var promise = $q(func);
                    return promiseExtra(promise);
                };

                this.resolve = function(value) {
                    var promise = $q.resolve(value);
                    return promiseExtra(promise);
                };

                this.reject = function(reason) {
                    var promise = $q.reject(reason);
                    return promiseExtra(promise);
                };

                this.promisify = promiseify;

                this.stopEvent = function(e) {
                    if (!e) {
                        return;
                    }
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                };
            }
        ]);
    }
}

module.exports = Service;
