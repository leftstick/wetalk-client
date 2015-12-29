/**
 * ******************************************************************************************************
 *
 *   Defines a login feature
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 * ******************************************************************************************************
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');
var Routes = require('./Routes');
var LoginController = require('./controller/LoginController');
var LoginService = require('./service/LoginService');

class Feature extends FeatureBase {

    constructor() {
        super('login');
        this.routes = Routes;
    }

    execute() {
        this.controller('LoginController', LoginController);
        this.service('LoginService', LoginService);
    }
}

module.exports = Feature;
