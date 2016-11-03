/**
 * http://usejsdoc.org/
 */
//var myapp = angular.module("myapp",['ngRoute']);
myapp.config(['$routeProvider',
  function($routeProvider,$stateProvider) {
    $routeProvider.
    when('/test', {
        templateUrl: 'app/landing/landing.html',
        controller: 'landingController'
      }).
       when('/q', {
        templateUrl: 'app/landing/question.html',
        controller: 'landingController'
      }).
    	 when('/quiz', {
        templateUrl: 'app/questionset/question.html',
        controller: 'questionController'
      }).
        when('/quizstart', {
        templateUrl: 'app/questionset/start.html',
        controller: 'questionStartController'
      }).
      otherwise({
        redirectTo: '/quizstart'
      });
  }]);
