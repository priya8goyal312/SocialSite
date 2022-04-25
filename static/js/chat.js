let messageInputBox = document.getElementById("messageInputBox");
let emojiBox = document.getElementById("emojiBox");



// Event Listener

// Event Listener end


// initial calls
emojiBuilder();
// initial calls end

// functions
window.appendEmoji = function (emojiCode) {
    messageInputBox.value = messageInputBox.value + emojiCode;
}


function emojiBuilder() {
    let emojiBoxInnerHTML = "";

    for (let emojiCodeItr = 128512; emojiCodeItr <= 129488; emojiCodeItr++) {
        emojiBoxInnerHTML += `<div class="p-2" onclick="appendEmoji('&#${emojiCodeItr}')">&#${emojiCodeItr}</div>`;
    }
    emojiBox.innerHTML = emojiBoxInnerHTML;
}
// functions end
