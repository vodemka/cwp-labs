const axios = require('axios');
const fs = require('fs');

const instance = axios.create({
    baseURL: 'http://localhost:5000/'
});
const file = fs.createWriteStream('myFile.png');

instance.get('/getMyFile')
    .then((res) => {
        console.log(res.statusText);
        console.log(res.status);
    })
    .catch((error) => {
        console.log(error);
    });