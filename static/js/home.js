// DOM elements 
let sideNavBar = document.getElementById("sideNavBar");
let menuButton = document.getElementById("menuButton");
let menuCloseButton = document.getElementById("menuCloseButton");
let themeSwitch = document.getElementById("themeSwitch");
let menuHeader = document.getElementById("menuHeader");
let dateDisplay = document.getElementById("dateDisplay");


let date = new Date();
let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


// initial call
checkIfLoggedIn();
showDate();
// end


// Event Listener
menuButton.addEventListener("click",toggleMenu);
menuCloseButton.addEventListener("click",toggleMenu);
themeSwitch.addEventListener("click",toggleTheme);
// end


// function

// function to check if the user is logged in
function checkIfLoggedIn(){
    let loginStatus = localStorage.getItem('opinionLoginStatus');
    let userId = localStorage.getItem('opinionUserId');

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


// function to show current date 
function showDate(){
    let currentDate = "";
    let currentMonth = "";
    let currentyear = date.getFullYear();
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

    dateDisplay.innerText = `${currentDate} ${currentMonth} ${currentyear}, ${dayNames[currentDay]}`;
}

// end