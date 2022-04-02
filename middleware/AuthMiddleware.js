let authorizationHandler = function(req, res, next){
    if(req.headers.authorization){
        let bearerToken = req.headers.authorization;
        let tmp = bearerToken.split(' ')[1];
        req.userTokenId = tmp ? tmp : bearerToken;
        console.log("Setting req.userTokenId to "+req.userTokenId);
    }
    
    next();
}
module.exports = authorizationHandler;