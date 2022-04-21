import { db, databaseRef, get, set, update,ref, child, query, equalTo, orderByChild} from "./firebaseConfig.js";
// Remove firebase

import { SUCCESS_OK } from "./constants.js"


let userNameInp = document.getElementById("userNameInp");
let proceedButton = document.getElementById("proceedButton");

let loginStatus;
let userId;

let eligibilityStatus = false; 



// Event Listener
userNameInp.addEventListener("click",removeWarning);
proceedButton.addEventListener("click",setUserName);
// Event Listener end


// initial calls
checkLogin()
// initial calls end

// functions


// function to check if the user is logged in
function checkLogin(){
    loginStatus = localStorage.getItem('opinionLoginStatus');
    userId = localStorage.getItem('opinionUserId');

    // var loginStatus = "dsfdhsflj";
    // var userId = "sdfd";

    console.log(loginStatus, userId);

    if( loginStatus  && userId ){
        checkIfUserNameSet();
    }
    else{
        window.location.href = "/loginPage";
    }
}
// end 

// fucntion to check if the user already have a userName
function checkIfUserNameSet(){
    eligibilityStatus = false;
    
    /* REMOVE
    get(child(databaseRef, "Users/"+userId))
    .then((snapshot) => {
        console.log(snapshot.val());

        if( snapshot.val().userName === "N/A" ){
            eligiblilityStatus = true;
        }
        else{
            console.log("user name already set");
            window.location.href = "home.html";
        }
    })
    .catch((error) => { 
        console.log(error);
        console.log("error aa gai h user fetch krne m");
    });
    */

    $.ajax({
        method: "POST",
        url: "/isUserNameSelected",
        data: { 
            userId: localStorage.getItem('opinionUserId')
        }
    })
    .done(function( response ) {
        console.log(response)
        alert( "Message: " + response.message );
        /*
        if((response.api_status === SUCCESS_OK) && (response.status === USER_CREATED)){
            window.location.href = "/loginPage";
        }
        else{
            alert( "Message: " + response.message );
        }
        */
    });
}
// end

// function to set the user name
function setUserName(){

    console.log("eligible for setting the userName =",eligibilityStatus);

    let userNameInpValue = userNameInp.value;
    let userNameInpInvalidWarningText = document.getElementById("userNameInpInvalidWarningText");

    if( eligibilityStatus && loginStatus  && userId ){
        // alert(userNameInpValue);

        // varification of input field
        if( userNameInpValue === "")
        {   
            // console.log("empty");
            userNameInpInvalidWarningText.innerText = "Oops...! field is empty";
            userNameInpInvalidWarningText.style.display = "block";
        }
        else{
            userNameInpInvalidWarningText.innerText = "checking availablity...";
            userNameInpInvalidWarningText.style.display = "block";

            /* REMOVE
            const userQuery = query(ref(db,"Users"),orderByChild("userName"),equalTo(userNameInpValue.trim()));
            get(userQuery)
            .then((snapshot) => {
                // console.log(snapshot.val());
                if( snapshot.val() === null ){
                    userNameInpInvalidWarningText.innerText = "available";
                    userNameInpInvalidWarningText.style.display = "block";

                    update(ref(db, "Users/"+userId), {
                        userName: userNameInpValue,
                    })
                    .then(() => {
                        console.log("user name set/updated successfully");
                        window.location.href="home.html";
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("error aa gai h userName set/update krne m");
                    });
                }
                else{
                    userNameInpInvalidWarningText.innerText = "not available";
                    userNameInpInvalidWarningText.style.display = "block";
                }
                

            })
            .catch((error) => { 
                console.log(error);
                console.log("error aa gai h user name check krne m");
            });
            */
        }
    }
    
}
// end

// function to make warning message display none
function removeWarning(){
    // alert(this.dataset.warningTextId);
    let warningTextId = this.dataset.warningTextId;
    let warningText = document.getElementById(warningTextId);

    warningText.style.display = "none";
}
// end

// functions end
