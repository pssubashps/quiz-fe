/**
 * http://usejsdoc.org/
 */
myapp.controller('landingController', function($scope, $location, $parse, $interval, questionFactory) {
  $scope.validationFlag = false;
  $scope.totalQuestions = 0;
  $scope.question = {};
  $scope.questions = [];
  $scope.Timer = null;
  $scope.showTimer = false;
  $scope.showSubmit = true;
  var interval;

  var time = 10;
  var initialOffset = '440';
  var i = 1;

  function setTimerVals() {
    time = 10;
    initialOffset = '440';
    i = 1;
  }

  function StopTimer() {



    //Cancel the Timer.
    if (angular.isDefined($scope.Timer)) {
      $interval.cancel($scope.Timer);

    }
  };

  function StartTimer() {

    //Initialize the Timer to run every 1000 milliseconds i.e. one second.
    $scope.Timer = $interval(function() {

      $('h2').text(i);
      if (i == time) {

        StopTimer();
        $scope.validateAnswer();
        return;
      }

      $scope.stroke_dashoffset = {
        'stroke-dashoffset': (initialOffset - ((i + 1) * (initialOffset / time)))

      };
      console.log($scope.stroke_dashoffset);
      //  $scope.stroke_dashoffset =  initialOffset-((i+1)*(initialOffset/time));
      //$('.circle_animation').css('stroke-dashoffset',);
      i++;
    }, 1000);
  };

  function resetValidtionKeys() {
    console.log("reset");
    $scope.option1_wrong = false;
    $scope.option2_wrong = false;
    $scope.option3_wrong = false;
    $scope.option4_wrong = false;

    $scope.option1_right = false;
    $scope.option2_right = false;
    $scope.option3_right = false;
    $scope.option4_right = false;
  }

  function getQuestions() {
    questionFactory.getAllQuestions().then(function(response) {

      $scope.totalQuestions = response.data.length;
      console.log(response.data);
      $scope.questions = response.data;
      nextQuestion();
    });
  }

  function nextQuestion() {
    setTimerVals();
    $scope.showTimer = false;
    myIndex = getNext($scope.totalQuestions);
    console.log("Reading " + myIndex);
    $scope.question = $scope.questions[myIndex];
    $scope.showTimer = true;
    StopTimer();
    timerStart();
  }

  function getNext(max) {
    var x = Math.floor((Math.random() * max));
    return x;
  }

  function markRightAnswer(right) {

    switch (right) {
      case '1':
        $scope.option1_right = true;
        break;
      case '2':
        $scope.option2_right = true;
        break;
      case '3':
        $scope.option3_right = true;
        break;
      case '4':
        $scope.option4_right = true;
        break;
    }
  }

  function markWrongAnswer(wrong) {
    switch (wrong) {
      case '1':
        $scope.option1_wrong = true;
        break;
      case '2':
        $scope.option2_wrong = true;
        break;
      case '3':
        $scope.option3_wrong = true;
        break;
      case '4':
        $scope.option4_wrong = true;
        break;
    }
  }
  $scope.nextQuestion = function() {
    resetValidtionKeys();
    nextQuestion();
    $scope.showSubmit = true;
    $scope.userans = false;
  }
  $scope.validateAnswer = function() {
    StopTimer();
    resetValidtionKeys();


    qans = $scope.question.correct_answer;
    userans = $scope.userans;

    //  $parse(userans+'_wrong').assign($scope,true);


    if (qans === "answer" + userans) {

      markRightAnswer(userans);

    } else {
      markRightAnswer(qans.replace("answer", ""));
      markWrongAnswer(userans);
    }
    $scope.showSubmit = false;


  }

  function timerStart() {
    time = 10;
    initialOffset = '440';
    i = 1;
    $scope.stroke_dashoffset = {
      'stroke-dashoffset': (initialOffset - (1 * (initialOffset / time)))
    };
    StartTimer();

  }

  function init() {
    getQuestions();
    resetValidtionKeys();
    timerStart();

  }
  init();

});