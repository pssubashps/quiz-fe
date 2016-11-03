//questionStartController.js

myapp.controller('questionStartController', function($scope, $location, isReaderService) {
	function init (){};
	$scope.startExam = function () {
		console.log("changing path");
		$location.path('/quiz');
		isReaderService.setIsReadyToStart(true);
	}
	init();
});