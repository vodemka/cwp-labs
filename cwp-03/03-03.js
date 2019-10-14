const http = require("http");
const url = require("url");
const fs = require("fs");

let fact = (num) => {
    if (num === 0) { return 1; }
    else { return num * fact(num - 1); }
}

http.createServer(function (request, response) {
    let rc = JSON.stringify({ k: 0, fact: 0 });
    if (url.parse(request.url).pathname === "/fact") {
        if (typeof url.parse(request.url, true).query.k != "undefined") {
            let k = parseInt(url.parse(request.url, true).query.k);
            if (Number.isInteger(k)) {
                //response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
                response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                response.end("<!DOCTYPE html>"+
                    "<html>"+
                    "<head><title>Document</title></head>"+
                    "<body><h3>Влада милашка!!!</h3></body>"+
                    "</html >");
            }
        }
    }
    else if (url.parse(request.url).pathname === "/") {
        let start_time = new Date().getTime();
        var t = fs.readFileSync("index.html");
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.end(t);
    }
    else { response.end(rc); }
}).listen(5001);
console.log("Server running at http://localhost:5001/");

