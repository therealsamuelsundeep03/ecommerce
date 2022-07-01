const mongo = require("../model/mongodb");

const productHelper = {
    findProduct(product){
        return mongo.db.collection('prods').find({"product":product}).toArray();
    }
}
module.exports = productHelper; 