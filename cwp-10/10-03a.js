const WebSocket = require('ws');
let parm = process.argv[2];
let ws = new WebSocket('ws:/localhost:5000');

let prfx = typeof parm == 'undefined' ? 'A' : parm;
ws.on('open', () => {
    let k = 0;
    setInterval(() => {
        ws.send(`client: ${prfx}-${++k}`);
    }, 1000);

    ws.on('message', (message) => {
        console.log(`Received message => ${message}`)
    });

    setTimeout(() => {
        ws.close();
    }, 25000);
});