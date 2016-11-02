/**
 * http://usejsdoc.org/
 */
myapp.factory('questionFactory', function($http, $q, BASE_URL) {
	return {
		getAllQuestions: function() {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: BASE_URL+'questions'
			}).then(function successCallback(response) {
				//console.log(response);
				deferred.resolve(response);
			}, function errorCallback(response) {
				console.log(response);
				deferred.reject(response);
			});
			return deferred.promise;

		},
		getQuestionSet: function() {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: BASE_URL+'questions/set'
			}).then(function successCallback(response) {
				//console.log(response);
				deferred.resolve(response);
			}, function errorCallback(response) {
				console.log(response);
				deferred.reject(response);
			});
			return deferred.promise;

		},
		sayGoodbye: function() {
			return "Factory says \"Goodbye " + text + "\"";
		},
		shuffleArray: function(d) {
			for (var c = d.length - 1; c > 0; c--) {
				var b = Math.floor(Math.random() * (c + 1));
				var a = d[c];
				d[c] = d[b];
				d[b] = a;
			}
			return d;
		}
	}
});