class Stat {
    constructor(sfn = './static') {
        this.STATIC_FOLDER = sfn;
        let pathStatic = (fn) => { return `${this.STATIC_FOLDER}${fn}`; };
        this.writeHTTP404 = (req, res) => {
            res.statusCode = 404;
            res.statusMessage = "Resourse not found";
            res.end("Resourse not found");
        };
        this.writeHTTP405 = (req, res) => {
            console.log(`${req.method}: ${req.url}, HTTP status 405`);
            res.writeHead(405, { "Content-Type": "application/json; charset=utf-8" });
            res.end(`{"error":"${req.method}: ${req.url}, HTTP status 405"}`);
        };
        let fs = require("fs");
        let pipeFile = (req, res, headers) => {
            res.writeHead(200, headers);
            fs.createReadStream(pathStatic(req.url)).pipe(res);
        };
        this.isStatic = (ext, fn) => {
            let reg = new RegExp(`^\/.+\.${ext}$`);
            return reg.test(fn);
        };
        this.sendFile = (req, res, headers) => {
            fs.access(pathStatic(req.url), fs.constants.R_OK, err => {
                if (err)
                    this.writeHTTP404(res);
                else
                    pipeFile(req, res, headers);
            });
        };
    }
}

module.exports = (parm) => { return new Stat(parm); }