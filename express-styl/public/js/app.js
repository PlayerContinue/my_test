'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'ui.bootstrap',
  'ui.router',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'draggable',
  'exportTest'
])
.constant('DEBUG',true)
.constant('serverLocation','localhost:3000')
//Route finder
.config(['$stateProvider', '$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider) {
  $stateProvider.state('view1', {url:'/view1',templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $stateProvider.state('view2', {url: '/view2', templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $stateProvider.state('misc',{url: '/misc', templateUrl: '/partials/misc',controller:'myTest1'});
  $stateProvider.state('test',{url:'/test', templateUrl:'/partials/front-page',controller:'myTest1'});
  $stateProvider.state('enterLocation',{url:'/misc2',templateUrl:'/partials/map',controller:'myTest2'});
  $urlRouterProvider.otherwise('/test');
  $locationProvider.html5Mode(false);
}]);
