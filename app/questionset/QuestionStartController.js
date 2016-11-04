//questionStartController.js

myapp.controller('questionStartController', function($rootScope,$scope, $location, isReaderService) {
	function init (){};
	$rootScope.page_title = "Completed";
	$scope.startExam = function () {
		console.log("changing path");
		$location.path('/quiz');
		isReaderService.setIsReadyToStart(true);
	}
	init();
});