const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    responseType: 'application/json'
});

const formData = new FormData();
formData.append(
    'myFile',
    fs.createReadStream(__dirname + '/myFile.txt'),
    { knownLength: fs.statSync(__dirname + '/myFile.txt').size }
);

instance.post('/file', formData, {
    headers: {
        ...formData.getHeaders(),
        "Content-Length": formData.getLengthSync()
    }
})
    .then((res) => {
        console.log('data:' + JSON.stringify(res.data));
    })
    .catch((error) => {
        console.log(error);
    });
