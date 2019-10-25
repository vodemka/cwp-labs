const axios = require('axios');
const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    responseType: 'application/json'
});

instance.get('/x-y?x=10&y=6')
    .then((res) => {
        console.log(res.status);
        console.log('data:' + JSON.stringify(res.data));
    })
    .catch((error) => {
        console.log(error);
    });