/**
 * ******************************************************************************************************
 *
 *   Defines a login feature
 *
 *  @author  Howard.Zuo
 *  @date    Dec 31, 2015
 *
 * ******************************************************************************************************
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');
var Routes = require('./Routes');
var LoginController = require('./controller/LoginController');

class Feature extends FeatureBase {

    constructor() {
        super('login');
        this.routes = Routes;
    }

    execute() {
        this.controller('LoginController', LoginController);
    }
}

module.exports = Feature;
