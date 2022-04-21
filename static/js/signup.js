import { db, databaseRef, get, set, update,ref, child, query, equalTo, orderByChild} from "./firebaseConfig.js";
import { SUCCESS_OK, USER_CREATED } from "./constants.js"


let emailInp = document.getElementById("emailInp");
let passwordInp = document.getElementById("passwordInp");
let confirmPasswordInp = document.getElementById("confirmPasswordInp");

let signupButton = document.getElementById("signupButton");


// Event Listener
emailInp.addEventListener("click", removeWarning);
passwordInp.addEventListener("click", removeWarning);
confirmPasswordInp.addEventListener("click", removeWarning);

signupButton.addEventListener("click", signup);

// Event Listener end


// functions

// signup
function signup(){
    let emailInpValue = emailInp.value;
    let passwordInpValue = passwordInp.value;
    let confirmPasswordInpValue = confirmPasswordInp.value

    let isEmailValid = false;
    let isPasswordValid = false;
    let isConfirmPasswordValid = false;

    
    // email field validation
    let emailWarningTextId = emailInp.dataset.warningTextId;
    let emailWarningText = document.getElementById(emailWarningTextId);

    // email validation 
    if( emailInpValue === ""){
        emailWarningText.innerText = "Oops! looks like email is empty";
        emailWarningText.style.display = "block";
    }
    else if( !emailInpValue.includes(".com") ){
        emailWarningText.innerText = "invalid email";
        emailWarningText.style.display = "block";
    }
    else{
        isEmailValid = true;
    }

    // password filed validation
    let passwordWarningTextId = passwordInp.dataset.warningTextId;
    let passwordWarningText = document.getElementById(passwordWarningTextId);

    if( passwordInpValue === ""){
        passwordWarningText.innerText = "Oops! looks like password is empty";
        passwordWarningText.style.display = "block";
    }
    else{
        isPasswordValid = true;
    }

    // confirm password field validation
    let confirmPasswordWarningTextId = confirmPasswordInp.dataset.warningTextId;
    let confirmPasswordWarningText = document.getElementById(confirmPasswordWarningTextId);

    if( confirmPasswordInpValue === ""){
        confirmPasswordWarningText.innerText = "Oops! looks like field is empty";
        confirmPasswordWarningText.style.display = "block";
    }
    else if(  confirmPasswordInpValue !== passwordInpValue){
        confirmPasswordWarningText.innerText = "Hmm...! Both password field does not match";
        confirmPasswordWarningText.style.display = "block";
    }
    else{
        isConfirmPasswordValid = true;
    }
    

    // main login 
    if( isEmailValid && isPasswordValid && isConfirmPasswordValid ){  
        
        $.ajax({
            method: "POST",
            url: "/signup",
            data: { 
                userName: "N/A",
                userEmail: emailInpValue.trim(),
                userPassword: passwordInpValue
            }
        })
        .done(function( response ) {
            if((response.api_status === SUCCESS_OK) && (response.status === USER_CREATED)){
                window.location.href = "/loginPage";
            }
            else{
                alert( "Message: " + response.message );
            }
        });
        

        /*
        // gettting the current serial count
        get(child(databaseRef, "SerialCount/userSerialCount"))
        .then((snapshot) => {
            let currentSerialCount = snapshot.val();
            let newUserIdId = currentSerialCount+1;

            //if( newUserIdId < 10){
            if( newUserIdId === 1){
                let userData = {
                    userId: newUserIdId,
                    userName: "N/A",
                    userEmail: emailInpValue.trim(),
                    userPassword: passwordInpValue
                };

                createUser(newUserIdId, userData);
            }else{
                // checking if the email is already taken or not
                const userQuery = query(ref(db,"Users"),orderByChild("userEmail"),equalTo(emailInpValue.trim()));
                get(userQuery)
                .then((snapshot) => { 
                    console.table(snapshot.val());
                    
                    if( snapshot.val() === null ){
                        let userData = {
                            userId: newUserIdId,
                            userName: "N/A",
                            userEmail: emailInpValue.trim(),
                            userPassword: passwordInpValue
                        };

                        createUser(newUserIdId, userData);
                    }
                    else{
                        alert("This email already registered");
                    }
                })
                .catch((error) => { 
                    console.log(error);
                    console.log("error aa gai h user fetch krne m");
                });
            }
            
        })
        .catch((error) => {
            console.log(error);
            console.log("error aa gai h userSerialCount fetch krne m");
        });
        */
    }
}
// end

// function to create user
function createUser( newUserIdId, userData ){
    set(ref(db, "Users/" + newUserIdId), userData)
    .then(() => {
        console.log("profile create ho gai h");

        update(ref(db,"SerialCount"), {
            userSerialCount: newUserIdId,
        })
        .then(() => {
            console.log("userSerialCount updated successfully");
        })
        .catch((error) => {
            console.log(error);
            console.log("error aa gai h userSerialCount update m");
        }); 

        window.location.href = "login.html"; 
    })
    .catch((error) => {
        console.log(error);
        console.log("error aa gai h profile create krne m");
    });
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
