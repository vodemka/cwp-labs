const WebSocket = require('ws');
const fs = require('fs');

const wssPORT = 4000;

const wss = new WebSocket.Server({ port: wssPORT, host: 'localhost' });
wss.on('connection', (websocket) => {
    const duplex = WebSocket.createWebSocketStream(websocket, { encoding: 'utf-8' });
    const file = fs.createReadStream("./download/file.txt");
    file.pipe(duplex);
});