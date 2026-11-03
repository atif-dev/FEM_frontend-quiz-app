const themeSwitch = document.querySelector("input");
themeSwitch.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
   const background = document.body;

   if(window.innerWidth == 768){
     background.classList.toggle("dark-mode-tablet");
   }else if(window.innerWidth == 375){
      background.classList.toggle("dark-mode-mobile");
   }else{
      background.classList.toggle("dark-mode");
   }
   
   const themeIcons = document.querySelectorAll(".theme-icon");
   themeIcons.forEach((themeIcon,i) =>{
   themeIcon.classList.toggle("light");
   });

   const lightBlocks = document.querySelectorAll(".light-block");
   lightBlocks.forEach((lightBlock,i) =>{
   lightBlock.classList.toggle("blue-850");
   });

   const lightTexts2 = document.querySelectorAll(".light-texts2");

   lightTexts2.forEach((lightText2,i) =>{
   lightText2.classList.toggle("white");
   });

   const lightTexts1 = document.querySelectorAll(".light-texts1");

   lightTexts1.forEach((lightText1,i) =>{
   lightText1.classList.toggle("blue-300");
   });

   const choiceIndices = document.querySelectorAll(".choice-index");
   choiceIndices.forEach((choiceIndex,i) =>{
   choiceIndex.classList.toggle("grey-background");
   });
}

function showError(){
   let footer = document.querySelector("footer");
   if(footer.children[0] != undefined){
      return;
   }
   let errorBlock = document.createElement("p");
   errorBlock.classList.add("data-error");
   errorBlock.innerHTML = "Something went wrong while fetching the data.";
   footer.appendChild(errorBlock); 
}

let quizzes = "";
let quizzesObject = "";
async function getQuizzez(){
   try{
      const REQUEST_URL = "/data.json"; /*=> local url. Need local server for working.*/
      /*const REQUEST_URL = ""; GitHub link*/
      const REQUEST = new Request(REQUEST_URL); 
      let response = await fetch(REQUEST);
      /*if(!response.ok) return alert("Something went wrong.");*/
      if(!response.ok){
        /* showError();*/
         return;
      }

      quizzesObject = await response.json();
   }catch(e){
      /*alert("Something went wrong while fetching the data.");*/
      /*showError();*/
   }
}

getQuizzez().then(() => {
   if(quizzesObject.length !== 0){
      quizzes = quizzesObject.quizzes;
   }else{
      return;
   }
});

let questionCategoriesBlock = document.querySelector("#quest_categories");
let questionCategories = (questionCategoriesBlock == null) ? "" : questionCategoriesBlock.children;
for (let questionCategory of questionCategories){
   questionCategory.addEventListener("click", function (){
      if(quizzes.length == 0){
         showError();
         return;
      }
      for(let quiz of quizzes){
         if(this.id == quiz.title){
            const jsonString = encodeURIComponent(JSON.stringify(quiz));
            window.location.href = `questions.html?data=${jsonString}`;
         }
      }
   })
}





