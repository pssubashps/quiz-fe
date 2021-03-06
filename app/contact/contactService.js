//contactService
/**
 * http://usejsdoc.org/
 */
myapp.factory('contactFactory', function($http, $q, BASE_URL) {
	return {
		create: function(data) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				data: data,
				headers: {'Content-Type': 'application/json'},
				url: BASE_URL+'contact'
			}).then(function successCallback(response) {
				//console.log(response);
				deferred.resolve(response);
			}, function errorCallback(response) {
				console.log(response);
				deferred.reject(response);
			});
			return deferred.promise;

		}
	}
});