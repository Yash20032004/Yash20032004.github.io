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
        let Yash = new core.Contact("Yash", "289-200-2800", "yash.patel16@dcmail.ca");
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

   function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize());
        }
    }

    function ValidateField(input_field_ID, regular_expression, error_message )
    {
      let messageArea = $("#messageArea").hide();
      
      $("#" + input_field_ID).on("blur", function()
      {
          let input_text_field = $(this).val();
          if(!regular_expression.test(input_text_field))
          
          {
              
              $(this).trigger("focus");
              $(this).trigger("select"); 
              messageArea.addClass("alert alert-danger").text(error_message);
              messageArea.show();
          }
          else
          {
              
              messageArea.removeAttr("class").hide();
          }
      });

    }

    function ContactFormValidation(){

      ValidateField("fullName",  /^{[A-Z][a-z]{1,3}.?\s}?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/, "Enter a valid Full Name. This must include at least a Capitalized First Name and a Capitalized Last Name." );
      ValidateField("contactNumber",  /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/, "Enter a valid Contact number. This must be in format: 000 - 000- 0000");
      ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Enter Valid email Address");

    }


    function DisplayContactpage()
    {
        console.log("Contact Us Page");
        ContactFormValidation();
       
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(event)
        {
            //event.preventDefault();

            if(subscribeCheckbox.checked)
            {
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayContactListpage()
    {
        console.log("Contact-List Page");

        if(localStorage.length > 0) // check if localStorage has something in it 
        {
            let contactList = document.getElementById("contactList");

            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;

            
         for(const key of keys)
         {
                let contactData = localStorage.getItem(key); 
                let contact = new core.Contact(); 
                contact.deserialize(contactData);

            data += `<tr>
            <th scope="row" class="text-center">${index}</th>
            <td>${contact.FullName}</td>
            <td>${contact.ContactNumber}</td>
            <td>${contact.EmailAddress}</td>
            <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>Edit</button></td>
            <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash fa-sm"></i>Delete</button></td>
            </tr>`
            ;
              
            
            index++;
            
            
         }
         contactList.innerHTML = data;

         $("#addButton").on("click",() => 
         {
            location.href = "edit.html#add";

         });

         $("#deleteButton").on("click",function()
         {
            if(confirm("Are you sure? ")){
            
               localStorage.removeItem($(this).val());
            }
               location.href="contact-list.html";
         });

         $("button.edit").on("click", function(){
            location.href="edit.html#" + $(this).val();

         });
      }
       

   }

   function DisplayEditpage()
   {
      console.log("Edit page");
      ContactFormValidation();
      let page = location.hash.substring(1);
      switch (page)
      {
         case "add":
         {
            $("main>h1").text("Add Contact");
            $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
            $("#editbutton").on("click", (event) =>
            {
               event.preventDefault();
               AddContact(fullName.value, contactNumber.value, emailAddress.value);
               location.href = "contact-list.html";

            });
               $("#cancelButton").on("click", () =>
               {
                     location.href("contact-list.html")
               });

         }
         break;
         default:
            {
               let contact = new core.Contact();
               contact.deserialize(localStorage.getItem(page));

               $("#fullName").val(contact.FullName);
               $("#contactNumber").val(contact.ContactNumber);
               $("#emailAddress").val(contact.EmailAddress);

               $("#editButton").on("click", (event) =>
               {
                  event.preventDefault();
                  contact.FullName= $("#fullName").val();
                  contact.ContactNumber= $("#contactNumber").val();
                  contact.EmailAddress =$("#emailAddress").val();

                  localStorage.setItem(page, contact.serialize());

               });

               $("#cancelButton").on("click", () =>
               {
                     location.href("contact-list.html")
               });

            }
            break;
      }
   }

   function Displayloginpage()
   {
      console.log("Login page")
   }

   function DisplayRegisterpage()
   {
      console.log("register page")
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
             break;
             case "Edit":
             DisplayEditpage();
             break;
             case "login":
               Displayloginpage();
               break;
               case "Register":
                  DisplayRegisterpage();
                  break;
        }
    }

    window.addEventListener("load", Start);

})();
