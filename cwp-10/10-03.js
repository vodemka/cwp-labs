const WebSocket = require('ws');
const wssBroadcastPORT = 5000;

const wss = new WebSocket.Server({ port: wssBroadcastPORT, host: 'localhost', path: '/' })
wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        console.log(data);
        wss.clients.forEach((client) => {
            if (client.readyState == WebSocket.OPEN)
                client.send('Brodacast from server')
        }
        );
    });
});