//newsletterController.js

myapp.controller('newsletterController', function($rootScope,$scope,newsletterFactory) {
	$scope.contact = {};
	$scope.show_success = false;
	$rootScope.page_title = "Contact Me ";
	function init () {
		$scope.show_success = false;
	};
	$scope.send = function (isValid) {
		console.log($scope.newsletter);
		if(isValid) {
			newsletterFactory.create($scope.newsletter);
			$scope.show_success = true;
		}else{
			$scope.show_success = false;
		}
			

		return false;
	}
	init ();
});