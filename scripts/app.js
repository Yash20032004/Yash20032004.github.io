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
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>`;

       // step-3 configure
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");

        MainParagraph.textContent = "This is main paragraph";

        // step-4 performation
        Article.setAttribute("class", "container");

        MainContent.appendChild(MainParagraph);
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);


        console.log("HOME PAGE!!");

        //testing contact class
        let Yash = new Contact("Yash", "289-200-2800", "yash.patel16@dcmail.ca");
        console.log(Yash.toString());


        

       
        


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
      let sendButton = document.getElementById("sendButton");
      let subscribecheckbox = document.getElementById("subscribecheckbox");

      sendButton.addEventListener("click", function(event){
         
         //event.preventDefault();
         if(subscribecheckbox.checked)
         {
            let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
            if(contact.serialize())
            {
               let key = contact.FullName.substring(0,1) + Date.now();
               localStorage.setItem(key, contact.serialize());
            }
         }
      });

   }

   function DisplayContactListpage(){
      console.log("Contact-list page");
      if(localStorage.length > 0)
      {
         let contactList = document.getElementById("contactList");
         let data = "";
         let keys = Objects.keys(localStorage);
         let index = 1;
         for(const key of keys)
         {
            let contactData = localStorage.getItem(key);
            let contact = new Contact(); // empty object
            contact.deserialize(contactData);
            data += `<tr>
            <th scope="row" class="text-center">${index}</th>
            <td>${contact.FullName}</td>
            <td>${contact.ContactNumber}</td>
            <td>${contact.EmailAddress}</td>
            <td></td>
            <td></td>
            </tr>`
            ;
                
            index++;
            
            
         }
         contactList.innerHTML = data;
      }

   }


  

    // named function
    function Start()
    {
        console.log("App Started!!");

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
            case "Contact-List":
             DisplayContactListpage();
        }
    }

    window.addEventListener("load", Start);

})();
