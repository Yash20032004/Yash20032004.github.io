// IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function()
{
    
    function AjaxRequest(method, url, callback)
    {
       
        let XHR = new XMLHttpRequest();

       
        XHR.addEventListener("readystatechange", () =>
        {
            if(XHR.readyState === 4 && XHR.status === 200)
            {
                if(typeof callback === "function")
                {
                    callback(XHR.responseText);
                }
                else
                {
                    console.error("ERROR: callback not a function");
                }
            }
        });

        
        XHR.open(method, url);

        XHR.send();
    }

    
    function LoadHeader(html_data)
    {
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active"); 
        Checklogin();
    }

    function DisplayHomePage()
    {
        console.log("Home Page");
        $("#AboutUsButton").on("click", () => 
        {
            location.href = "about.html";
        });
    
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        $("body").append(`<article class="container">
        <p id="ArticleParagraph" class ="mt-3">This is the Article Paragraph</p>
        </article>`);
    }

    function DisplayProductsPage()
    {
        console.log("Products Page");
    }

    function DisplayServicesPage()
    {
        console.log("Services Page");
    }

    function DisplayAboutPage()
    {
        console.log("About Page");
    }

    /**
     *This function adds a Contact object to localStorage
     *
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * This method validates a field in the form and displays an error in the message area div element
     *
     * @param {string} fieldID
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function ValidateField(fieldID, regular_expression, error_message)
    {
        let messageArea = $("#messageArea").hide();
    
        $("#" + fieldID).on("blur", function()
        {
            let text_value = $(this).val();
            if(!regular_expression.test(text_value))
            {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else
            {
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ContactFormValidation()
    {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/, "Please enter a valid Full Name. This must include at least a Capitalized First Name and a Capitalized Last Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid Contact Number. Example: (416) 555-5555");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
    }


    function DisplayContactPage()
    {
        console.log("Contact Page");

        ContactFormValidation();
       
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(event)
        {

            if(subscribeCheckbox.checked)
            {
                let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();

                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }

    function DisplayContactListPage()
    {

        if (!sessionStorage.getItem("user")){
            //redirect to login page
            location.href = "login.html";
        }
        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList");

            let data = "";

            let keys = Object.keys(localStorage); // returns a list of keys from localStorage

            let index = 1;

            // for every key in the keys string array
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key); // get localStorage data value

                let contact = new core.Contact(); // create an empty Contact object
                contact.deserialize(contactData);

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>`;

                index++;
            }

            contactList.innerHTML = data;

            $("#addButton").on("click", ()=>
            {
                location.href = "edit.html#add";
            });

            $("button.delete").on("click", function()
            {
                if(confirm("Are you sure?"))
                {
                    localStorage.removeItem($(this).val())
                }
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function()
            {
                location.href = "edit.html#" + $(this).val();
            });
        }
    }

    /**
     * This function allows JavaScript to work on the Edit Page
     */
    function displayEditPage()
    {
        console.log("Edit Page");

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page)
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`)

                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                }
                break;
            default:
                {
                    // get contact info from localStorage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));

                    // display the contact in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();
                        
                        // get changes from the page
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();

                        // replace the item in local storage
                        localStorage.setItem(page, contact.serialize());
                        // go back to the contact list page (refresh)
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                    
                }
                break;
        }
    }

    function displayLoginPage()
    {
        console.log("Login Page");
        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function()
        {
            let success = false;
            let newUser = new core.User();
            $.get("./data/users.json", function(data)
            {
                // for every user in the user.json file , loop
                for (const user of data.users)
                {
                    // check if username and password entterd match with user's data
                    if(username.value == user.Username && password.value == User.Password){
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }


                 // if username password match - success .. perform login sequence

                if(success){

                    //add user to session storage
                    sessionStorage.setItem("user",newUser.serialize());
    
                    // hide any eerror messages
                    messageArea.removeAttr("class").hide();
    
                    //redirect to secur area of site
                    location.href = "contact-list.html"
    
    
                }
                else{
                    //error
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid login credentials.").show();
                }
    
                $("#cancelButton").on("click", function(){
                    document.forms[0].reset();
                    location.href = "index.html";
                });
            });

           

            
        });
    }

    function Checklogin(){
        if(sessionStorage.getItem("user"))
        {
            // swap out the login link to log out link
            $("#login").html(
               ` <a id="logout"class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            );
            $("#logout").on("click", function(){
                sessionStorage.clear();
                //redirect back to login
                location.href="login.html";
            });
        }
    }
    function displayRegisterPage()
    {
        console.log("Register Page");
    }

    // named function option
    function Start()
    {
        console.log("App Started!");

        AjaxRequest("GET", "header.html", LoadHeader);
        
        switch (document.title) {
          case "Home":
            DisplayHomePage();
            break;
          case "Our Products":
            DisplayProductsPage();
            break;
          case "Our Services":
            DisplayServicesPage();
            break;
          case "About Us":
            DisplayAboutPage();
            break;
          case "Contact Us":
            DisplayContactPage();
            break;
          case "Contact-List":
         
                DisplayContactListPage();
           
            DisplayContactListPage();
            break;
          //new
          case "Edit":
            displayEditPage();
            break;
          case "Login":
            displayLoginPage();
            break;
          case "Register":
            displayRegisterPage();
            break;
        }
       
    }

    window.addEventListener("load", Start);

})();