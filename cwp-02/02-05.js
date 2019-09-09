const http = require("http");
const fs = require("fs");


http.createServer(function (request, response) {
    const filePath = 'info.json';
    if (request.url === "/api/name") {
        fs.stat(filePath, (err, stat) => {
            if (err) { console.log('error:' + err.message); }
            else {
                info = fs.readFile(filePath, (err, data) => {
                    response.contentType = 'text/plain';
                    response.contentLength = stat.size;
                    response.end(data);
                });
            }
        })
    }

    if (request.url === "/fetch") {
        let html = fs.readFileSync('fetch.html');
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(html);
    }

}).listen(5000);
console.log("Server running at http://localhost:5000/");
