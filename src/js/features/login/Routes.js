/**
 *
 *  Routes module expose route information used in login feature
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';

var tpl = require('./partials/login.html');

module.exports = [
    {
        id: 'login',
        isDefault: true,
        when: '/login',
        controller: 'LoginController',
        template: tpl,
        size: {
            width: 500,
            height: 480
        }
    }
];
