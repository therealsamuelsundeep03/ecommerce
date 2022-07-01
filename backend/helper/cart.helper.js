const mongo = require("../model/mongodb");

const helper = {
    findUser(userID){
        return mongo.db.collection('cart').findOne({userID});
    },
    newUser(userID,prod){
        return mongo.db.collection('cart').insertOne({userID,prod}); 
    },
    addNewItem(userID,prod){
        return mongo.db.collection('cart').findOneAndUpdate({userID},{$push:{prod}})
    },
    addQty(userID,id){
        return mongo.db.collection('cart').update({userID, "prod.id":id} , {$inc: {"prod.$.qty": 1}})
    },
    removeItem(userID,id){
        return mongo.db.collection('cart').updateOne({userID},{$pull:{prod:{id}}});
    },
    decQty(userID,id){
        return mongo.db.collection('cart').updateOne({userID, "prod.id":id} , {$inc: {"prod.$.qty": -1}})
    },
    clearCart(userID){
        return mongo.db.collection('cart').updateOne({userID},{$set:{"prod":[]}})
    }
}

module.exports = helper;