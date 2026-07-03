const API =
"https://script.google.com/a/macros/bigosbrewhouse.com/s/AKfycbzGUQZ8VjYD3k7VNk9lSFjAJitGunlckogyiSecZ_U1hFTYO2PGe5FL43PlBql1vrTH/exec";


async function sendMessage(){

    const text =
        document.getElementById("message").value;

    if(!text) return;

    addMessage("You",text);

    document.getElementById("message").value="";

    const response =
        await fetch(API,{

            method:"POST",

            body:JSON.stringify({

                command:text

            })

        });

    const json =
        await response.json();

    addMessage(
        "Little O",
        json.response
    );

}


function addMessage(sender,text){

    const div =
        document.createElement("div");

    div.innerHTML =
        `<b>${sender}</b><br>${text}<br><br>`;

    document
        .getElementById("conversation")
        .appendChild(div);

}


let recognition;

function startListening(){

    recognition =
        new webkitSpeechRecognition();

    recognition.lang="en-US";

    recognition.onresult=function(e){

        document
            .getElementById("message")
            .value =
            e.results[0][0].transcript;

        sendMessage();

    };

    recognition.start();

}
