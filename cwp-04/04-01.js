const http = require("http");
const url = require("url");
const fs = require("fs");
let data = require("./db");

let db = new data.DB();

db.on("GET", async (req, res) => {
    console.log("DB.GET");
    await res.end(JSON.stringify(await db.get()));
});

db.on("POST", async (req, res) => {
    console.log("DB.POST");
    req.on("data", async data => {
        let r = JSON.parse(data);
        await db.post(r);
        await res.end(JSON.stringify(await r));
    })
});

db.on("PUT", async (req, res) => {
    console.log("DB.PUT");
    req.on("data", async data => {
        let r = JSON.parse(data);
        await db.put(r);
        await res.end(JSON.stringify(r));
    })
});

db.on("DELETE", async (req, res) => {
    console.log("DB.DELETE");
    let url = new URL("http://localhost:5000" + req.url);
    let id = parseInt(url.searchParams.get("id"));
    await res.end(JSON.stringify(await db.delete(id)));
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

