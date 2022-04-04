let emailInp = document.getElementById("emailInp");
let passwordInp = document.getElementById("passwordInp");
let loginButton = document.getElementById("loginButton");


// Event Listener
emailInp.addEventListener("click", removeWarning);
passwordInp.addEventListener("click", removeWarning);
loginButton.addEventListener("click", login);

// Event Listener end


// functions

// login
function login(){

    // email field validation
    let emailWarningTextId = emailInp.dataset.warningTextId;
    let emailWarningText = document.getElementById(emailWarningTextId);

    let passwordWarningTextId = passwordInp.dataset.warningTextId;
    let passwordWarningText = document.getElementById(passwordWarningTextId);
    
    // email validation 
    if( emailInp.value === ""){
        emailWarningText.innerText = "Oops! looks like email is empty";
        emailWarningText.style.display = "block";
    }
    else if( !emailInp.value.includes(".com") ){
        emailWarningText.innerText = "invalid email";
        emailWarningText.style.display = "block";
    }
    
    //password validation 
    if( passwordInp.value === "" ){
        passwordWarningText.innerText = "Oops! looks like password is empty";
        passwordWarningText.style.display = "block";
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
