let date = new Date();
let months = ["January", "February", "March", "April","May","June", "July", "August", "September", "October", "November", "December"];
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let imageToUploadPreviewBox = document.getElementById("imageToUploadPreviewBox");
let imageToUploadPreview = document.getElementById("imageToUploadPreview");
let overlayBox = document.getElementById("overlayBox");
let todaysDate = document.getElementById("todaysDate");
let actualImageInput = document.getElementById("actualImageInput");
let reselectButton = document.getElementById("reselectButton");
let progressBarActualProgress = document.getElementById("progressBarActualProgress");

// initial function call
dateUpdate();
// uploadProgress();
// initial function call end




// Event Listener

overlayBox.addEventListener("click",triggerImageSelect);
reselectButton.addEventListener("click",triggerImageSelect);
actualImageInput.addEventListener("change",showPreview);


// Event Listener end


function triggerImageSelect(){
    actualImageInput.click();
}

function dateUpdate(){
    todaysDate.innerText = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${day[date.getDay()]}`;
}

function showPreview(){
    let fileReader = new FileReader();
    let imageToUpload = actualImageInput.files[0];

    fileReader.readAsDataURL(imageToUpload);

    fileReader.onload = function(){
        // fileReader.result gives the base64 image
        // console.log(fileReader.result);

        imageToUploadPreview.src = fileReader.result;
    }

    // code to display:none overlay box
    overlayBox.classList.remove("d-flex");
    overlayBox.classList.add("d-none");

    reselectButton.style.display = "block";
}


function uploadProgress(){
    let width = 0;
    console.log(actualImageInput.files);

    let t = setInterval(function (){
        progressBarActualProgress.style.width = `${width+1}%`;
        width+=1;
        if(width>100){
            clearInterval(t);
        }
    }, 100);
}

