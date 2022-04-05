let date = new Date();
let months = ["January", "February", "March", "April","May","June", "July", "August", "September", "October", "November", "December"];
let day = ["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]

let overlayBox = document.getElementById("overlayBox");
let todaysDate = document.getElementById("todaysDate");
let actualImageInput = document.getElementById("actualImageInput");
let progressBarActualProgress = document.getElementById("progressBarActualProgress");

// initial function call
dateUpdate();
// uploadProgress();
// initial function call end




// Event Listener

overlayBox.addEventListener("click",triggerImageSelect);
actualImageInput.addEventListener("change",uploadProgress);

// Event Listener end


function triggerImageSelect(){
    // alert("hello");
    actualImageInput.click();


    // uploadProgress();

    // code to display:none overlay box
    overlayBox.classList.remove("d-flex");
    overlayBox.classList.add("d-none");
}

function dateUpdate(){
    todaysDate.innerText = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${day[date.getDay()]}`;
}


function uploadProgress(){
    let width = 0;
    console.log(actualImageInput.files);

    let t = setInterval(function (){
        // console.log("chala");
        progressBarActualProgress.style.width = `${width+1}%`;
        width+=1;
        if(width>100){
            clearInterval(t);
        }
    }, 100);
}

