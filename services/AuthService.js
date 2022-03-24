let DBUtils = require('../utils/DBUtils');
let ApiService = require('./ApiService');
var ObjectId = require('mongodb').ObjectId; 
const Collections = require("../classes/Collections");

let login = async function(user){
    let db = await DBUtils.connect();
    let collection = db.collection(Collections.USER);

    let res = await collection.findOne({
        username : user.username,
        password : user.password
    });
    console.log(res);
    if(res==null) throw new Error("Account does not exists.");

    let userTokenId = await saveUserToken(res['_id']);
    console.log(userTokenId);
    return userTokenId;
};

let saveUserToken = async function(userId){
    let res = await ApiService.save(Collections.USER_TOKEN, {
        userId : userId,
        expirationDate : null
    });
    return res;
};

let findUserIdWithUserTokenId = async function(userTokenId){
    let res = await ApiService.findById(Collections.USER_TOKEN, userTokenId);
    return res['userId'];
};

let findUserWithUserTokenId = async function(userTokenId){
    let userId = await findUserIdWithUserTokenId(userTokenId);
    let res = await ApiService.findById(Collections.USER, userId);
    return res;
};

let logout = async function(userTokenId){
    let res = await ApiService.deleteById(Collections.USER_TOKEN, userTokenId);
    return res;
};


module.exports.login = login;
module.exports.logout = logout;

module.exports.findUserWithUserTokenId = findUserWithUserTokenId;
module.exports.findUserIdWithUserTokenId = findUserIdWithUserTokenId;

