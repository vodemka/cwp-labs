const WebSocket = require('ws');
const fs = require('fs');

const wssPORT = 4000;

const wss = new WebSocket.Server({ port: wssPORT, host: 'localhost', path: '/' })

let k = 0;
wss.on('connection', (websocket) => {
    const duplex = WebSocket.createWebSocketStream(websocket, { encoding: 'utf-8' });
    const file = fs.createWriteStream(`./upload/file${++k}.txt`);
    duplex.pipe(file);
});