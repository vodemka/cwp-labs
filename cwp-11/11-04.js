const WebSocket = require('ws');
const wssPORT = 4000;

const wss = new WebSocket.Server({ port: wssPORT, host: 'localhost' });
let n = 0;

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        let pdata = JSON.parse(data);
        console.log('on message: ', pdata);
        ws.send(JSON.stringify({ server: ++n, client: pdata.client, timestamp: pdata.timestamp }));
    });
});

wss.on('error', (e) => { console.log('wss server error ', e); });
