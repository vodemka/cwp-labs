const http = require("http");
const url = require("url");
const fs = require("fs");
const stat = require("./m07-01")("./static");

let http_handler = (req, res) => {
    switch (req.method) {
        case "GET": GET_handler(req, res); break;
        default: stat.writeHTTP405(req, res); break;
    }
};

let GET_handler = (req, res) => {
    if (url.parse(req.url).pathname === "/") {
        let html = fs.readFileSync("./index.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html);
    } else {
        if (stat.isStatic('html', req.url)) stat.sendFile(req, res, { "Content-Type": "text/html; charset=utf-8;" });
        else if (stat.isStatic('css', req.url)) stat.sendFile(req, res, { "Content-Type": "text/css; charset=utf-8;" });
        else if (stat.isStatic('js', req.url)) stat.sendFile(req, res, { "Content-Type": "text/javascript; charset=utf-8;" });
        else if (stat.isStatic('docx', req.url)) stat.sendFile(req, res, { "Content-Type": "application/msword" });
        else if (stat.isStatic('png', req.url)) stat.sendFile(req, res, { "Content-Type": "image/png" });
        else if (stat.isStatic('json', req.url)) stat.sendFile(req, res, { "Content-Type": "application/json; charset=utf-8;" });
        else if (stat.isStatic('xml', req.url)) stat.sendFile(req, res, { "Content-Type": "application/xml; charset=utf-8;" });
        else if (stat.isStatic('mp4', req.url)) stat.sendFile(req, res, { "Content-Type": "video/mp4" });
        else stat.writeHTTP404(req, res);
    }
}

let server = http.createServer();

server.listen(5000, (v) => { console.log("Server running at http://localhost:5000/") })
    .on("error", (e) => { console.log("server: error: ", e.code) })
    .on("request", http_handler);