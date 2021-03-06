/**
 *  RouterConfig collect route information from each feature and combine them
 *  with ngRoute.
 *
 *
 *  @author  Howard.Zuo
 *  @date    Feb 14, 2016
 *
 */
'use strict';
var ConfiguratorBase = require('lib/ConfiguratorBase');
var pluck = require('lib/Pluck');
var omit = require('lib/Omit');

var NO_ROUTE = 'There is no default route set. Try setting isDefault to the route you preferred';

class Configurator extends ConfiguratorBase{
    constructor(features, app){
        super(features, app);
    }

    _routesWarning(routes){
        var defaultRoutes = routes.filter(function(route){
            return route.isDefault;
        });
        var defaultWhens;
        if (!defaultRoutes.length){
            return console.warn(NO_ROUTE);
        }
        defaultWhens = pluck(defaultRoutes, 'when');
        return console.warn('You have set [' + defaultRoutes.length + '] default routes, they are ['
            + defaultWhens.join(', ') + ']. Try to correct it');
    }

    _getConfig(routes){
        return [
            '$locationProvider',
            '$routeProvider',
            function($locationProvider, $routeProvider){

                //config each router
                routes.forEach(function(ro){
                    $routeProvider
                        .when(ro.when, omit(ro, ['when']));
                });

                //config default page
                var defaultRouter = routes.filter(function(route){
                    return route.isDefault;
                })[0];

                if (defaultRouter){
                    $routeProvider.otherwise({
                        redirectTo: defaultRouter.when
                    });
                }

                $locationProvider.html5Mode(false);

            }
        ];
    }

    _getRoutes(features){
        return features
            .filter(function(feature){
                return feature.routes && feature.routes.length > 0;
            })
            .map(function(feature){
                return feature.routes;
            })
            .reduce(function(previous, current){
                return previous.concat(current);
            }, []);
    }

    execute(){
        if (!this.features || this.features.length === 0){
            return console.warn('No features loaded');
        }

        var routes = this._getRoutes(this.features);

        this._routesWarning(routes);

        var routeWhens = pluck(routes, 'when').sort();

        for (var i = 0; i < routeWhens.length - 1; i++){
            if (routeWhens[i] === routeWhens[i + 1]){
                throw new Error('Duplicated Route: [ ' + routeWhens[i] + ' ]');
            }
        }

        this.app.constant('Routes', routes);

        this.app.config(this._getConfig(routes));
    }
}

module.exports = Configurator;
