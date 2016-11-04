//questionController.js

myapp.controller('questionController', function($rootScope,$scope, $location, $parse, $interval, questionFactory, isReaderService) {
	let questionIndex = 0,
		remaining_time = 0;
	$scope.showSubmit = true;
	$scope.completed = false;
	$scope.score = 0;
	$scope.remaining_time_formated = 0;
	$rootScope.page_title = "Welcome ";
	function init() {

		if (!isReaderService.getIsReadyToStart()) {
			$location.path('/quizstart');
		}
		getQuestionSet();
	}

	function StopTimer() {

		if (angular.isDefined($scope.Timer)) {
			$interval.cancel($scope.Timer);

		}
	};

	function StartTimer() {

		//Initialize the Timer to run every 1000 milliseconds i.e. one second.
		$scope.Timer = $interval(function() {

			if (remaining_time <= 0) {
				StopTimer();
				$scope.completed = true;
				calculateScore();
				return;
			}

			$scope.remaining_time_formated = secondsToHH_MM_SS(remaining_time);
			remaining_time--;

		}, 1000);
	};

	function secondsToHH_MM_SS(totalSeconds) {
		var hours = Math.floor(totalSeconds / 3600);
		var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
		var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

		// round seconds
		seconds = Math.round(seconds * 100) / 100

		var result = (hours < 10 ? "0" + hours : hours);
		result += ":" + (minutes < 10 ? "0" + minutes : minutes);
		result += ":" + (seconds < 10 ? "0" + seconds : seconds);
		return result;
	}

	function getQuestionSet() {
		questionFactory.getQuestionSet().then(function(response) {
			$scope.totalQuestions = response.data.length;
			$scope.questions = response.data;
			remaining_time = $scope.questions.length * 30;
			$scope.remaining_time_formated = secondsToHH_MM_SS(remaining_time);
			StartTimer();
			getNextQuestion();
		});
	}

	function getNextQuestion() {
		$rootScope.page_title = "Contact Me ";
		$scope.userans = false;
		if (questionIndex >= $scope.questions.length) {
			$rootScope.page_title = "Completed";
			$scope.completed = true;
			calculateScore();
		} else {
			$rootScope.page_title = $scope.questions[questionIndex].title;
			$scope.showSubmit = true;
			$scope.question = $scope.questions[questionIndex];

			$scope.question_number = questionIndex + 1;
		}

	}

	function calculateScore() {
		var scoreCounter = 0;
		angular.forEach($scope.questions, function(value, key) {
			if (value.useranswer === value.correct_answer) {
				scoreCounter++;
			}
		});
		$scope.score = scoreCounter;
		isReaderService.setIsReadyToStart(false);
	}
	$scope.validateAnswer = function() {
		//StopTimer();


		qans = $scope.question.correct_answer;
		userans = $scope.userans;
		$scope.questions[questionIndex]['useranswer'] = "answer" + userans;

		$scope.showSubmit = false;
		questionIndex++;
		getNextQuestion();


	}
	init();
});