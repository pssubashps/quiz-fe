'use strict';
var myapp = angular.module("myapp",['ngRoute','ui.grid','ui.grid.selection', 'ui.grid.edit','ui.grid.cellNav','ngResource','ui.bootstrap']);
myapp.constant('BASE_URL','https://quiz-sps.herokuapp.com/');
myapp.run(function($rootScope) {
    $rootScope.page_title = 'Simple Quiz Application';
});
//myapp.constant('BASE_URL','http://localhost:3000/');