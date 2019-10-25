const express = require('express');
const app = express();
const xmlparser = require('express-xml-bodyparser');

const PORT = 5000;
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(xmlparser());
app.use(fileUpload());

app.get('/', (req, res) => {
    let result = {
        serverIp: req.connection.remoteAddress,
        serverPort: req.connection.remotePort,
        clientIp: req.connection.localAddress,
        clientPort: req.connection.localPort
    };
    res.json(result);
});

app.get('/x-y', (req, res) => {
    let x = req.query.x;
    let y = req.query.y;
    res.json({
        xParam: x,
        yParam: y
    });
});

app.post('/x-y-s', (req, res) => {
    let body = req.body;
    res.json({
        "x": body.x,
        "y": body.y,
        "s": body.s
    });
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

app.post('/file', (req, res) => {
    res.json({
        "filename": req.files.myFile.name,
        "filesize": req.files.myFile.size
    })
});

const file = __dirname + '/myFile.png';
app.get('/getMyFile', (req, res) => {
    res.download(file);
})

const server = app.listen(PORT, () => {
    console.log('Server running at http://localhost:5000/');
});