const rpcWSC = WebSocket = require('rpc-websockets').Client;

let ws = new rpcWSC('ws://localhost:4000/');
ws.on('open', () => {
    ws.subscribe('C');
    ws.on('C', () => console.log('on C event'));
});