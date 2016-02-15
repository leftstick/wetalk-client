/**
 *
 *  Defines `utils` service
 *
 *
 *  @author  Howard.Zuo
 *  @date    Feb 15, 2016
 *
 */
'use strict';
var ServiceBase = require('lib/ServiceBase');
var config = require('etc/config');

class Service extends ServiceBase{
    constructor(features, app){
        super(features, app);
    }

    execute(){
        this.app.service('utils', [
            '$q',
            '$timeout',
            '$location',
            'promiseify',
            '$templateCache',
            function($q, $timeout, $location, promiseify, $templateCache){

                this.delay = function(func, delay){
                    return $timeout(func, delay);
                };

                this.cache = function(id, template){
                    $templateCache.put(id, template);
                };

                this.redirect = function(url){
                    $location.url(url);
                };

                this.base64ToString = function(str){
                    return decodeURIComponent(escape(atob(str)));
                };

                this.stringTobase64 = function(str){
                    return btoa(unescape(encodeURIComponent(str)));
                };

                var promiseExtra = function(promise){
                    promise.success = function(fn){
                        promise.then(function(response){
                            fn(response);
                        });
                        return promise;
                    };
                    promise.error = function(fn){
                        promise.then(null, function(response){
                            fn(response);
                        });
                        return promise;
                    };
                    return promise;
                };

                this.promise = function(func){
                    var promise = $q(func);
                    return promiseExtra(promise);
                };

                this.resolve = function(value){
                    var promise = $q.resolve(value);
                    return promiseExtra(promise);
                };

                this.reject = function(reason){
                    var promise = $q.reject(reason);
                    return promiseExtra(promise);
                };

                this.promisify = promiseify;

                this.getApi = function(api){
                    var root = config.apiRoot || '/';
                    var finalApi = api;

                    if (!api){
                        return root;
                    }

                    if (root.charAt(root.length - 1) !== '/'){
                        root = root + '/';
                    }

                    if (api.charAt(0) === '/'){
                        finalApi = api.substring(1);
                    }

                    return root + finalApi;
                };

                this.stopEvent = function(e){
                    if (!e){
                        return;
                    }
                    if (e.stopPropagation){
                        e.stopPropagation();
                    }
                    if (e.preventDefault){
                        e.preventDefault();
                    }
                };
            }
        ]);
    }
}

module.exports = Service;
