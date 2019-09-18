const http = require("http");
const server = http.createServer();
let state = "norm";

server.on("request", (request, response) => {
    response.contentType = "text/html";
    response.end('<h1>' + state + '</h1>');
});
server.listen(5000);
console.log("Server running at http://localhost:5000/");
console.log(state + "->");

let stdin = process.openStdin();
stdin.addListener("data", function (d) {
    if (d.toString().trim() === "exit") { process.exit(1) }
    else {
        switch (d.toString().trim()) {
            case "norm":
            case "idle":
            case "test":
            case "stop": {
                console.log('reg = ' + state + ' -> ' + d.toString().trim());
                console.log('----------');
                state = d.toString().trim();
                console.log(state + "->");
                break;
            }
            default: {
                console.log('reg = ' + state + ' -> ' + d.toString().trim());
                console.log('----------');
                console.log(state + "->");
                break;
            }
        }
    }
});

