/**
 *
 *  Routes module expose route information used in chat feature
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';

var tpl = require('./partials/chat.html');

module.exports = [
    {
        id: 'chat',
        isDefault: false,
        when: '/chat/:nickname',
        controller: 'ChatController',
        template: tpl,
        size: {
            width: 980,
            minWidth: 650,
            height: 600,
            minHeight: 400,
            resizable: true
        }
    }
];
