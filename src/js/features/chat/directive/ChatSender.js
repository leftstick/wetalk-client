/**
 *  Defines the ChatSender directive
 *
 *  @author  Howard.Zuo
 *  @date    Dec 30, 2015
 *
 */
'use strict';

var senderTpl = require('./sender.html');

var ChatSender = function() {
    return {
        restrict: 'EA',
        scope: {
            onSubmit: '&'
        },
        template: senderTpl,
        link: function($scope, element, attrs) {
            $scope.state = {};
            $scope.sendMsg = function() {
                $scope.onSubmit({
                    message: $scope.state.message
                });
                $scope.state.message = '';
                element[0].querySelector('.chat-sender-directive').focus();
            };
        }
    };
};

ChatSender.$inject = [];

module.exports = ChatSender;
