'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MyCtrl1', ['$scope',
        function($scope) {

        }
    ])
    .controller('MyCtrl2', ['$scope',
        function($scope) {

        }
    ])
    .controller('mainCtrl', ['$scope', '$location', '$log',
        function($scope, $location, $log) {
            $scope.going = function(location) {
                $log.log(location);
                $location.path('/misc');
            };

            var value = (function() {
                var test = [];
                for (var i = 0; i < 50; i++) {
                    test.push({
                        title: "'" + i + "'"
                    });
                }
                return test;
            })();
            $scope.over = function(event) {
                event.target.css('color', 'red');
                $sdLog.log("test");
            }
            $scope.gone = value;

            $scope.plusOne = function() {
                $scope.gone.push({
                    title: "'" + ($scope.gone.length) + "'"
                });
            }
        }
    ])
    .controller('myTest1', ['$scope', 'inRow', '$sdLog',
        function($scope, inRow, $sdLog) {
            $scope.currentValue = "Hello";
            $scope.lists = [];
            $scope.inRow = inRow;

            function buildList() {
                var build = [];
                for (var i = 0; i < 50; i++) {
                    build[i] = {
                        title: "'" + i + "'",
                        id: "test"
                    };
                }
                return build;
            }

            //Test code for events
            $scope.over = function(event) {
                var hold = angular.element(event.target);
                hold.css('color', 'red');
                $sdLog.log("" + hold.html() + " " + hold);
            }

            $scope.addOne = function() {
                $scope.lists[$scope.lists.length++] = {
                    title: "'" + ($scope.list.length + 1) + "'"
                };
            }

            $scope.mouseOver = function(event) {
                $sdLog.log('hello');
            }

            $scope.lists = buildList();
        }
    ]).
controller('myTest2', ['$scope', '$resource',
    function($scope, $resource) {
        $scope.userLocation = '5506 Wortser Ave, Sherman Oaks, CA 91401';
        $scope.userDestination = '604 Arizona Ave, Santa Monica, CA';
        $scope.current = $resource('localhost:3000/misc/testing', {
                userLocation: $scope.userLocation,
                userDestination: $scope.userDestination
            }, {
                get: {
                    method: 'GET'
                }
            });
        $scope.pressSubmit = function() {
            current.get();
        };
    }
]);