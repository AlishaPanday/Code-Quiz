
var mainTag = document.querySelector("main");
var container = document.querySelector("#container");
var buttonTag = document.querySelector(".start-button");
var divTag = document.getElementById("counter");
var heading1 = document.getElementsByTagName("h1");
var paragraph = document.getElementsByTagName("p");
var ulDiv = document.querySelector(".choice-list");
var quizContent = document.getElementById("quizContent");


//setting counter to 75  before the start button is clicked

var timeRemaining = 60;
var timerInterval = 0;
var questionIndex = 0;
var score = 0;
var penalty = 10;

divTag.textContent = "Assigned Time: " + timeRemaining + " sec.";
divTag.style.fontSize = "30px";
divTag.style.color = "red";

//button style
buttonTag.setAttribute("style", "color:blue;width:200px; height:50px;marginLeft:33%;");

//when clicked button timer starts are presented with a question and choices

buttonTag.addEventListener("click", function(){
    if(timerInterval === 0) {
        timerInterval = setInterval(function(){
            timeRemaining --;
            divTag.textContent = timeRemaining + " second left";

            if(timeRemaining <= 0) {
                clearInterval(timerInterval);
                quizCompletion ();
                divTag.textContent = "Time is up!";
            }
        },1000)
    }
    showQuestion(questionIndex);
});

function showQuestion (questionIndex) {
    quizContent.innerHTML = "";
    heading1.innerHTML = "";
    ulDiv.innerHTML = "";
    //loop through each element of an array
    for (var i = 0; i < questions.length; i++){
        var quizQuestion = questions[questionIndex].title;
        var quizChoices = questions[questionIndex].choices;
        quizContent.textContent = quizQuestion;
    }
    quizChoices.forEach(function(listItem){
        var li = document.createElement("li");
        li.setAttribute("style","color:yellow; margin-left:20px; margin-top:20px;")
        li.textContent = listItem;
        quizContent.appendChild(ulDiv);
        ulDiv.appendChild(li);
        li.addEventListener("click",check);
    })
}

function check (event) {
    event.preventDefault();
    if (event.target.matches("li")) {
        var status = document.createElement("div");
        //set attribute
        status.setAttribute("id","status-alert");
        //check condition if choice is correct or incorrect
        if(event.target.textContent == questions[questionIndex].answer){
             score++;
            status.textContent = "Correct!"   
            status.setAttribute("style", "color:#99ff33;font-weight:bold;text-align:center;");
        }
        //penalty -10 sec for each incorrect answer
        else {
            
            status.textContent = "Incorrect!";
            status.setAttribute("style", "color:red;font-weight:bold;text-align:center;");
            timeRemaining = timeRemaining - penalty;
        }

    }

    questionIndex++;
 // check if all question answered or time reaches 0 and dispaly the score
    if(questionIndex >= questions.length){
         quizCompletion();
         status.textContent = "End of quiz. You got " + score + "/" +questions.length + "Correct"
         status.setAttribute("style", "color:#99ff33;font-weight:bold;text-align:center;");
         clearInterval(timerInterval);
    }
    else {
        showQuestion(questionIndex);
    }
     quizContent.appendChild(status);


}

//quiz completion will append the last page.
 function quizCompletion () {
     quizContent.innerHTML = "";
     divTag.innerHTML = "";
     var createH1 = document.createElement("h1");
     createH1.textContent = "All Done";
     var createPara = document.createElement("p");
     quizContent.appendChild(createH1);
     quizContent.appendChild(createPara);

     // replace time remaining with score
     if(timeRemaining >= 0){
         var secondsLeft = timeRemaining;
         divTag.textContent ="Time Remaining " + secondsLeft;
         var createPara2 = document.createElement("p");
         clearInterval (timeRemaining);
         createPara2.textContent = "Your Final Score is " +  secondsLeft;
         createPara2.setAttribute("style","color:#99ff33;font-weight:bold;text-align:center;")
         quizContent.appendChild(createPara2);
     }


    
 }


