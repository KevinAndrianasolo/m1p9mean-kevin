// mongosh "mongodb+srv://cluster0.mlqtk.mongodb.net/m1p9mean-kevin" --apiVersion 1 --username kevin
// Password : 2zt83wSFXTtQaYSg

const { ObjectId } = require("mongodb");

db.createCollection("profile");
db.createCollection("user");
db.createCollection("userToken");
db.createCollection("restaurant");
db.createCollection("product");
db.createCollection("order");
db.createCollection("orderState");
db.createCollection("restaurantEmployee");


db.restaurantEmployee.remove({});
db.userToken.remove({});
db.user.remove({});
db.order.remove({});
