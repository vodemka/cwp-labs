const rpcWSS = require('rpc-websockets').Server;
let ws = new rpcWSS({ port: 4000, host: 'localhost' });

ws.event('A');
ws.event('B');
ws.event('C');
console.log('Input A, B or C');
let input = process.stdin;
input.setEncoding('utf-8');
process.stdout.write('> ');
input.on('data', data => {
    switch (data[0]) {
        case 'A': { ws.emit('A'); break; }
        case 'B': { ws.emit('B'); break; }
        case 'C': { ws.emit('C'); break; }
        default: console.log('Error');
    }
    process.stdout.write('> ');
});