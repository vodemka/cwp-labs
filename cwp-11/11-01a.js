const WebSocket = require('ws');
const fs = require('fs');

const socket = new WebSocket('ws://localhost:4000/');
const duplex = WebSocket.createWebSocketStream(socket, { encoding: 'utf-8' });
const file = fs.createReadStream('./testFile.txt');
file.pipe(duplex);