db.createCollection("profile");
db.createCollection("user");
db.createCollection("userToken");
db.createCollection("restaurant");
db.createCollection("product");
db.createCollection("order");
db.createCollection("orderState");
db.createCollection("restaurantEmployee");



/*
* PROFILES :
*/
db.profile.insertOne({
    "name": 'client',
    "label": 'Client'
}); //623c53d638be7c619737b1b1

db.profile.insertOne({
    "name": 'restaurant',
    "label": 'Restaurant'
}); //623c549d38be7c619737b1b2

db.profile.insertOne({
    "name": 'delivery-man',
    "label": 'Livreur'
}); //623c54b038be7c619737b1b3

db.profile.insertOne({
    "name": 'e-kaly',
    "label": 'E-kaly'
}); //623c54d638be7c619737b1b4


/**
 * USERS :
 */
 db.user.insertOne({
    "profileId" : "623c53d638be7c619737b1b1",
    "username": 'client',
    "password": '123456'
}); //623c552838be7c619737b1b5
db.user.insertOne({
    "profileId" : "623c549d38be7c619737b1b2",
    "username" : "restaurant",
    "password" : "123456"
}); //623c55a438be7c619737b1b7
db.user.insertOne({
    "profileId" : "623c54b038be7c619737b1b3",
    "username" : "delivery-man",
    "password" : "123456"
});//623c561838be7c619737b1b8
db.user.insertOne({
    "profileId" : "623c54d638be7c619737b1b4",
    "username" : "e-kaly",
    "password" : "123456"
});//623c563638be7c619737b1b9

/*
* RESTAURANTS :
*/
db.restaurant.insertOne({
    "name" : "Subway - Notre Dame",
    "description" : "Chaîne spécialisée dans la vente au comptoir de salades/sandwichs personnalisés, avec des options diététiques.",
    "address" : "19 Quai de Montebello, 75005 Paris, France"
}); //6242a1502597694c914ff9e3

db.restaurant.insertOne({
    "name" : "Hoki Sushi",
    "description" : "Restaurant japonais fonctionnel proposant des tempuras, des yakitoris et une vaste sélection de sushis.",
    "address" : "11 Rue Greneta, 75003 Paris, France"
}); //6242a1662597694c914ff9e4

db.restaurant.insertOne({
    "name" : "McDonald''s® (Paris Rivoli)",
    "description" : "Repas sur le pouce - Restauration rapide",
    "address" : "116 Rue De Rivoli, PARIS, - 75001"
}); //6242a1782597694c914ff9e5

/**
 * RESTAURANT EMPLOYEE
 */
 db.restaurantEmployee.insertOne({
    "restaurantId" : "6242a1502597694c914ff9e3",
    "userId" : "623c55a438be7c619737b1b7"
}); //6242ca742597694c914ff9ef

/*
* MENUS :
*/
db.menu.insertOne({
    "restaurantId" : "6242a1502597694c914ff9e3",
    "name" : "3 cookies",
    "description" : "",
    "unitPrice" : 3.5,
    "isVisible" : true
}); //6242a44b2597694c914ff9e6

db.menu.insertOne({
    "restaurantId" : "6242a1502597694c914ff9e3",
    "name" : "SUB30® Poulet(3) Teriyaki",
    "description" : "Poulet(3) dans une marinade Teriyaki",
    "unitPrice" : 9.90,
    "isVisible" : true
}); //6242a4532597694c914ff9e7

db.menu.insertOne({
    "restaurantId" : "6242a1782597694c914ff9e5",
    "name" : "P'TIT FISH & CHIPS",
    "description" : "Produit composé de boulettes panées au colin et d'une petite portion de frites.  Street & Dips by McDonald's : produits d'inspiration urbaine composés de spécialités panées, d'une petite portion de frites et d'une sauce. Attention produit chaud.",
    "unitPrice" : 4.80,
    "isVisible" : true
}); //6242a4542597694c914ff9e8

db.menu.insertOne({
    "restaurantId" : "6242a1782597694c914ff9e5",
    "name" : "BIG TASTY™ BACON",
    "description" : "Pain spécial, steak haché, bacon, salade, oignon, emmental fondu, tomate, sauce.",
    "unitPrice" : 12.40,
    "isVisible" : false
}); //6242a4542597694c914ff9e9

/*
* ORDER STATE :
*/
db.orderState.insertOne({
    "label" : 'En cours'
}); //6242a6c52597694c914ff9ea
db.orderState.insertOne({
    "label" : 'Prête à être livrée'
}); //6242cddc2597694c914ff9f0
db.orderState.insertOne({
    "label" : 'Prise en charge par le livreur'
}); //6242cdeb2597694c914ff9f1
db.orderState.insertOne({
    "label" : 'Livrée et Payée'
}); //6242a6cf2597694c914ff9eb

/*
* ORDER :
*/
db.order.insertOne({
    "userId" : "623c552838be7c619737b1b5",
    "restaurantId" : "6242a1502597694c914ff9e3",
    "orderStateId" : "6242a6c52597694c914ff9ea",
    "orderDate" : new Date(),
    "quantity" : 3,
    "cost" : 16.90,
    "items" : [
        {
            "menuId" : "6242a44b2597694c914ff9e6",
            "quantity" : 2,
            "cost" : 7
        },
        {
            "menuId" : "6242a4532597694c914ff9e7",
            "quantity" : 1,
            "cost" : 9.90
        }     
    ]
}); //6242a8682597694c914ff9ed

db.order.insertOne({
    "userId" : "623c552838be7c619737b1b5",
    "restaurantId" : "6242a1782597694c914ff9e5",
    "orderStateId" : "6242a6c52597694c914ff9ea",
    "orderDate" : new Date(),
    "quantity" : 4,
    "cost" : 49.6,
    "items" : [
        {
            "menuId" : "6242a4542597694c914ff9e8",
            "quantity" : 4,
            "cost" : 49.6
        }    
    ]
}); //6242a8762597694c914ff9ee




db.menu.find({
    restaurantId : "6242a1502597694c914ff9e3"
});

db.order.findOneAndUpdate({
    _id : new ObjectId("6242a8762597694c914ff9ee")
}, {
    $set : {
        "orderStateId" : "6242cddc2597694c914ff9f0"
    }
});


db.order.findOneAndUpdate({
    _id : new ObjectId("6242a8762597694c914ff9ee")
}, {
    $set : {
        "quantity" : 4,
        "cost" : 49.6,
        "items" : [
            {
                "menuId" : "6242a4542597694c914ff9e8",
                "quantity" : 4,
                "cost" : 49.6
            }    
        ]
    }
});

db.order.remove({"_id":new ObjectId("6242a79a2597694c914ff9ec")});


db.menu.findOneAndUpdate({
    _id : new ObjectId("6242a44b2597694c914ff9e6")
}, {
    $set : {
        "description" : "Des cookies supers croquants, avec des pépites de chocolat, sans gluten.. Choisissez la votre !"
    }
});


var now = new Date();
db.order.updateMany({},{
    $set : {
        "orderDate" : now
    }
});
