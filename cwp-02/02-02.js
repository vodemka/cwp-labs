const http = require("http");
const fs = require("fs");

http.createServer(function (request, response) {
    const picPath = 'pic.png';
    if (request.url === "/png") {
        fs.stat(picPath, (err, stat) => {
            if (err) { console.log('error:' + err.message); }
            else {
                png = fs.readFile(picPath, (err, data) => {
                    response.contentType = 'image/png';
                    response.contentLength = stat.size;
                    response.end(data, 'binary');
                });
            }
        })
    }
}).listen(5000);
console.log("Server running at http://localhost:5000/")