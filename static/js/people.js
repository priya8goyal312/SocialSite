import { SUCCESS_OK, USER_EXIST, USER_NOT_EXIST } from "./constants.js"


let followersOption = document.getElementById('followersOption');
let followingOption = document.getElementById('followingOption');
let findOption = document.getElementById('findOption');
let pendingOption = document.getElementById('pendingOption');
let follower = document.getElementById('followers');
let following = document.getElementById('following');
let find = document.getElementById('find');
let pending = document.getElementById('pending');

let searchEmoji = document.getElementById('searchEmoji');
let searchInput = document.getElementById('searchInput');
let findInnerBox = document.getElementById('findInnerBox');

let userId;
checkIfLoggedIn();
followersList();

window.showHide = function () {
    follower.classList.remove('d-none');
    follower.classList.add('d-flex');
    following.classList.remove('d-flex');
    following.classList.add('d-none');
    find.classList.remove('d-flex');
    find.classList.add('d-none');
    pending.classList.remove('d-flex');
    pending.classList.add('d-none');
}
window.showHide2 = function () {
    following.classList.remove('d-none');
    following.classList.add('d-flex');
    pending.classList.remove('d-flex');
    pending.classList.add('d-none');
    follower.classList.remove('d-flex');
    follower.classList.add('d-none');
    find.classList.remove('d-flex');
    find.classList.add('d-none');
}
window.showHide3 = function () {
    find.classList.remove('d-none');
    find.classList.add('d-flex');
    pending.classList.remove('d-flex');
    pending.classList.add('d-none');
    follower.classList.remove('d-flex');
    follower.classList.add('d-none');
    following.classList.remove('d-flex');
    following.classList.add('d-none');
}
window.showHide4 = function () {
    pending.classList.remove('d-none');
    pending.classList.add('d-flex');
    find.classList.remove('d-flex');
    find.classList.add('d-none');
    follower.classList.remove('d-flex');
    follower.classList.add('d-none');
    following.classList.remove('d-flex');
    following.classList.add('d-none');
}

// function to check if the user is logged in
function checkIfLoggedIn(){
   let loginStatus = localStorage.getItem('opinionLoginStatus');
   userId = localStorage.getItem('opinionUserId');

    if( !(loginStatus && userId) ){
        window.location.href = "/loginPage";
    }

}

searchEmoji.addEventListener('click', finduser);

function finduser(){
    let userToFind = searchInput.value;

    $.ajax({
        method: "POST",
        url: "/findUsers",
        data: { 
            "userNameToFound": userToFind.trim(),
        }
    })
    .done(function( response ) {
        if( response.api_status === USER_EXIST ){
            let findInnerBoxStuff = ""

            for(let itr of response.data){
                console.log(itr);
                findInnerBoxStuff = findInnerBoxStuff +
                `<div class="col-12 d-flex align-item-center justify-content-between my-3">`+
                    `<p>${itr.userName}</p>`+
                    `<button>view</button>`+
                `</div>`;
            }

            findInnerBox.innerHTML = findInnerBoxStuff;
        }
        else if( response.api_status === USER_NOT_EXIST ){
            findInnerBox.innerHTML = "<div class='col-12'><p>no results</p></div>";
        }
        else{
            alert( "Message: " + response.message );
        }
    });
}


followersOption.addEventListener('click', followersList);

function followersList(){

      
    $.ajax({
        method: "POST",
        url: "/listFollowers",
        data: { 
            "userId": userId,
        }
    })
    .done(function( response ) {
        if(response.api_status === USER_EXIST ){
            let followers = ""

            
            for(let itr of response.data){
                followers = followers +
                `<div class="col-12 d-flex align-item-center justify-content-between my-3">`+
                    `<p>${itr.userName}</p>`+
                    `<button>view</button>`+
                `</div>`;
            }
            follower.innerHTML = followers;
        }
        else{
            alert( "Message: " + response.message );
        }
    });
}



followingOption.addEventListener('click', followingList);

function followingList(){
    console.log(userId);
      
    $.ajax({
        method: "POST",
        url: "/listFollowees",
        data: { 
            "userId": userId,
        }
    })
    .done(function( response ) {
        if(response.api_status === USER_EXIST ){
            let followings = ""

            
            for(let itr of response.data){
                followings = followings +
                `<div class="col-12 d-flex align-item-center justify-content-between my-3">`+
                    `<p>${itr.userName}</p>`+
                    `<button>view</button>`+
                `</div>`;
            }
            following.innerHTML = followings;
        }
        else{
            alert( "Message: " + response.message );
        }
    });
}

pendingOption.addEventListener('click', pendingList);

function pendingList(){
      
    $.ajax({
        method: "POST",
        url: "/listPendingRequest",
        data: { 
            "userId": userId,
        }
    })
    .done(function( response ) {
        if(response.api_status === USER_EXIST ){
            let request = ""

            
            for(let itr of response.data){
                request = request +
                `<div class="col-12 d-flex justify-content-between my-3">`+
                    `<p>${itr.userName}</p>`+
                    `<div>`+
                    `<button class = "mx-2" >Accept</button>`+ 
                    `<button class = "mx-2" >Reject</button>`+
                `</div>`+
                    `</div>`;
            }
            pending.innerHTML = request;
        }
        else{
            alert( "Message: " + response.message );
        }
    });
}


