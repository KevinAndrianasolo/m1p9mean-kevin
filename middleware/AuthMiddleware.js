let authorizationHandler = function(req, res, next){
    if(req.headers.authorization){
        let bearerToken = req.headers.authorization;
        req.userTokenId = bearerToken.split(' ')[1];
        console.log("Setting req.userTokenId to "+req.userTokenId);
    }
    
    next();
}
module.exports = authorizationHandler;