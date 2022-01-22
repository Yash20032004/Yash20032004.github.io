// IIFE -- Immediately Invoked Function Expression

(function()
{

   function DisplayHomePage()
   {
      console.log("Home page");

      let AboutUsButton = document.getElementById("AboutUsButton");
      AboutUsButton.addEventListener("click", function()
      {
         location.href = "about.html";
      });

      //step-1 - get a reference to entry point.
      let MainContent = document.getElementsByTagName("main")[0];
      let DocumentBody = document.body;
    
   
      let MainParagraph = document.createElement("p");    
      let Article = document.createElement("article");
      let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is article paragraph</p>`;

      // step-3 configure
      MainParagraph.setAttribute("id", "MainParagraph");
      MainParagraph.setAttribute("class", "mt-3");
      MainParagraph.textContent = "This is main paragraph";
      // step-4 performation
      MainContent.appendChild(MainParagraph);

      Article.innerHTML = ArticleParagraph;
      DocumentBody.appendChild(Article);


   }

   function DisplayProductspage(){
      console.log("Product page");

   }

   function DisplayServicespage(){
      console.log("Service page");

   }
   
   function DisplayAboutpage(){
      console.log("About page");

   }
   function DisplayContactpage(){
      console.log("Contact page");

   }

   function Start()
   {
        console.log("App Started!");

        switch(document.title)
        {
           case "Home":
              DisplayHomePage();
               break;
            case "Our Products":
              DisplayProductspage();
               break;
            case "Our Services":
              DisplayServicespage();
               break;
            case "About us":
              DisplayAboutpage();
               break;
            case "Contact us":
              DisplayContactpage();
               break;
        }


      
   } 

   
   window.addEventListener("load",Start);
})();