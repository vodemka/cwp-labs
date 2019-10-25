const axios = require('axios');
const fs = require('fs');
const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    responseType: 'application/xml'
});

instance.post('/xml', fs.readFileSync('./myFile.xml'), {
    headers: { 'Content-Type': 'application/xml' }
})
    .then((res) => {
        console.log('data:' + res.data);
    })
    .catch((error) => {
        console.log(error);
    });
