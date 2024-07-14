const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
form.addEventListener('submit',(e)=>{
     e.preventDefault();
     const message = messageInput.value;
     append(`You:${message}`,"mymessage")
     socket.emit('send',message)
     messageInput.value = '';
})
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('connect_error', (error) => {
    console.error('Connection failed:', error);
});
const name1 = prompt("Enter your name to join");
console.log(name1);
socket.emit('new-user-joined',name1)

socket.on('user-joined',data=>{
    append(`${data} joined the chat`,"mymessage");
})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,"othersmessage");
})

socket.on('left',data=>{
    append(`${data} left the chat`,"mymessage")
})

