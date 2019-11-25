const rpcWSC = WebSocket = require('rpc-websockets').Client;
let ws = new rpcWSC('ws://localhost:4000/');
ws.on('open', () => {
    console.log('Input A, B, C to send notification');
    let input = process.stdin;
    input.setEncoding('utf-8');
    process.stdout.write('> ');
    input.on('data', data => {
        switch (data[0]) {
            case 'A': { ws.notify('A'); process.stdout.write('> '); break; }
            case 'B': { ws.notify('B'); process.stdout.write('> '); break; }
            case 'C': { ws.notify('C'); process.stdout.write('> '); break; }
            default: {
                console.log('Error'); process.stdout.write('> ');
            }
        }
    });
});