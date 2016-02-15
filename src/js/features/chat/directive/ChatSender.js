/**
 *  Defines the ChatSender directive
 *
 *  @author  Howard.Zuo
 *  @date    Feb 15, 2016
 *
 */
'use strict';

var senderTpl = require('./sender.html');

var key = require('keymaster');
var angular = require('angular');

var ChatSender = function(){
    return {
        restrict: 'EA',
        scope: {
            onSubmit: '&'
        },
        template: senderTpl,
        link: function($scope, element, attrs){
            $scope.state = { };

            $scope.sendMsg = function(){
                if (!$scope.state.message){
                    return;
                }
                $scope.onSubmit({
                    message: $scope.state.message
                });
                $scope.state.message = '';
                element[0].querySelector('.chat-sender-directive').focus();
            };

            var sender = angular.element(element[0].querySelector('[contenteditable]'));

            sender.on('focus', function(){
                key('enter', function(event, handler){
                    $scope.$apply(function(){
                        $scope.sendMsg();
                    });
                });
            });

            var unbind = function(){
                key.unbind('enter');
            };

            sender.on('blur', unbind);

            $scope.$on('$destroy', unbind);

        }
    };
};

ChatSender.$inject = [];

module.exports = ChatSender;
