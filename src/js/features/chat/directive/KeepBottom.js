/**
 *  Defines the KeepBottom directive
 *
 *  @author  Howard.Zuo
 *  @date    Feb 15, 2016
 *
 */
'use strict';

var KeepBottom = function(utils){
    return {
        restrict: 'A',
        scope: {
            keepBottom: '='
        },
        link: function($scope, element, attrs){

            var watcher = $scope.$watch('keepBottom', function(newValue){
                if (!newValue){
                    return;
                }
                utils.delay(() => {
                    element[0].scrollTop = element[0].scrollHeight;
                });
            }, true);

            $scope.$on('$destroy', function(){
                watcher();
            });
        }
    };
};

KeepBottom.$inject = ['utils'];

module.exports = KeepBottom;
