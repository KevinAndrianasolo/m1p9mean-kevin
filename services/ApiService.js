let DBUtils = require('../utils/DBUtils');
var ObjectId = require('mongodb').ObjectId; 

let findAll = async function(model){
    let db = await DBUtils.connect();
    let collection = db.collection(model);
    let res = await collection.find().toArray();
    return res;
};
let findById = async function(model, id){
    let db = await DBUtils.connect();
    let collection = db.collection(model);
    let res = await collection.findOne({
        _id : new ObjectId(id)
    });
    return res;
};
let save = async function(model, object){
    let db = await DBUtils.connect();
    let collection = db.collection(model);
    let res = await collection.insertOne(object);
    return res.insertedId;
};
let saveAll = async function(model, tab){
    for(let i=0; i<tab.length; i++){
        await save(model, tab[i]);
    }
};

let find = async function(model, object){
    
    let db = await DBUtils.connect();
    let collection = db.collection(model);
    let res = await collection.find(object).toArray();
    return res;
};
let findOne = async function(model, object){
    let db = await DBUtils.connect();
    let collection = db.collection(model);
    let res = await collection.findOne(object);
    return res;
};
let update = async function(model, id, object){
    let db = await DBUtils.connect();
    let collection = db.collection(model);
    let res = await collection.findOneAndUpdate({
            _id : new ObjectId(id)
        }, {
            $set : object
        });
    return res;
}; 

let deleteById = async function(model, id){
    let db = await DBUtils.connect();
    let collection = db.collection(model);
    
    let res = await collection.deleteOne({
        _id : new ObjectId(id)
    });
    return res;
};

module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.save = save;
module.exports.update = update;
module.exports.deleteById = deleteById;
module.exports.find = find;
module.exports.saveAll = saveAll;
module.exports.findOne = findOne;



