

myapp.factory('isReaderService', function() {


	var isReadyToStart = false;

	return {
		setIsReadyToStart: function(status) {
			isReadyToStart = status;
		},

		getIsReadyToStart: function() {
			return isReadyToStart;
		}
	}


})