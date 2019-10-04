const ee = require("events");
const util = require("util");

var db_data = [
    { id: 1, name: "Vadim", bday: 2000 },
    { id: 2, name: "Egor", bday: 2000 },
    { id: 3, name: "Petya", bday: 2000 },
    { id: 4, name: "Andrey", bday: 2000 },
    { id: 5, name: "Yarik", bday: 2000 }
];

class DB {
    constructor() {
        this.get = () => { return db_data; };
        this.post = (r) => { db_data.push(r); };
        this.delete = (id) => {
            try {
                let res = db_data.find(obj => { return obj.id === id; });
                if (res != "undefined") {
                    for (var i = db_data.length - 1; i >= 0; --i) {
                        if (db_data[i].id == res.id) {
                            db_data.splice(i, 1);
                            return;
                        }
                    }
                    ;
                    return res;
                }
            }
            catch (err) {
                return "Not found";
            }
        };
        this.put = (r) => {
            try {
                let res = db_data.find(obj => {
                    return obj.id === parseInt(r.id);
                });
                if (res != "undefined") {
                    for (var i = db_data.length - 1; i >= 0; --i) {
                        if (db_data[i].id == res.id) {
                            db_data[i].name = r.name;
                            return;
                        }
                    }
                    ;
                    return res;
                }
            }
            catch (err) {
                return "Not found";
            }
        };
    }
}

util.inherits(DB, ee.EventEmitter);

exports.DB = DB;