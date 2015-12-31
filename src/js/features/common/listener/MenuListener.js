/**
 *
 *  Defines MenuListener service
 *
 *  @author  Howard.Zuo
 *  @date    Dec 31, 2015
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');
var LoginMenu = require('./LoginMenu');
var ChatMenu = require('./ChatMenu');

var remote = require('electron').remote;
var Menu = remote.Menu;
var MenuItem = remote.MenuItem;

class Feature extends FeatureBase {

    constructor() {
        super('MenuListenerModule');
    }

    listener($rootScope, events) {
        window.quitGroup = function() {
            events.emit('quit-group');
        };

        window.quitApp = function() {
            events.emit('quit-app');
        };

        $rootScope.$on('$routeChangeSuccess', function(e, route) {
            if (!route || !route.$$route || !route.$$route.id) {
                return;
            }
            if (route.$$route.id === 'login') {
                var menus = LoginMenu.slice(0, LoginMenu.length);
                if (process.env.NODE_ENV !== 'dev') {
                    menus = LoginMenu.slice(0, LoginMenu.length - 1);
                }
                Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
                return;
            }

            var menus = ChatMenu.slice(0, ChatMenu.length);
            if (process.env.NODE_ENV !== 'dev') {
                menus[menus.length - 1].submenu.splice(0, 2);
            }
            Menu.setApplicationMenu(Menu.buildFromTemplate(menus));

        });
    }

    execute() {
        this.listener.$inject = ['$rootScope', 'events'];
        this.run(this.listener);
    }
}

module.exports = Feature;
