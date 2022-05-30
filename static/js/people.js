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

searchEmoji.addEventListener('click', finduser);

function finduser(){
    let userToFind = searchInput.value;
    console.log("find user m aaya");
    console.log(userToFind);

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
