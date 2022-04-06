let emailInp = document.getElementById("emailInp");

let signupButton = document.getElementById("signupButton");


// Event Listener
emailInp.addEventListener("click", removeWarning);

signupButton.addEventListener("click", signup);

// Event Listener end


// functions

// signup
function signup(){
    let emailInpValue = emailInp.value;

    let isEmailValid = false;

    
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
    

    // main login 
    if( isEmailValid ){
        alert("valide entries");
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
