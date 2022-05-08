import { SUCCESS_OK, USER_EXIST, USER_NOT_EXIST, POSTS_EXIST, POSTS_NOT_EXIST  } from "./constants.js"


// DOM elements 
let sideNavBar = document.getElementById("sideNavBar");
let menuButton = document.getElementById("menuButton");
let menuCloseButton = document.getElementById("menuCloseButton");
let themeSwitch = document.getElementById("themeSwitch");
let menuHeader = document.getElementById("menuHeader");
let dateDisplay = document.getElementById("dateDisplay");
let addPostButton = document.getElementById("addPostButton");

let profileImage = document.getElementById("profileImage");
let ownerActualName = document.getElementById("ownerActualName");
let ownerUserName = document.getElementById("ownerUserName");
let ownerBio = document.getElementById("ownerBio");
let ownerPostCount = document.getElementById("ownerPostCount");
let ownerFollowerCount = document.getElementById("ownerFollowerCount");
let ownerFollowingCount = document.getElementById("ownerFollowingCount");

let postPreviewContainer = document.getElementById("postPreviewContainer");



let MenuHomeButton = document.getElementById("MenuHomeButton");
let MenuProfileButton = document.getElementById("MenuProfileButton");
let MenuNotificationButton = document.getElementById("MenuNotificationButton");
let MenuSettingButton = document.getElementById("MenuSettingButton");


let loginStatus;
let userId;
let date = new Date();
let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


// initial call
checkIfLoggedIn();
loadOwnerProfile()
showDate();
loadPosts();
// end


// Event Listener
menuButton.addEventListener("click",toggleMenu);
menuCloseButton.addEventListener("click",toggleMenu);
themeSwitch.addEventListener("click",toggleTheme);
addPostButton.addEventListener("click", redirectToPost);


MenuHomeButton.addEventListener("click",displaySection);
MenuProfileButton.addEventListener("click",displaySection);
MenuNotificationButton.addEventListener("click",displaySection);
MenuSettingButton.addEventListener("click",displaySection);
// end


// function

// function to check if the user is logged in
function checkIfLoggedIn(){
    loginStatus = localStorage.getItem('opinionLoginStatus');
    userId = localStorage.getItem('opinionUserId');

    if( !(loginStatus && userId) ){
        window.location.href = "/loginPage";
    }

}


// function to toggle(open/close) menu
function toggleMenu(){
    sideNavBar.classList.toggle("navBarOpen");
}

// function to toggle theme
function toggleTheme(){
    themeSwitch.classList.toggle("nightThemeButton");
    menuHeader.classList.toggle("menuHeaderBackgroundNightMode");

    // TOGGLE FUNCTIONALITY NOT COMPLETE
}

function redirectToPost(){
    window.location.href = "/postUploadPage";
}

function displaySection(){
    let AllSection = document.querySelectorAll("section");
    for( let sec of AllSection){
        // console.log(sec);
        if(sec.id === this.dataset.sectionToShow){
            sec.classList.toggle("d-none"); // remove none which is already applied
            sec.classList.toggle("d-flex"); // apply flex which is not applied
        }
        else{
            sec.classList.toggle("d-flex"); // remove flex which is already applied
            sec.classList.toggle("d-none"); // apply none which is not applied
        }
    }
}


// function to show current date 
function showDate(){
    let currentDate = "";
    let currentMonth = "";
    let currentYear = date.getFullYear();
    let currentDay = date.getDay();

    if( date.getDate() < 10 ){
        currentDate = `0${date.getDate()}`;
    }
    else{
        currentDate = `${date.getDate()}`;
    }

    if( date.getMonth() < 10 ){
        currentMonth = `0${date.getMonth()}`;
    }
    else{
        currentMonth = `${date.getMonth()}`;
    }

    dateDisplay.innerText = `${currentDate} ${currentMonth} ${currentYear}, ${dayNames[currentDay]}`;
}

function loadOwnerProfile(){
    console.log("load profile chala");

    $.ajax({
        method: "POST",
        url: "/fetchOwnerProfile",
        data: { 
            "userId": userId
        }
    })
    .done(function( response ) {
        console.log(response);
        if( (response.api_status === SUCCESS_OK) && (response.status === USER_EXIST) ){
            if( response.data.user_profile_picture === "defaultAvatar" ){
                profileImage.src = "static/images/defaultAvatar/SmilyAvatar.jpg";
            }
            else{
                profileImage.src = response.data.user_profile_picture;
            }
            ownerActualName.innerText = response.data.user_actual_name;
            ownerUserName.innerHTML = `<b>@</b> <i>${response.data.user_name}</i>`;
            ownerBio.innerText = response.data.user_bio;
            ownerPostCount.innerText = response.data.user_total_post;
            ownerFollowerCount.innerText = response.data.user_total_follower;
            ownerFollowingCount.innerText = response.data.user_total_following;

        }
        else if( (response.api_status === SUCCESS_OK) && (response.status === USER_NOT_EXIST) ){
            localStorage.removeItem("opinionLoginStatus");
            localStorage.removeItem("opinionUserId");

            window.location.href = "/loginPage";
        }
        else{
            alert( "Notice: " + response.message );
        }

    });
}



function loadPosts(){
    $.ajax({
        method: "POST",
        url: "/fetchAllProfilePost",
        data: { 
            "userId": userId
        }
    })
    .done(function( response ) {
        // console.log(response);
        if( (response.api_status === SUCCESS_OK) && (response.status === POSTS_EXIST) ){
            let postPreviewContainerInnerStuff = ""

            response.posts.forEach(post => {
                postPreviewContainerInnerStuff = postPreviewContainerInnerStuff + 
                `
                <div class="postPreviewBox col-4 p-1">
                    <div class="postPreviewInnerBox d-flex justify-content-center">
                        <img class="img-fluid" src="${post.post_content}">
                    </div>
                </div>
                `
            });

            postPreviewContainer.innerHTML =  postPreviewContainerInnerStuff;

        }
        else if( (response.api_status === SUCCESS_OK) && (response.status === POSTS_NOT_EXIST) ){
            postPreviewContainer.innerHTML = '<p class="col-12" style="text-align: center; font-weight: 600; color: grey;"> No post </p>';
        }
        else{
            alert( "Notice: " + response.message );
        }

    });
}

// end