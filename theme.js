function toggleDarkMode() {
   const background = document.body;
   background.classList.toggle("dark-mode");
   
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