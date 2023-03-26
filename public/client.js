

const socket=io()

let name;
let input=document.querySelector('.input');
let msg_area=document.querySelector('.msg_area');
do{
   name= prompt("Please enter your name");
}while(!name) 

input.addEventListener('keyup', (e) =>{
    if(e.key == 'Enter'){
        sendMessage(e.target.value)
    }
})
function sendMessage(message) {
    let msg={
        user:name,
        message:message.trim()
    }

    // append
    appendMessage(msg,'out');
    input.value="";
    scrolltobottom();

    // send to server
    socket.emit('message', msg)
}

function appendMessage(msg,type){
    let mainDiv=document.createElement('div');
     let classname=type
     mainDiv.classList.add(classname,'msg');

     let markup=
     `
     <h4>${msg.user}</h4>
     <p>${msg.message}</p>
     `

     mainDiv.innerHTML=markup;
     msg_area.appendChild(mainDiv);
}

// receive msg

socket.on('message',(msg) =>{
     appendMessage(msg, 'incom')
     scrolltobottom();
})

function scrolltobottom(){
    msg_area.scrollTop=msg_area.scrollHeight
}