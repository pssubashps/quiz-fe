//ContactController.js

myapp.controller('contactController', function($rootScope,$scope,contactFactory) {
	$scope.contact = {};
	$scope.show_success = false;
	$rootScope.page_title = "Contact Me ";
	function init () {
		$scope.show_success = false;
	};
	$scope.send = function (isValid) {
		if(isValid) {
			contactFactory.create($scope.contact);
			$scope.show_success = true;
		}else{
			$scope.show_success = false;
		}
			

		return false;
	}
	init ();
});