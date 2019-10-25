const WebSocket = require('ws');

let count = 0;
let messageInterval;
let socket = new WebSocket('ws:/localhost:4000');
socket.onopen = () => {
    console.log('Socket opened');
    messageInterval = setInterval(() => {
        socket.send(`10-01-client:${count++}`);
    }, 3000);
}
socket.onclose = () => {
    console.log('Socket closed');
}
socket.onmessage = (e) => {
    console.log(e.data);
}
socket.onerror = (error) => {
    alert('Error' + error.message);
}
setTimeout(() => {
    clearInterval(messageInterval);
    socket.close();
}, 25000);