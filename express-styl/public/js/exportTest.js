angular.module('exportTest', [])
    .directive('testA', ['$log',
        function($log) {
            $log.log('directive success');
            return {
            	restrict:'A',
                replace: 'true',
                template: '<div> "hello" </div>'
            }
        }

    ]);