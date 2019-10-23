const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 5000;
const DIRECTORY = __dirname + '/public';
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');
const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use(express.json());
app.use(xmlparser());

app.get('/connection', (req, res) => {
    let newValue = Number(req.query.set);
    if (Number.isInteger(newValue)) {
        server.keepAliveTimeout = newValue;
        let html = '<h3>Set new value of keepAliveTimeout = ' + server.keepAliveTimeout + '</h3>';
        res.send(html);
    } else {
        let html = '<h3>keepAliveTimeout = ' + server.keepAliveTimeout + '</h3>';
        res.send(html);
    }
});

app.get('/headers', (req, res) => {
    res.set('X-Author', 'Dokurno Vadim');
    let html = '<h3>Request headers:</h3>';
    html += JSON.stringify(req.headers);
    html += '<h3>Response headers:</h3>';
    html += JSON.stringify(res.getHeaders());
    res.send(html);
});

app.get('/parameter', (req, res) => {
    let x = Number(req.query.x);
    let y = Number(req.query.y);
    if (Number.isInteger(x) && Number.isInteger(y)) {
        let html = paramsXAndY(x, y);
        res.send(html);
    } else {
        let html = '<h3>Error: check "x" or/and "y" values</h3>';
        res.send(html);
    }
});

app.get('/parameter/:x/:y', (req, res) => {
    let x = Number(req.params.x);
    let y = Number(req.params.y);
    if (Number.isInteger(x) && Number.isInteger(y)) {
        let html = paramsXAndY(x, y);
        res.send(html);
    } else {
        res.send(req.url);
    }
});

app.get('/close', (req, res) => {
    res.send("Server will close after 10 seconds");
    setTimeout(() => { server.close(); process.exit(1); }, 10000);
});

app.get('/socket', (req, res) => {
    let result = {
        serverIp: req.connection.remoteAddress,
        serverPort: req.connection.remotePort,
        clientIp: req.connection.localAddress,
        clientPort: req.connection.localPort
    };
    res.json(result);
});

app.get('/req-data', (req, res) => {
    let data = [];
    req.on('data', chunk => data.push(chunk));
    req.on('end', () => {
        console.log(data);
        res.end();
    });
});

app.get('/resp-status', (req, res) => {
    let code = req.query.c;
    let message = req.query.m;
    res.statusCode = code;
    res.statusMessage = message;
    res.send();
});

app.get('/formparameter', (req, res) => {
    res.sendFile('public/formparameter.html', { root: __dirname });
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/formparameter', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    res.json(req.body);
});

app.post('/json', (req, res) => {
    let json = req.body;
    res.json({
        __comment: 'Response.' + json.__comment.split('.')[1],
        x_plus_y: json.x + json.y,
        Concatination_s_o: json.s + ': ' + json.o.surname + ', ' + json.o.name,
        Length_m: json.m.length
    });
});

app.post('/xml', (req, res) => {
    let xml = req.body;
    let sum = 0;
    xml.request.x.forEach(element => {
        sum += Number(element.$.value);
    });
    let concat = '';
    xml.request.m.forEach(element => {
        concat += element.$.value;
    })
    res.setHeader('Content-Type', 'text/xml');
    let newXml =
        `<response id="1" request="${xml.request.$.id}">` +
        `<sum element = "x" result = "${sum}"/>` +
        `<concat element = "m" result = "${concat}"/>` +
        `</response>`;
    res.send(newXml);
});

app.get('/files', (req, res) => {
    let count = 0;
    fs.readdir(DIRECTORY, (err, files) => {
        count = files.length;
        res.setHeader('X-static-files-count', count);
        res.end();
    });
});

app.get('/files/:filename', (req, res) => {
    let filename = req.params.filename;
    fs.readdir(DIRECTORY, (err, files) => {
        if (err) {
            res.status(404).end();
        } else {
            res.sendFile(DIRECTORY + `/${filename}`);
        }
    });
});

app.get('/upload', (req, res) => {
    res.sendFile('public/formupload.html', { root: __dirname });
})

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let sampleFile = req.files.sampleFile;
    sampleFile.mv(DIRECTORY + `/${sampleFile.name}`, function (err) {
        if (err)
            return res.status(500).send(err);
        res.send('File uploaded!');
    });
});

function paramsXAndY(x, y) {
    html = '<h3>x + y = ' + (x + y) + '</h3>';
    html += '<h3>x - y = ' + (x - y) + '</h3>';
    html += '<h3>x * y = ' + (x * y) + '</h3>';
    html += '<h3>x / y = ' + (x / y) + '</h3>';
    return html;
}

const server = app.listen(PORT, () => {
    console.log('Server running at http://localhost:5000/');
});
