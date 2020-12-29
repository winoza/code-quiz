// WHEN I click the start button
// Initialize the timer variable to 75

// Variable for the questions array
var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
  ];
  




var timeDisplay = document.querySelector("#time")
// Create time counter variable
var timeCounter
// 6. Initialize variable for starting quiz
var quizStart = document.querySelector("#start")
// 7. Variable to hold quiz info section
var startQuizInfo = document.querySelector("#start-screen")
// 8. Variable to show questions
var showQuestions = document.querySelector("#questions")
// 9. Variable for questions array
var quesTitle = document.querySelector("#question-title")
// 10. Variable for choices array
var quesChoice = document.querySelector("#choices")
// 11. Variable for feedback
var displayFeedback = document.querySelector("#feedback")
// Variable for displaying end screen
var allDone = document.querySelector("#end-screen")
// Variable for final score display
var finalscoreText = document.querySelector("#final-score")
// Variable for initials
var userInitials = document.querySelector("#initials")

var rightanswersound = new Audio("assets/sfx/correct.wav");
var wronganswersound = new Audio("assets/sfx/incorrect.wav");

var timeRemain = questions.length * 15
var quesIndex = 0
var interval;
// Variable for saving user scores
var userScore = JSON.parse(window.localStorage.getItem("savedScore")) || []
// Variable for submit button
var submitBtn = document.querySelector("#submit")
// Variable for storing the initials and score to an object
var initialandscore = {
    score: "",
    initials: ""
}

// 5. Create a function that will listen to when we click the Start Quiz button, and then start the timer
function startQuiz() {
    // 7. Hide the start screen when we click the start quiz button
    startQuizInfo.setAttribute("class", "hide")
    // 8. Show the questions
    showQuestions.removeAttribute("class")
    setQuesTitle()
    
    timeDisplay.textContent = timeRemain
    // Start timer
    timeCounter = setInterval(countdown, 1000)
    
}

// Create a function for the countdown
function countdown() {
    timeRemain--;
    

    // when counter reaches 0 stop the time remaining
    if (timeRemain <= 0) {
      timeRemain = 0;
        stopQuiz();
    } else {
        timeDisplay.textContent = timeRemain // Move timedisplay here as well and apply timeRemain = 0 to ensure it wont go down to -1 nor display it
    }
}

// 12. Create function to stop the quiz

function stopQuiz() {
    clearInterval(timeCounter)
    showQuestions.setAttribute("class", "hide")
    allDone.removeAttribute("class")
    finalscoreText.textContent = timeRemain
}

// 9. Replace title and load question 1 from array
function setQuesTitle() {
    quesTitle.textContent = questions[quesIndex].title
    showChoices()
}

// 11. Create function so that when a choice is picked, display text feedback
function clickedSel() {
    if (this.value !== questions[quesIndex].answer) {
        timeRemain -= 15;
    
        if (timeRemain < 0) {
          timeRemain = 0;
        } 
        timeDisplay.textContent = timeRemain // Move timedisplay here as well so the time deducted will display immediately
        displayFeedback.textContent = "Nope, Sorry!"
        wronganswersound.play()
    } else {
        displayFeedback.textContent = "Good Job!"
        rightanswersound.play()
    }
     // flash right/wrong feedback on page for half a second
    displayFeedback.setAttribute("class", "feedback");
    setTimeout(function() {
        displayFeedback.setAttribute("class", "feedback hide");
    }, 2000);

    quesIndex++
    if (quesIndex > questions.length -1) { // This detects if user finishes all of the questions, once they finish the last one, stop the quiz
        stopQuiz()
    } else {
        setQuesTitle()
    }
}


// 10. Show choices from array
function showChoices() {
    quesChoice.innerHTML = "" // Clears out the div so next time it loops there is no old values
    questions[quesIndex].choices.forEach(function(choice, i) {
        // create new button for each choice
        var choiceSelection = document.createElement("button"); // Create a button for our choices
        choiceSelection.setAttribute("class", "choice"); // Class name
        choiceSelection.setAttribute("value", choice); // This will hold the value for when the user clicks a choice
    
        choiceSelection.textContent = i + 1 + ". " + choice; // This displays the content on the button on the page
    
        // attach click event listener to each choice
        choiceSelection.onclick = clickedSel;
    
        // display on the page
        quesChoice.appendChild(choiceSelection);
      });
}

function saveuserscore() {
    if (userInitials.value.trim() === "") {
        alert("Please enter a character")
    } else {
        initialandscore.score = timeRemain
        initialandscore.initials = userInitials.value
        console.log("initalandscore: " + JSON.stringify(initialandscore))
        //userScore = JSON.parse(window.localStorage.getItem("userScore")) 
        userScore.push(initialandscore);
        window.localStorage.setItem("savedScore", JSON.stringify(userScore));
        window.location.href = "scores.html"
    }
}
 
function processEnter(event) {
    if (event.key === "Enter") {
        saveuserscore();
    }
}


// We added an event listener so that when we click Start Quiz, then start the timer
quizStart.addEventListener("click", startQuiz)

submitBtn.addEventListener("click", saveuserscore)

userInitials.onkeyup = processEnter











// a timer starts DONE
// present a question


// WHEN I answer a question THEN I am presented with another question


// WHEN I answer a question incorrectly THEN time is subtracted from the clock


// WHEN all questions are answered or the timer reaches 0 THEN the game is over


// WHEN the game is over THEN I can save my initials and score

