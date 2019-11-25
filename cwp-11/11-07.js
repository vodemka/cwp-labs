const rpcWSS = require('rpc-websockets').Server;

let server = new rpcWSS({ port: 4000, host: 'localhost' });

server.register('A', () => console.log('A notification was received')).public();
server.register('B', () => console.log('B notification was received')).public();
server.register('C', () => console.log('C notification was received')).public();