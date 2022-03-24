const MongoClient = require('mongodb').MongoClient
let connectionString = "mongodb+srv://kevin:2zt83wSFXTtQaYSg@cluster0.mlqtk.mongodb.net/m1p9mean-kevin?retryWrites=true&w=majority";
let databaseName = "m1p9mean-kevin";

var client = null;
var db = null;

let connect = async function(){
    if(!db) {
        client = await MongoClient.connect(connectionString, { useUnifiedTopology: true });
        db = client.db(databaseName);
    }
    return db;
}

module.exports.connect = connect;