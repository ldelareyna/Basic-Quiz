$(document).ready(function () {

  // Executes the JavaScript for the game when the start button is clicked
  $("#start-button").on("click", gameState.startTimer);

});

// Holds the state of which the the game is being played
var gameState = {

  // Set the countdown timer to 60 seconds, and count down by 1 second
  timeRemaining: 60,

  // Starting The Timer
  // The startTimer function will return the value of timeRemaining to the selector with the name timer
  // The interval of the countdown will be by 1
  // Hidding the start page
  // Displaying the questions
  startTimer: function () {

    $("#timer").text("Time remaining: " + gameState.timeRemaining);

    setInterval(gameState.countdown, 1000);

    $("#start-page").hide();

    trivia.displayQuestions();
  },

  // Counting down  
  // Decrement the timeRemaining Variable and return to the selector with the name Timer 
  // If the variable timeRemaining is at 0, then the gameState will run the function stopTimer
  // The selector with the name timer will be emptyed
  countdown: function () {

    gameState.timeRemaining--;

    $("#timer").text("Time remaining: " + gameState.timeRemaining);

    if (gameState.timeRemaining === 0) {

      gameState.stopTimer();

      $("#timer").empty();
    }
  },

  // Stopping the Timer
  // This stopTimer function will stop the timer by clearing 
  // Check the answers
  stopTimer: function () {

    clearInterval();

    trivia.checkAnswers();
  },

  // The Results
  // The selector end-page will be shown
  // The selector question-box will be claered
  // The selector timer will be cleared and emptyed
  // Return the values for the variable numCorrect, numIncorrect, and numUnanswered to their corrisponding selectors.
  showEndPage: function (numCorrect, numIncorrect, numUnanswered) {

    $("#end-page").show();

    $("#questions-box").empty();

    $("#timer").empty();

    $("#timer").hide();

    $("#correct-answers").text("You Got Correct: " + numCorrect);
    
    $("#incorrect-answers").text("You Got Incorrect: " + numIncorrect);
    
    $("#unanswered").text("You Skipped: " + numUnanswered);
  }
}

// This functions hold the questions and the scores
var trivia = {

  // The Questions
  // The displayQuestion function pulls questions from the array of questions 
  // Loop through them, and appendding them
  displayQuestions: function () {
    
    var divContainer = $("#questions-box");
    
    var answerGroup = $(".form-check");
    
    divContainer.append('<h2>Answer the following questions:</h2>');

    for (var i = 0; i < questionBank.length; i++) {

      divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer3 + '</label></div>');
    }

    // Completetion button
    // Register the click handler
    //Execute gameState.stpTimer
    var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
    
    divContainer.append(doneButton);
   
    $("#done-button").on("click", gameState.stopTimer);
  },

  // Checking the Answers
  // Function will determin if the answers are correct, incorrect, or if there are unanswered questions
  checkAnswers: function () {
   
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    // It will loop through to compare the text of the variable correct with the user answers
    // Increment score counts 
    for (var i = 0; i < questionBank.length; i++) {
      
      correctAnswer = questionBank[i].correct;
     
      userAnswer = $('input[id=radio' + i + ']:checked + label').text();

      if (userAnswer === correctAnswer) {
        
        numCorrect++;
      
      } else if (userAnswer === "") {
        
        numUnanswered++;
      
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }

    // Show the end page with the score tally
    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  },
}

// Array of objects with the questions, possible answers, and the correct answer
var questionBank =
  [
    {
      question: "Which of the following was not a single from Rumours?",
      answers: ["Dreams", "You Make Loving Fun", "Don't Stop", "Rhiannon"],
      correct: "Rhiannon"
    },

    {
      question: "Which of the following Fleetwood Mac songs did NOT appear on the album Rumours?",
      answers: ["Second Hand News", " Oh Daddy", "Songbird", "Rhiannon"],
      correct: "Rhiannon"
    },
    {
      question: "When was Lindsey Buckingham born?",
      answers: ["August 19, 1969", "October 3, 1949", "November 20, 1943"],
      correct: "October 3, 1949"
    },
    {
      question: "Original bassist Bob Brunning was the first member of Fleetwood Mac to go his own way. He was in the band from July until December 1967, and then went on to a 30 year career in education. In later years, what relationship did he have with the group?",
      answers: ["He hated them", "He was one of the band's biographers", "He rejoined the group"],
      correct: "He was one of the band's biographers"
    },
    {
      question: "What is the name of the song with the lyrics Thunder Only Happens When It's Raining?",
      answers: ["Dreams", "Silver Spring", "Gypsy"],
      correct: "Dreams"
    },
    {
      question: "Who wrote the sixties classic Black Magic Woman?",
      answers: ["Stevie Nicks", "Mick Fleetwood", "Peter Green"],
      correct: "Peter Green"
    },
    {
      question: "To begin with, the name Fleetwood Mac comes from the rhythm section: drummer Mick Fleetwood and bassist John McVie. Before joining Peter Green to form Peter Green's Fleetwood Mac, they worked briefly with John Mayall and Eric Clapton in a band. What was the name of this band?",
      answers: ["The Bluesbreakers", "Pearl Jam", "Black Sabbath"],
      correct: "The Bluesbreakers"
    },
    {
      question: "Hitting the top spot on the Billboard Album Charts back in the late 70s, Rumours spent a total of how many consecutive weeks there?",
      answers: ["31", "49", "5"],
      correct: "31"
    },
    {
      question: "Complete the lyric: Only creatures who are on their way / Ever poison their own __",
      answers: ["Shell", "Gel", "Well", "Dell"],
      correct: "Well"
    },
    {
      question: "Which band member recently left Fleetwood Mac after their 1998 tour?",
      answers: ["Christine McVie", "Stevie Nicks", "John McVie"],
      correct: "Christine McVie"
    }
  ]
