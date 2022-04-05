let DBUtils = require('../utils/DBUtils');
var ObjectId = require('mongodb').ObjectId; 
var Collections = require('../classes/Collections');

let findProfits = async function(){
    let db = await DBUtils.connect();
    let collection = db.collection(Collections.ORDER);
    let res = await collection.aggregate([
        {
          $group: {
            _id: {
              date : { $dateToString: { format: "%d-%m-%Y", date: "$orderDate"} },
              restaurantId : "$restaurantId"
                
            },
             totalProfit: { $sum: "$cost" },
             totalOrders: { $sum: "$quantity" }
          }
        }
      ]).toArray();
    return res;
};
let findProfitOf = async function(restaurantId){
    let db = await DBUtils.connect();
    let collection = db.collection(Collections.ORDER);
    
    let res = await collection.aggregate([
        {
            $match: {
                "restaurantId" : restaurantId
            }
        },
        {
          $group: {
            _id: {
                date : { $dateToString: { format: "%d-%m-%Y", date: "$orderDate"} }
            },
             totalProfit: { $sum: "$cost" },
             totalOrders: { $sum: "$quantity" }
          }
        }
      ]).toArray();
    return res;
};

module.exports.findProfits = findProfits;
module.exports.findProfitOf = findProfitOf;



