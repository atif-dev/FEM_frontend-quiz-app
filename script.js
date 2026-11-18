const themeSwitch = document.querySelector("input");
themeSwitch.addEventListener("click", toggleDarkMode);

function showError(){
   let footer = document.querySelector("footer");
   if(footer.children[0] !== undefined){
      return;
   }
   let errorBlock = document.createElement("p");
   errorBlock.classList.add("data-error");
   errorBlock.innerHTML = "Something went wrong while fetching the data.";
   footer.appendChild(errorBlock); 
}

let quizzes = "";
let quizzesObject = "";
async function getQuizzes(){
   try{
      /*let response = await fetch("./data.json");*/
      let response = await fetch("https://raw.githubusercontent.com/atif-dev/FEM_frontend-quiz-app/refs/heads/main/data.json");
      if(!response.ok) throw new Error(`HTTP error: ${response.status}`);

      quizzesObject = await response.json();
   }catch(e){
      console.error("Failed to load quizzes:", e);
   }
}

getQuizzes().then(() => {
   if(Array.isArray(quizzesObject.quizzes)){
      quizzes = quizzesObject.quizzes;
   }else{
      console.log("Quiz data is missing");
      return;
   }
});

let questionCategoriesBlock = document.querySelector("#quest_categories");
let questionCategories = (questionCategoriesBlock === null) ? "" : questionCategoriesBlock.children;
for (let questionCategory of questionCategories){
   questionCategory.addEventListener("click", function (){
      if(quizzes.length === 0){
         showError();
         return;
      }
      for(let quiz of quizzes){
         if(this.id === quiz.title){
            /*let isThemeON = document.querySelector("#themeee").checked;
            quiz.isThemeON = isThemeON;*/
            const jsonString = encodeURIComponent(JSON.stringify(quiz));
            window.location.href = `questions.html?data=${jsonString}`;
         }
      }
   })
}





