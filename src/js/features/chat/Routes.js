/**
 *
 *  Routes module expose route information used in chat feature
 *
 *  @author  Howard.Zuo
 *  @date    Feb 15, 2016
 *
 */
'use strict';

var tpl = require('./partials/chat.html');

module.exports = [
    {
        id: 'chat',
        isDefault: false,
        when: '/chat/:id',
        controller: 'ChatController',
        template: tpl,
        size: {
            width: 980,
            minWidth: 650,
            height: 650,
            minHeight: 400,
            resizable: true
        }
    }
];
