const axios = require('axios');
const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    responseType: 'application/json'
});

instance.get('/')
    .then((res) => {
        console.log(res.statusText);
        console.log(res.status);
        console.log('data:' + JSON.stringify(res.data));
    })
    .catch((error) => {
        console.log(error);
    });