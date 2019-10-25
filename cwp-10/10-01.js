const express = require('express');
const WebSocket = require('ws');
const app = express();

const httpPORT = 3000;
const wssPORT = 4000;

const DIRECTORY = __dirname + '/public/';

const wss = new WebSocket.Server({ port: wssPORT, host: 'localhost', path: '/' })

app.use('/', (req, res) => {
    if (req.method === "GET" && req.url === "/start") {
        res.sendFile(DIRECTORY + 'start.html');
    } else {
        res.statusCode = 400;
        res.send('400 Error');
    }
});

let toClientNumber = 0;
wss.on('connection', (ws) => {
    let lastReceived = 0;
    ws.on('message', (message) => {
        console.log(`Recieved message => ${message}`);
        lastReceived = parseInt(message.toString().substr(13));
    });
    setInterval(() => {
        ws.send(`10-01-server:${lastReceived}->${toClientNumber++}`)
    }, 5000);
    ws.on('close', () => {
        console.log('Socket closed')
    });
});

const server = app.listen(httpPORT, () => {
    console.log('Server running at http://localhost:3000/');
});