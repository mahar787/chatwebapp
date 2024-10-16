
let socket=io();


let form=document.getElementById('form');
let msgInp=document.getElementById("msgInp");
let msgContainer=document.getElementById("msgContainer");
const name=prompt("Enter Your Name");
socket.emit('new-user-come',name);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let msg=msgInp.value;
    append(`You:${msg}`,'right')
    msgInp.value='';
    socket.emit('send',msg);
})

function append(msg,position){
let div=document.createElement('div');
div.innerText=msg;
div.classList.add(position);
msgContainer.appendChild(div);
}
socket.on('user joined',(name)=>{
    append(`${name} has joined the room`,'left');
})

socket.on('recieve',(data)=>{
    append(`${data.name}:${data.msg}`,'left');
})
socket.on('left',(name)=>{
    append(`${name} left the chat`,'left');
})