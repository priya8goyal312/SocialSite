import { db, databaseRef, get, set, update,ref, child, query, equalTo, orderByChild} from "./firebaseConfig.js";



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
    let emailInpValue = emailInp.value;
    let passwordInpValue = passwordInp.value;

    let isEmailValid = false;
    let ispasswordValid = false;


    // email field validation
    let emailWarningTextId = emailInp.dataset.warningTextId;
    let emailWarningText = document.getElementById(emailWarningTextId);

    let passwordWarningTextId = passwordInp.dataset.warningTextId;
    let passwordWarningText = document.getElementById(passwordWarningTextId);
    
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
    
    //password validation 
    if( passwordInpValue === "" ){
        passwordWarningText.innerText = "Oops! looks like password is empty";
        passwordWarningText.style.display = "block";
    }
    else{
        ispasswordValid = true;
    }


    // main login 
    if( isEmailValid && ispasswordValid ){
        // alert("valide entries"); //REMOVE IT
        const userQuery = query(ref(db,"Users"),orderByChild("userEmail"),equalTo(emailInpValue.trim()));

        get(userQuery)
        .then((snapshot) => { 
            console.table(snapshot.val());
            
            if( snapshot.val() === null ){
                alert("invalid email");
            }
            else{
                let isCredentialCorrect = false;
                let fetchedUserId;
                snapshot.forEach(child => {
                    // console.log(child.val()); //REMOVE IT
                    if(child.val().userPassword === passwordInpValue){
                        isCredentialCorrect = true;
                        fetchedUserId = child.val().userId;
                    }
                });

                if( isCredentialCorrect === true ){
                    localStorage.setItem("openionLoginStatus","loggedIn");
                    localStorage.setItem("openionUserId",fetchedUserId);
                    // alert("woho correct credential");
                    window.location.href = "userNameSelection.html";
                }
                else{
                    alert("Ooops wrong password");
                }
            }
        })
        .catch((error) => { 
            console.log(error);
            console.log("error aa gai h user fetch krne m");
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
