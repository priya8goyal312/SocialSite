import { db, databaseRef, get, set, update,ref, child, query, equalTo, orderByChild} from "./firebaseConfig.js";


let userNameInp = document.getElementById("userNameInp");
let proceedButton = document.getElementById("proceedButton");

let loginStatus;
let userId;

let eligiblilityStatus = false; 



// Event Listener
userNameInp.addEventListener("click",removeWarning);
proceedButton.addEventListener("click",setUserName);
// Event Listener end


// initial calls
checkLogin()
// initial calls end

// functions


// fucntion to check if the user is logged in
function checkLogin(){
    loginStatus = localStorage.getItem('openionLoginStatus');
    userId = localStorage.getItem('openionUserId');

    // var loginStatus = "dsfdhsflj";
    // var userId = "sdfd";

    console.log(loginStatus, userId);

    if( loginStatus  && userId ){
        checkIfUserNameSet();
    }
    else{
        window.location.href = "login.html";
    }
}
// end 

// fucntion to check if the user already have a userName
function checkIfUserNameSet(){
    eligiblilityStatus = false;
    
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
}
// end

// function to set the user name
function setUserName(){

    console.log("eligible for setting the userName =",eligiblilityStatus);

    let userNameInpValue = userNameInp.value;
    let userNameInpInvalidWarningText = document.getElementById("userNameInpInvalidWarningText");

    if( eligiblilityStatus && loginStatus  && userId ){
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
