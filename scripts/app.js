// IIFE -- Immediately Invoked Function Expression

(function()
{

   function DisplayHomePage()
   {
      console.log("Home page");
      let AboutUsButton = document.getElementById("AboutUsButton");
      AboutUsButton.addEventListener("click", function(){
         location.href = "about.html"
      });


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