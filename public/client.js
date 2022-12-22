const socket = io()

let namee;
let textarea = document.querySelector('#textarea')
let msgArea = document.querySelector('.msg__area')
var audio = new Audio('ting.mp3');
audio.volume = 0.5

var audio1 = new Audio('audio11.mp3');
audio1.volume = 0.2
var audio2 = new Audio('audio22.mp3');
audio2.volume = 0.4

//prompt
do {
    namee = prompt('Please enter your name: ')
} while(!namee)


// 'enter' as send button
textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

// sending msg
function sendMessage(message){
    let msg = {
        user: namee,
        message: message.trim()
    }

    // append
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    //send to server
    socket.emit('message', msg)

    audio.play();
    audio1.play();
    audio1.loop = true;
    audio2.play();
    audio2.loop = true;
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    msgArea.appendChild(mainDiv)
}

// recieve msg
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    msgArea.scrollTop = msgArea.scrollHeight
}