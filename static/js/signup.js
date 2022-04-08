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
        get(child(databaseRef, "SerialCount/userSerialCount"))
        .then((snapshot) => {
            currentSerialCount = snapshot.val();
            console.log(snapshot.val());
        })
        .catch((error) => {
            console.log(error);
            console.log("error aa gai h userSerialCount fetch krne m");
        });
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
