const ee = require("events");
const util = require("util");

var db_data = [
    { id: 1, name: "Vadim", bday: 2000 },
    { id: 2, name: "Egor", bday: 2000 },
    { id: 3, name: "Petya", bday: 2000 },
    { id: 4, name: "Andrey", bday: 2000 },
    { id: 5, name: "Yarik", bday: 2000 }
];

let countOfRequests = 0;
let countOfCommits = 0;

class DB {

    constructor() {

        this.get = async () => { return await db_data; };
        this.post = async (r) => { await db_data.push(r); };
        this.delete = async (id) => {
            try {
                let res = await db_data.find(obj => { return obj.id === id; });
                if (res != undefined) {
                    for (var i = db_data.length - 1; i >= 0; --i) {
                        if (db_data[i].id == res.id) {
                            db_data.splice(i, 1);
                            break;
                        }
                    };
                    return await res;
                }
            }
            catch (err) {
                return await "Not found";
            }
        };
        this.put = async (r) => {
            try {
                let res = db_data.find(obj => {
                    return obj.id === parseInt(r.id);
                });
                if (res != undefined) {
                    for (var i = db_data.length - 1; i >= 0; --i) {
                        if (db_data[i].id == res.id) {
                            db_data[i].name = r.name;
                            return;
                        }
                    }
                    ;
                    return await res;
                }
            }
            catch (err) {
                return await "Not found";
            }
        };
        this.enableStatistics = () => {
            countOfRequests++;
        }
        this.disableStatistics = () => {
            let result = countOfRequests;
            countOfRequests = 0;
            return result;
        }
        this.commit = async () => {
            let time = new Date();
            console.log("Commited at " + time.toDateString() + " " + time.toTimeString());
            countOfCommits++;
        }
        this.getCountOfCommits = () => {
            return countOfCommits;
        }
    }
}

util.inherits(DB, ee.EventEmitter);

exports.DB = DB;