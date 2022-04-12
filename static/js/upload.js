import { sRef, storage, ref, uploadBytesResumable, getDownloadURL } from "./firebaseConfig.js"; 

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
let invalidFileWarningText= document.getElementById("invalidFileWarningText");
let reselectButton = document.getElementById("reselectButton");
let postButton = document.getElementById("postButton");
let progressBarActualProgress = document.getElementById("progressBarActualProgress");

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
        invalidFileWarningText.innerText = "invalid file, file must not containe more than one .(period/dot) in its name";
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
    progressBarActualProgress.style.width = `${0}%`;

    console.log(isValidFile);
    if( isValidFile === true){
        console.log("upload initiated");
        let imageToUpload = actualImageInput.files[0];
        let imageName = imageToUpload.name;
        
        const metaData = {
            contentType : imageToUpload.type
        }

        const storageRef = sRef(storage,"Image/"+imageName);
        const uploadTask = uploadBytesResumable(storageRef,imageToUpload,metaData);

        uploadTask.on("state-changed",(snapshot)=>{
            let progress = ( snapshot.bytesTransferred/snapshot.totalBytes )*100;
            console.log(progress);
            progressBarActualProgress.style.width = `${progress+1}%`;
            
        },
        (error)=>{
            console.log("error aa gai h image upload m");
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                console.log(downloadURL);
            });
        });

    }
    else{
        invalidFileWarningText.innerText = "select a valid file to upload";
        invalidFileWarningText.style.display = "block";
    }
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





