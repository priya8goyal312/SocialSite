import { SUCCESS_OK, USER_EXIST, USER_NOT_EXIST, POSTS_EXIST, POSTS_NOT_EXIST } from "./constants.js"


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
let MenuShowPostButton = document.getElementById("MenuShowPostButton");
let MenuExploreButton = document.getElementById("MenuExploreButton");
// let MenuFeedsButton = document.getElementById("")


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
menuButton.addEventListener("click", toggleMenu);
menuCloseButton.addEventListener("click", toggleMenu);
themeSwitch.addEventListener("click", toggleTheme);
addPostButton.addEventListener("click", redirectToPost);


MenuHomeButton.addEventListener("click", displaySection);
MenuProfileButton.addEventListener("click", displaySection);
MenuNotificationButton.addEventListener("click", displaySection);
MenuSettingButton.addEventListener("click", displaySection);
MenuShowPostButton.addEventListener("click", displaySection);
MenuExploreButton.addEventListener("click", displaySection);
// MenuFeedsButton.addEventListener("click",displaySection);
// end


// function for close the post page

document.getElementById('postSection').addEventListener('click', function (e) {
    e.preventDefault();
    this.parentNode.style.display = 'none';
}, false);


// function to check if the user is logged in
function checkIfLoggedIn() {
    loginStatus = localStorage.getItem('opinionLoginStatus');
    userId = localStorage.getItem('opinionUserId');

    if (!(loginStatus && userId)) {
        window.location.href = "/loginPage";
    }

}


// function to toggle(open/close) menu
function toggleMenu() {
    sideNavBar.classList.toggle("navBarOpen");
}

// function to toggle theme
function toggleTheme() {
    themeSwitch.classList.toggle("nightThemeButton");
    menuHeader.classList.toggle("menuHeaderBackgroundNightMode");

    // TOGGLE FUNCTIONALITY NOT COMPLETE
}

function redirectToPost() {
    window.location.href = "/postUploadPage";
}

function displaySection() {
    let AllSection = document.querySelectorAll("section");
    for (let sec of AllSection) {
        // console.log(sec);
        // console.log(sec.id);
        // console.log(this.dataset.sectionToShow);

        if (sec.id === this.dataset.sectionToShow) {
            sec.classList.remove("d-none"); // remove none which is already applied
            sec.classList.add("d-flex"); // apply flex which is not applied
        }
        else {
            sec.classList.remove("d-flex"); // remove flex which is already applied
            sec.classList.add("d-none"); // apply none which is not applied
        }
    }
}


// function to show current date 
function showDate() {
    let currentDate = "";
    let currentMonth = "";
    let currentYear = date.getFullYear();
    let currentDay = date.getDay();

    if (date.getDate() < 10) {
        currentDate = `0${date.getDate()}`;
    }
    else {
        currentDate = `${date.getDate()}`;
    }

    if (date.getMonth() < 10) {
        currentMonth = `0${date.getMonth()}`;
    }
    else {
        currentMonth = `${date.getMonth()}`;
    }

    dateDisplay.innerText = `${currentDate} ${currentMonth} ${currentYear}, ${dayNames[currentDay]}`;
}

function loadOwnerProfile() {
    console.log("load profile chala");

    $.ajax({
        method: "POST",
        url: "/fetchOwnerProfile",
        data: {
            "userId": userId
        }
    })
        .done(function (response) {
            console.log(response);
            if ((response.api_status === SUCCESS_OK) && (response.status === USER_EXIST)) {
                if (response.data.user_profile_picture === "defaultAvatar") {
                    profileImage.src = "static/images/defaultAvatar/SmilyAvatar.jpg";
                }
                else {
                    profileImage.src = response.data.user_profile_picture;
                }
                ownerActualName.innerText = response.data.user_actual_name;
                ownerUserName.innerHTML = `<b>@</b> <i>${response.data.user_name}</i>`;
                ownerBio.innerText = response.data.user_bio;
                ownerPostCount.innerText = response.data.user_total_post;
                ownerFollowerCount.innerText = response.data.user_total_follower;
                ownerFollowingCount.innerText = response.data.user_total_following;

            }
            else if ((response.api_status === SUCCESS_OK) && (response.status === USER_NOT_EXIST)) {
                localStorage.removeItem("opinionLoginStatus");
                localStorage.removeItem("opinionUserId");

                window.location.href = "/loginPage";
            }
            else {
                alert("Notice: " + response.message);
            }

        });
}



function loadPosts() {
    $.ajax({
        method: "POST",
        url: "/fetchAllProfilePost",
        data: {
            "userId": userId
        }
    })
        .done(function (response) {
            // console.log(response);
            if ((response.api_status === SUCCESS_OK) && (response.status === POSTS_EXIST)) {
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

                postPreviewContainer.innerHTML = postPreviewContainerInnerStuff;

            }
            else if ((response.api_status === SUCCESS_OK) && (response.status === POSTS_NOT_EXIST)) {
                postPreviewContainer.innerHTML = '<p class="col-12" style="text-align: center; font-weight: 600; color: grey;"> No post </p>';
            }
            else {
                alert("Notice: " + response.message);
            }

        });
}


//Explore JS

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

// let userId;
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

searchEmoji.addEventListener('click', finduser);

function finduser() {
    let userToFind = searchInput.value;

    $.ajax({
        method: "POST",
        url: "/findUsers",
        data: {
            "userNameToFound": userToFind.trim(),
        }
    })
        .done(function (response) {
            if (response.api_status === USER_EXIST) {
                let findInnerBoxStuff = ""

                for (let itr of response.data) {
                    console.log(itr);
                    findInnerBoxStuff = findInnerBoxStuff +
                        `<div class="col-12 d-flex align-item-center justify-content-between my-3">` +
                        `<p>${itr.userName}</p>` +
                        `<button>view</button>` +
                        `</div>`;
                }

                findInnerBox.innerHTML = findInnerBoxStuff;
            }
            else if (response.api_status === USER_NOT_EXIST) {
                findInnerBox.innerHTML = "<div class='col-12'><p>no results</p></div>";
            }
            else {
                alert("Message: " + response.message);
            }
        });
}


followersOption.addEventListener('click', followersList);

function followersList() {


    $.ajax({
        method: "POST",
        url: "/listFollowers",
        data: {
            "userId": userId,
        }
    })
        .done(function (response) {
            if (response.api_status === USER_EXIST) {
                let followers = ""


                for (let itr of response.data) {
                    followers = followers +
                        `<div class="col-12 d-flex align-item-center justify-content-between my-3">` +
                        `<p>${itr.userName}</p>` +
                        `<button>view</button>` +
                        `</div>`;
                }
                follower.innerHTML = followers;
            }
            else {
                alert("Message: " + response.message);
            }
        });
}



followingOption.addEventListener('click', followingList);

function followingList() {
    console.log(userId);

    $.ajax({
        method: "POST",
        url: "/listFollowees",
        data: {
            "userId": userId,
        }
    })
        .done(function (response) {
            if (response.api_status === USER_EXIST) {
                let followings = ""


                for (let itr of response.data) {
                    followings = followings +
                        `<div class="col-12 d-flex align-item-center justify-content-between my-3">` +
                        `<p>${itr.userName}</p>` +
                        `<button>view</button>` +
                        `</div>`;
                }
                following.innerHTML = followings;
            }
            else {
                alert("Message: " + response.message);
            }
        });
}

pendingOption.addEventListener('click', pendingList);

function pendingList() {

    $.ajax({
        method: "POST",
        url: "/listPendingRequest",
        data: {
            "userId": userId,
        }
    })
        .done(function (response) {
            if (response.api_status === USER_EXIST) {
                let request = ""


                for (let itr of response.data) {
                    request = request +
                        `<div class="col-12 d-flex justify-content-between my-3">` +
                        `<p>${itr.userName}</p>` +
                        `<div>` +
                        `<button class = "mx-2" >Accept</button>` +
                        `<button class = "mx-2" >Reject</button>` +
                        `</div>` +
                        `</div>`;
                }
                pending.innerHTML = request;
            }
            else {
                alert("Message: " + response.message);
            }
        });
}

// Feeds JS

function likeToggle(postId) {
    let likeButton = document.getElementById(postId);
    let likeState = likeButton.dataset.state;

    if (likeState === "liked") {
        likeButton.src = "../static/images/icons/non-liked.png"
        likeButton.dataset.state = "not-liked";
    }
    else {
        likeButton.src = "../static/images/icons/Liked.png";
        likeButton.dataset.state = "liked";
    }

}


// end