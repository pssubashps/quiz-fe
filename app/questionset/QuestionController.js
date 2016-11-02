//questionController.js

myapp.controller('questionController', function($scope, $location, $parse, $interval, questionFactory) {
	let questionIndex = 0;
	$scope.showSubmit = true;
	$scope.completed = false;
	$scope.score = 0;

	function init() {
		getQuestionSet();
	}

	function getQuestionSet() {
		questionFactory.getQuestionSet().then(function(response) {
			$scope.totalQuestions = response.data.length;
			$scope.questions = response.data;
			getNextQuestion();
		});
	}

	function getNextQuestion() {
		if (questionIndex >= $scope.questions.length) {
			$scope.completed = true;
			calculateScore();
		} else {
			$scope.showSubmit = true;
			$scope.question = $scope.questions[questionIndex];
			$scope.question_number = questionIndex + 1;
		}

	}
	function calculateScore() {
		var scoreCounter = 0;
		angular.forEach($scope.questions, function(value, key) {
			if(value.useranswer === value.correct_answer) {
				scoreCounter++;
			}
		});
		$scope.score = scoreCounter;
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