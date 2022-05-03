import { sRef, storage, ref, uploadBytesResumable, getDownloadURL } from "./firebaseConfig.js"; 
import { SUCCESS_OK, POST_CREATED} from "./constants.js"


let date = new Date();
let months = ["January", "February", "March", "April","May","June", "July", "August", "September", "October", "November", "December"];
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let validFileExtension = ["png", "jpg", "jpeg"];
let isValidFile = false;




// refering the html elements
let imageToUploadPreviewBox = document.getElementById("imageToUploadPreviewBox");
let imageToUploadPreview = document.getElementById("imageToUploadPreview");
let overlayBox = document.getElementById("overlayBox");
let todaysDate = document.getElementById("todaysDate");
let actualImageInput = document.getElementById("actualImageInput");
let captionInp = document.getElementById("captionInp");
let invalidFileWarningText= document.getElementById("invalidFileWarningText");
let reselectButton = document.getElementById("reselectButton");
let postButton = document.getElementById("postButton");
let progressBarActualProgress = document.getElementById("progressBarActualProgress");
let uploadStatusText = document.getElementById("uploadStatusText");

// initial function call
dateUpdate();
// uploadProgress();
// initial function call end




// Event Listener

overlayBox.addEventListener("click",triggerImageSelect);
reselectButton.addEventListener("click",triggerImageSelect);
actualImageInput.addEventListener("change",showPreview);
postButton.addEventListener("click",uploadFile);
// Event Listener end


function triggerImageSelect(){
    // resetting the isValidfile value before every preview
    let isValidFile = false;

    invalidFileWarningText.style.display = "none";
    actualImageInput.click();
}

function dateUpdate(){
    todaysDate.innerText = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${day[date.getDay()]}`;
}

function showPreview(){
    let fileReader = new FileReader();
    let imageToUpload = actualImageInput.files[0];
    // console.log(imageToUpload.name);

    // checking for the correct extension
    let fileFullName =  imageToUpload.name;
    let fileNameParts = fileFullName.split(".");
    let fileNamePartsLength = fileNameParts.length;
    console.log(fileNameParts);

    //filtering multiple extension
    if( fileNameParts.length == 2){
        console.log(fileNameParts[(fileNamePartsLength-1)]);
        if( ! validFileExtension.includes(fileNameParts[(fileNamePartsLength-1)].toLowerCase()) ){
            invalidFileWarningText.innerText = "this type of file not allowed";
            invalidFileWarningText.style.display = "block";
        }
        else{
            console.log("valid file");
            isValidFile = true;
            console.log(isValidFile);
        }
    }
    else{
        invalidFileWarningText.innerText = "invalid file, file must not contains more than one .(period/dot) in its name";
        invalidFileWarningText.style.display = "block";
    }

    // showing image preview
    fileReader.readAsDataURL(imageToUpload);
    fileReader.onload = function(){
        // fileReader.result gives the base64 image
        // console.log(fileReader.result);

        imageToUploadPreview.src = fileReader.result;
    }

    // making overlay box display:none
    overlayBox.classList.remove("d-flex");
    overlayBox.classList.add("d-none");

    reselectButton.style.display = "block";
}




function uploadFile(){
    // progressBarActualProgress.style.width = `${0}%`;

    uploadStatusText.innerText = "Upload in progress ...";
    uploadStatusText.classList.toggle("uploadStatusTextProgress");
    uploadStatusText.style.display = "block";
    
    

    console.log(isValidFile);
    if( isValidFile === true){
        console.log("upload initiated");
        let imageToUpload = actualImageInput.files[0];
        let fileReader = new FileReader();

        let base64EncodedStringOfImageToUpload;
        
        fileReader.readAsDataURL(imageToUpload);
        fileReader.onload = function(){
            // fileReader.result gives the base64 image
            // console.log(fileReader.result);
    
            base64EncodedStringOfImageToUpload = fileReader.result;
            console.log(base64EncodedStringOfImageToUpload);

            date = new Date();
            $.ajax({
                method: "POST",
                url: "/postUpload",
                data: { 
                    ownerUserId: localStorage.getItem("opinionUserId"),
                    dateOfUpload: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${day[date.getDay()]}`,
                    postContent: base64EncodedStringOfImageToUpload,
                    postCaption: (captionInp.value.trim().length === 0)?"...":captionInp.value.trim(),
                }
            })
            .done(function( response ) {
                if((response.api_status === SUCCESS_OK) && (response.status === POST_CREATED)){
                    console.log("successful raha");

                    uploadStatusText.innerText = "Post uploaded successfully";
                    uploadStatusText.classList.toggle("uploadStatusTextProgress");
                    uploadStatusText.classList.toggle("uploadStatusTextSuccess");
                    uploadStatusText.style.display = "block";
                }
                else{
                    console.log("unsuccessful raha");

                    uploadStatusText.innerText = "Post uploaded failed";
                    uploadStatusText.classList.toggle("uploadStatusTextProgress");
                    uploadStatusText.classList.toggle("uploadStatusTextFail");
                    uploadStatusText.style.display = "block";
                }

                setTimeout( redirectToHome , 3000);
            });

        }
        
    }
    else{
        invalidFileWarningText.innerText = "select a valid file to upload";
        invalidFileWarningText.style.display = "block";
    }
}


function redirectToHome(){
    window.location.href="/homePage";
}
/*
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
*/





