/**
 *  Defines the Contenteditable directive
 *
 *  @author  Howard.Zuo
 *  @date    Dec 30, 2015
 *
 */
'use strict';

var Contenteditable = function($sce) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function($scope, element, attrs, ngModel) {
            if (!ngModel) {
                return;
            } // do nothing if no ng-model

            // Write data to the model
            var read = function() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                if (html === '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
            };

            // Specify how UI should be updated
            ngModel.$render = function() {
                element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
            };

            // Listen for change events to enable binding
            element.on('blur keyup change', function() {
                $scope.$evalAsync(read);
            });

            read(); // initialize

            $scope.$on('$destroy', function() {
                element.off('blur keyup change');
            });

        }
    };
};

Contenteditable.$inject = ['$sce'];

module.exports = Contenteditable;
