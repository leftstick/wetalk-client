/**
 *  Defines the KeepBottom directive
 *
 *  @author  Howard.Zuo
 *  @date    Jan 4, 2016
 *
 */
'use strict';

var KeepBottom = function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            element[0].scrollTop = element[0].scrollHeight;
        }
    };
};

module.exports = KeepBottom;
