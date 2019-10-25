const axios = require('axios');
const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    responseType: 'application/json'
});

instance.post('/json', {
    "__comment": "Request. Hello everyone",
    "x": 5,
    "y": 6,
    "s": "Message",
    "m": [
        "a",
        "b",
        "c"
    ],
    "o": {
        "surname": "Vadim",
        "name": "Dokurno"
    }
})
    .then((res) => {
        console.log('data:' + JSON.stringify(res.data));
    })
    .catch((error) => {
        console.log(error);
    });
