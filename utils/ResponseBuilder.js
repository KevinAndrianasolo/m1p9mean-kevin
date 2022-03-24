let error = function(status, msg){
    return {
        META : {
            status : status,
            message : msg
        },
        DATA : null
    }
};

let success = function(status, msg, data){
    return {
        META : {
            status : status,
            message : msg
        },
        DATA : data
    }
};

module.exports.error =error;
module.exports.success =success;
