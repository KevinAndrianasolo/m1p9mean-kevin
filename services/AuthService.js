let DBUtils = require('../utils/DBUtils');
let ApiService = require('./ApiService');
const Collections = require("../classes/Collections");
const { ObjectId } = require('mongodb');


let check = async function(authObj){
    try{
        let userId = await findUserIdWithUserTokenId(authObj.userTokenId);
        let db = await DBUtils.connect();
        let collection = db.collection(Collections.USER);
        let user = await collection.findOne({
            _id : new ObjectId(userId),
            profileId : authObj.profileId
        });
    
        if(user==null) return false;
        return true;
    }
    catch(e){
        return false;
    }
    
};
let signup = async function(user){
    let userId = await ApiService.save(Collections.USER, user);
    let userTokenId = await saveUserToken(userId);
    let profile = await ApiService.findById(Collections.PROFILE, user['profileId']);
    return {
        userTokenId : userTokenId,
        profile : profile
    };
};
let login = async function(user){
    let db = await DBUtils.connect();
    let collection = db.collection(Collections.USER);

    let res = await collection.findOne({
        username : user.username,
        password : user.password
    });
    if(res==null) throw new Error("Account does not exists.");

    let userTokenId = await saveUserToken(res['_id']);
    let profile = await findProfileOfUser(res);
    return {
        userTokenId : userTokenId,
        profile : profile
    };
};
let findProfileOf = async function(userTokenId){
    let user = await findUserIdWithUserTokenId(userTokenId);
    if(user==null) throw new Error("Invalid userToken.");
    return await findProfileOfUser(user);
};

let findProfileOfUser = async function(user){
    let profile = await ApiService.findById(Collections.PROFILE, user['profileId']);
    return profile;
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
    
    if(res==null) throw new Error("Invalid userToken.");
    //return ObjectId.valueOf(res['userId']);
    return res['userId'].toString();

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
module.exports.findProfileOf = findProfileOf;
module.exports.check = check;
module.exports.signup = signup;


