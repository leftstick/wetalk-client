/**
 *  Defines the Autofocus Module.
 *  This module used to override the original `autofocus` attribute since it doesn't work properly with ngRoute
 *
 *  @author  Howard.Zuo
 *  @date    Feb 15, 2016
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');

class Feature extends FeatureBase{

    constructor(){
        super('AutofocusModule');
    }

    autofocus(utils){
        return {
            restrict: 'A',
            link: function($scope, element){
                utils.delay(function(){
                    element[0].focus();
                }, 100);
            }
        };
    }

    execute(){
        this.autofocus.$inject = ['utils'];
        this.directive('autofocus', this.autofocus);
    }
}

module.exports = Feature;
