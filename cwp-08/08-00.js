const http = require("http");
const url = require("url");
const fs = require("fs");
const qs = require("querystring");


let http_handler = (req, res) => {
    switch (req.method) {
        case "GET": GET_handler(req, res); break;
        //case "POST": GET_handler(req, res); break;
        default: writeHTTP405(req, res); break;
    }
};

let GET_handler = (req, res) => {
    let params = url.parse(req.url, true).query;

    switch (url.parse(req.url).pathname) {
        case "/connection": {
            let newValue = Number(params.set);
            if (Number.isInteger(newValue)) {
                server.keepAliveTimeout = newValue;
                let html = "<h3>Set new value of keepAliveTimeout = " + server.keepAliveTimeout + "</h3>";
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end(html);
            } else {
                let html = "<h3>keepAliveTimeout = " + server.keepAliveTimeout + "</h3>";
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end(html);
            }
            break;
        }

        case "/headers": {
            res.setHeader("X-Author", "Dokurno Vadim");
            let html = "<h3>Request headers:</h3>";
            html += JSON.stringify(req.headers);
            html += "<h3>Response headers:</h3>";
            html += JSON.stringify(res.getHeaders());
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(html);
            break;
        }

        case "/parameter": {
            let x = Number(params.x);
            let y = Number(params.y);
            if (Number.isInteger(x) && Number.isInteger(y)) {
                let html = "<h3>x + y = " + (x + y) + "</h3>";
                html += "<h3>x - y = " + (x - y) + "</h3>";
                html += "<h3>x * y = " + (x * y) + "</h3>";
                html += "<h3>x / y = " + (x / y) + "</h3>";
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end(html);
            } else {
                let html = "<h3>Error: check 'x' or/and 'y' values</h3>";
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end(html);
            }
            break;
        }

        case "/para/:x/:y": {
            let html = "<h3>Error: check 'x' or/and 'y' values</h3>";
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(html);
        }

        default: {
            let path = url.parse(req.url).pathname.split("/");
            console.log(path);
            writeHTTP404(req, res);
            break;
        }
    }
}

let writeHTTP405 = (req, res) => {
    console.log(`${req.method}: ${req.url}, HTTP status 405`);
    res.writeHead(405, { "Content-Type": "application/json; charset=utf-8" });
    res.end(`{"error":"${req.method}: ${req.url}, HTTP status 405"}`);
};

let writeHTTP404 = (req, res) => {
    res.statusCode = 404;
    res.statusMessage = "Resourse not found";
    res.end("Resourse not found");
};

let server = http.createServer();

server.listen(5000, (v) => { console.log("Server running at http://localhost:5000/") })
    .on("error", (e) => { console.log("server: error: ", e.code) })
    .on("request", http_handler);