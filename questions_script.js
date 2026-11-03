const urlParams = new URLSearchParams(window.location.search);
const encodedData = urlParams.get('data');

let quiz;
if (encodedData) {
    // Decode and parse the JSON string
    quiz = JSON.parse(decodeURIComponent(encodedData));
}



let quizCategoryImg = document.querySelector("#quiz_category_img");
let title = document.querySelector("#title");
let question = document.querySelector("#question");
let option0 = document.querySelector("#option0");
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");

quizCategoryImg.src = quiz.icon;
title.innerHTML = quiz.title;

let questionText = quiz.questions[0];
let questionNum = document.querySelector("#question_no");

function populateFirstQuestion(){
    questionNum.innerHTML = 1;
    question.innerHTML = questionText.question;
    option0.innerHTML = questionText.options[0];
    option1.innerHTML = questionText.options[1];
    option2.innerHTML = questionText.options[2];
    option3.innerHTML = questionText.options[3];
}

populateFirstQuestion();

let options = document.querySelectorAll(".option");

let selectedAnswer = "";
let selectedAnswerBlock = "";
let score = 0;
let currentIndex = "";
let optionSelected = false;
let errorMessage = document.querySelector(".error"); 
function selectOption(){
	
	let choiceIndices = document.querySelectorAll(".choice-index");

	for (let i = 0; i < options.length; i++) {
	  options[i].addEventListener("click", function() {
	  	
	  	/*prevent selection after question result*/
	  	for(let option of options){
	  		let optionClasses = option.classList;
	  		for(let optionClass of optionClasses){
	  			if(optionClass == "correct-ans" || optionClass == "wrong-ans"){
	  				errorMessage.children[1].innerHTML = "Selection not allowed"
	  				errorMessage.style.display = "flex";
	  				return;
	  			}
	  		}
	  	}

	  	  optionSelected = true;
		  let current = document.getElementsByClassName("active");
		  let current1 = document.getElementsByClassName("active1");

		  if (current.length > 0 && current1.length > 0) { 
		    current[0].className = current[0].className.replace(" active", "");
		    current1[0].className = current1[0].className.replace(" active1", "");
		  }

		  this.className += " active";
		  choiceIndices[i].className += " active1";
		  currentIndex = choiceIndices[i];
		  selectedAnswerBlock = options[i];
		  selectedAnswer = document.querySelector("#option" + i);
	  });
	}
}

selectOption();
let a = 1;
let correctAnswerTick = 0;
let submitBtn = document.querySelector("#submit_btn");
let progressBlock = document.querySelector("#progress_block");

let quizProgress = 0;
submitBtn.addEventListener("click", function(){
	progressBlock.classList.add("show-progress-block");
	if(!optionSelected){
		errorMessage.children[1].innerHTML = "Please select an answer";
		errorMessage.style.display = "flex";
		return;
	}
	
	errorMessage.style.display = "none";

	if(submitBtn.innerHTML == "Next Question"){
		optionSelected = false;
		let questionLength = 10;
		if(a == questionLength){
			let quizCompleted = {
				quiz_category_image: quiz.icon,
				quiz_title: quiz.title,
				quiz_completed_state: a,
				score:score 
			}

			const quizCompletedJsonString = encodeURIComponent(JSON.stringify(quizCompleted));
			window.location.href = `score.html?data=${quizCompletedJsonString}`;
			return;
		}
		questionText = quiz.questions[a];
		question.innerText = questionText.question;
	    option0.innerText = questionText.options[0];
	    option1.innerText = questionText.options[1];
	    option2.innerText = questionText.options[2];
	    option3.innerText = questionText.options[3];
	    submitBtn.innerHTML = "Submit Answer";
		a++;
		questionNum.innerHTML = a;

		//remove previous question states
		selectedAnswerBlock.classList.remove("correct-ans");
		selectedAnswerBlock.classList.remove("active");
		if(selectedAnswer.nextElementSibling != null){selectedAnswer.nextElementSibling.remove();}
		currentIndex.classList.remove("active1");

		selectedAnswerBlock.classList.remove("wrong-ans");
		selectedAnswerBlock.children[1].remove();

		if(options[correctAnswerTick].children[1] != (null || undefined)){options[correctAnswerTick].children[1].remove();}

	}else{
		if(selectedAnswer.innerText == questionText.answer){
			selectedAnswerBlock.className += " correct-ans";
			selectedAnswerBlock.children[0].insertAdjacentHTML('afterend','<span><img src="./assets/images/icon-correct.svg"></span>');
			score++;
		}else{
			selectedAnswerBlock.className += " wrong-ans";
			selectedAnswerBlock.children[0].insertAdjacentHTML('afterend','<span><img src="./assets/images/icon-incorrect.svg"></span>');
			for(let a = 0; a<options.length; a++){
				if(options[a].children[0].children[1].innerText == questionText.answer){
					options[a].children[0].insertAdjacentHTML('afterend','<span><img src="./assets/images/icon-correct.svg"></span>');
					correctAnswerTick = a; /*value will be used to remove previous question state*/
				}
			}
		}
		quizProgress++;
		submitBtn.innerHTML = `Next Question`;
	}

	let progressBar = document.querySelector("#progress_bar");
	progressBar.style.width = (quizProgress * 10) + "%";
});