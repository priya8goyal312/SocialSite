import { db, databaseRef, get, set, update,ref, child, query, equalTo, orderByChild} from "./firebaseConfig.js";

// DOM elements 




// const
const loginStatus = localStorage.getItem('openionLoginStatus');
const userId = localStorage.getItem('openionUserId');


// initial call

// end




// Event Listener
checkIfUserNameAssigned();
check();
// end



// Function

// function to check if the user have a userName or not
function checkIfUserNameAssigned(){
    get(child(databaseRef, "Users/"+userId+"/userName/"))
    .then((snapshot) => { 
        console.log(snapshot.val());
        if( snapshot.val() === "N/A" ){
            window.location.href = "userNameSelection.html";
        }
    })
    .catch((error) => {
        console.log(error);
        console.log("error aa gai h userData fetch krne m");
    });
}


function check(){

}
// end
