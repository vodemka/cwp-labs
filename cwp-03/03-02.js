const http = require("http");
const url = require("url");

let fact = (num) => {
    if (num === 0) { return 1; }
    else { return num * fact(num - 1); }
}

http.createServer(function (request, response){
    let rc = JSON.stringify({k:0});
    if (url.parse(request.url).pathname === "/fact"){
        if (typeof url.parse(request.url,true).query.k != "undefined"){
            let k = parseInt(url.parse(request.url, true).query.k);
            if (Number.isInteger(k)){
                response.writeHead(200, {"Content-Type":"application/json; charset=utf-8"});
                response.end(JSON.stringify({k:k, fact: fact(k)}));
            }
        }
    }
    else {
        response.end(rc);
    }
}).listen(5000);
console.log("Server running at http://localhost:5000/");