var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var nextButton = document.getElementById('next')
var currentQuestion = 0
var numCorrect = 0;

function showQuestions() {
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // first reset the list of answers
    answers = [];
    var i = currentQuestion

    // for each available answer to this question...
    for (letter in questions[i].choices) {

        // ...add an html radio button
        answers.push(
            '<label>'
            + '<input type="radio" name="question' + i + '" value="' + questions[i].choices[letter] + '">'
            + letter + ': '
            + questions[i].choices[letter]
            + '</label>'
        );
    }

    // add this question and its answers to the output
    output.push(
        '<div class="question">' + questions[i].title + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
    );
    // }

    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
}

showQuestions(questions, quizContainer);
function showResults(questions, quizContainer, resultsContainer) {

    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelector('.answers');

    // keep track of user's answers
    var userAnswer = '';


    // for each question...
    // for (var i = 0; i < questions.length; i++) {
    var i = currentQuestion;
    // find selected answer
    userAnswer = (answerContainers.querySelector('input[name=question' + i + ']:checked') || {}).value;
    console.log(userAnswer)
    // if answer is correct
    if (userAnswer === questions[i].answer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers.style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else {
        // color the answers red
        answerContainers.style.color = 'red';
    }
    // }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion > questions.length - 1) {
        alert('Your Score is ' + (numCorrect / questions.length * 100) + '%')
    } else { showQuestions(quizContainer); }

}
// on submit, show results
submitButton.onclick = function () {
    showResults(questions, quizContainer, resultsContainer);
}
nextButton.onclick = function () {
    nextQuestion();
}

ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => alert(`Time is Up!`));

function ProgressCountdown(timeleft, bar, text) {
  return new Promise((resolve, reject) => {
    var countdownTimer = setInterval(() => {
      timeleft--;

      document.getElementById(bar).value = timeleft;
      document.getElementById(text).textContent = timeleft;

      if (timeleft <= 0) {
        clearInterval(countdownTimer);
        resolve(true);
      }
    }, 1000);
  });
}
// document.getElementById("result").innerHTML = localStorage.getItem("initials");
// if (results > 80) {
//     alert('Add Score to High Scores')
// } else { alert('Too Bad :(')); }
