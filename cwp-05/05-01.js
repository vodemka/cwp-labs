const http = require("http");
const url = require("url");
const fs = require("fs");
let data = require("./db");

let db = new data.DB();

db.on("GET", async (req, res) => {
    console.log("DB.GET");
    await db.enableStatistics();
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
    await res.end(JSON.stringify(db.delete(id)));
});

db.on("COMMIT", async () => db.commit())

let s = http.createServer(function (request, response) {
    if (url.parse(request.url).pathname === "/") {
        let html = fs.readFileSync("./05-01.html");
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.end(html);
    }
    else if (url.parse(request.url).pathname === "/api/ss") {
        let json = fs.readFileSync("./statistics.json");
        response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        response.end(json);
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

let stdin = process.openStdin();
let timerSD, intervalSC, timerSS = undefined;
let countOfRequest = 0;

stdin.addListener("data", function (d) {
    let command = d.toString().trim().split(" ");
    let first = command[0];
    let second = command[1];
    switch (first) {
        case "sd": {
            switch (second) {
                case undefined: {
                    clearTimeout(timerSD);
                    console.log("Stopping canceled");
                    break;
                }
                default: {
                    try {
                        let sec = parseInt(second);
                        if (timerSD != undefined) {
                            clearTimeout(timerSD);
                        }
                        console.log('Server will be closed after ' + second + ' seconds!');
                        timerSD = setTimeout(() => { s.close(() => { process.exit(1); }) }, sec * 1000);
                        break;
                    }
                    catch (err) {
                        console.log(err.message);
                        console.log("Error: check out input!")
                        break;
                    }
                }
            }
            break;
        }

        case "sc": {
            switch (second) {
                case undefined: {
                    clearInterval(intervalSC);
                    console.log("Commiting canceled");
                    break;
                }
                default: {
                    try {
                        let sec = parseInt(second);
                        console.log('Commiting every ' + second + ' seconds enabled!');

                        intervalSC = setInterval(() => {
                            db.emit("COMMIT");
                        }, sec * 1000);
                        intervalSC.unref();
                        break;
                    }
                    catch (err) {
                        console.log(err.message);
                        console.log("Error: check out input!")
                        break;
                    }
                }
            }
            break;
        }

        case "ss": {
            switch (second) {
                case undefined: {
                    clearTimeout(timerSS);
                    console.log("Collecting statistics canceled");
                    break;
                }
                default: {
                    try {
                        let sec = parseInt(second);
                        console.log('Statistics collection next ' + second + ' seconds enabled!');
                        let today = new Date();
                        let start = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        let count = undefined;
                        let countOfCommitsBefore = db.getCountOfCommits();
                        let countOfCommitsAfter = undefined;
                        timerSS = setTimeout(() => {
                            count = db.disableStatistics();
                            let end = new Date();
                            let finish = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
                            
                            countOfCommitsAfter = db.getCountOfCommits();
                            let obj = {
                                "start": start,
                                "finish": finish,
                                "getrequests": count,
                                "commits": countOfCommitsAfter-countOfCommitsBefore
                            };
                                let statistics = JSON.stringify(obj);
                                fs.writeFileSync("statistics.json", statistics);
                                console.log("You can check statistics in statistics.json ");
                           }, sec * 1000);
                        break;
                    }
                    catch (err) {
                        console.log(err.message);
                        console.log("Error: check out input!")
                        break;
                    }
                }
            }
            break;
        }
        default: {
            console.log("Error: unknow command!");
            break;
        }
    }
});

