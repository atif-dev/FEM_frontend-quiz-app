const urlParams = new URLSearchParams(window.location.search);
const completedQuizData = urlParams.get('data');

let completedQuiz;
if (completedQuizData) {
    // Decode and parse the JSON string
    completedQuiz = JSON.parse(completedQuizData);
}

let quizCategoryImg = document.querySelector("#quiz_category_img");
let title = document.querySelector("#title");
let quizCompleted = document.querySelector("#quiz_completed");
let quizCategoryImg1 = document.querySelector("#quiz_category_img1");
let quizCategory = document.querySelector("#quiz_category");
let obtainedScore = document.querySelector("#obtained_score");

quizCategoryImg.src = completedQuiz.quiz_category_image;
title.innerHTML = completedQuiz.quiz_title;
quizCompleted.innerHTML = (completedQuiz.quiz_completed_state) == 10 ? "Quiz completed" : "";
quizCategoryImg1.src = completedQuiz.quiz_category_image;
quizCategory.innerHTML = completedQuiz.quiz_title;
obtainedScore.innerHTML = completedQuiz.score;

const OBTAINED_SCORE = completedQuiz.score;
const totalScore = 10;

let particles = {
  position: { x: window.innerWidth * 0.50, y: window.innerHeight * 0.50 }, // Origin position
  count: 500,                 // Number of particles
  size: 1,                    // Size of the particles
  velocity: 900,              // Initial particle velocity
  fade: false,                // Particles fall off the screen, or fade out
  color: ["#FF06B5"]          // Palette the particles are picked from
};

if(OBTAINED_SCORE === totalScore){
    confetti(particles);
}

let playAgainBtn = document.querySelector("#play_again_btn");
playAgainBtn.addEventListener("click", function(){
	window.location.href = `index.html`;
});