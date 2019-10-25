const axios = require('axios');
const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    responseType: 'application/json'
});

instance.post('/x-y-s', { x: 1, y: 2, s: 3 })
    .then((res) => {
        console.log(res.status);
        console.log('data:' + JSON.stringify(res.data));
    })
    .catch((error) => {
        console.log(error);
    });
