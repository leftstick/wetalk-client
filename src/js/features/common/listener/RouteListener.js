/**
 *  Defines the RouteListener Module.
 *  This module used to emit events while route changed
 *
 *  @author  Howard.Zuo
 *  @date    Feb 15, 2016
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');
var mainWindow = require('electron').remote.getCurrentWindow();

class Feature extends FeatureBase{

    constructor(){
        super('RouteListenerModule');
    }

    execute(){
        this.run([
            '$rootScope',
            'Routes',
            '$document',
            function($rootScope, Routes, $document){
                var isFirst = true;
                $rootScope.$on('$viewContentLoaded', function(){
                    var route = Routes.filter(function(ro){
                        return ro.id === $document[0].body.id;
                    })[0];
                    if (!route.size){
                        return;
                    }
                    var size = route.size;
                    mainWindow.setContentSize(size.width, size.height);
                    mainWindow.setMinimumSize(size.minWidth || size.width, size.minHeight || size.height);
                    mainWindow.setResizable(!!size.resizable);
                    if (isFirst){
                        isFirst = false;
                        mainWindow.show();
                    }
                    mainWindow.center();
                });
            }
        ]);
    }
}

module.exports = Feature;
