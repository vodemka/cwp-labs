const http = require("http");

http.createServer(function (request, response) {
    let b='';
    request.on('data',str=>{b+=str; console.log('data',b);})

    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    request.on('end',()=>response.end(
        '<DOCTYPE html'+
        '<html><head></head><body>'+
        '<h4>Request stucture:</h5>'+
        '<h6>method: '+ request.method + '</h6>' +
        '<h6>uri: ' + request.url + '</h6>' +
        '<h6>version: ' + request.httpVersion + '</h6>' +
        '<h6>body: ' + b + '</h6>' +
        '</body>' +
        '</html>'
        ));
}).listen(3000);

console.log("Server running at http://localhost:3000/");