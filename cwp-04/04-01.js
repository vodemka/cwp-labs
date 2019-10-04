const http = require("http");
const url = require("url");
const fs = require("fs");
var data = require("./db");

var db = new data.DB();

db.on("GET", (req, res) => {
    console.log("DB.GET");
    res.end(JSON.stringify(db.get()));

});

db.on("POST", (req, res) => {
    console.log("DB.POST");
    req.on("data", data => {
        let r = JSON.parse(data);
        db.post(r);
        res.end(JSON.stringify(r));
    })
});

db.on("PUT", (req, res) => {
    console.log("DB.PUT");
    req.on("data", data => {
        let r = JSON.parse(data);
        db.put(r);
        res.end(JSON.stringify(r));
    })
});

db.on("DELETE", (req, res) => {
    console.log("DB.DELETE");
    var url = new URL("http://localhost:5000" + req.url);
    var id = parseInt(url.searchParams.get("id"));
    res.end(JSON.stringify(db.delete(id)));
});

http.createServer(function (request, response) {
    if (url.parse(request.url).pathname === "/") {
        let html = fs.readFileSync("./04-01.html");
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.end(html);
    }
    else {
        if (url.parse(request.url).pathname === "/api/db") {
            if (typeof url.parse(request.url, true).query.id != "undefined") {
                let id = parseInt(url.parse(request.url, true).query.id);
                if (Number.isInteger(id)) {
                    db.emit("DELETE", request, response);
                }
            }
            else {
                db.emit(request.method, request, response);
            }
        }
    }
}).listen(5000);
console.log("Server running at http://localhost:5000/");

