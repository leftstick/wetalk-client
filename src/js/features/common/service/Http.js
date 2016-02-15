/**
 *  Defines `Http` service which provide same functionality as $http with extra logical judgement
 *
 *  @author  Howard.Zuo
 *  @date    Feb 15, 2016
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');

class Feature extends FeatureBase{

    constructor(){
        super('HttpModule');
    }

    http($http, utils){
        var getArgs = function(raw){
            return Array.prototype.slice.apply(raw);
        };

        var commonSuccessHandler = function(resolve, reject){
            return function(res){
                if (!res || res.code){
                    reject(res);
                    return;
                }
                resolve(res.data);
            };
        };

        var wrapper = function(method){
            return function(){
                var args = getArgs(arguments);
                return utils.promise(function(resolve, reject){
                    $http[method].apply($http, args)
                        .success(commonSuccessHandler(resolve, reject))
                        .error(reject);
                });
            };
        };

        var http = function(){
            var args = getArgs(arguments);
            return utils.promise(function(resolve, reject){
                $http.apply(null, args)
                    .success(commonSuccessHandler(resolve, reject))
                    .error(reject);
            });
        };

        var methods = [
            'get',
            'head',
            'post',
            'put',
            'delete',
            'jsonp',
            'patch'
        ];

        methods.forEach(function(method){
            http[method] = wrapper(method);
        });

        return http;
    }

    execute(){
        this.http.$inject = ['$http', 'utils'];
        this.factory('http', this.http);
    }
}

module.exports = Feature;
