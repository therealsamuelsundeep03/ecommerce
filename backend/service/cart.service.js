const {ObjectId} = require('mongodb');

const helper = require('../helper/cart.helper');

const service = {

    // getting cart items...
    async getCart (req,res) {
        try{ 
            const userID = req.params.id;
            if(userID){
                let response = await helper.findUser(userID);
                console.log(response);
                if(response === null){
                    res.send("no items in cart");
                }else{
                    res.status(200).send(response.prod)
                }
            }
        }catch(err){
            console.log("Error in getting the code ::", err.message);
            res.status(500).send("Error in getting the code");
        }
    },

    // adding code to the database...
    async saveCart(req,res){
        try{
           let {userID,prod} = req.body;
           if(userID && prod){
                const response = await helper.findUser(userID);
                // console.log(response);

                // if the user has no any previous cart items then add him to the cart db...
                if(response === null){
                    prod = {...prod,qty:1}
                    const newUser = await helper.newUser(userID,[prod]);
                    console.log("New user has been added to the cart db", {userID,prod});
                    res.status(200).send("new user had been added to the cart");
                }else{

                    // check if the prod exists in the user cart...
                    const isProdExists = response.prod.filter(item => item.id === prod.id);
                    if(!isProdExists.length){

                        prod = {...prod,qty:1}
                        // if that particular product is not there then add the product to the database
                        const newItem = await helper.addNewItem(userID,prod);
                        console.log("added new item::",prod);
                        res.status(200).send(`Added a new item::, ${prod}`);
                    }else{
                        // if the product is present in the cart then add the quantity
                        const addQty = await helper.addQty(userID,prod.id);
                        console.log(addQty);
                        res.status(200).send(`Added the same product`)
                    }
                }
           }
        }
        catch(err){
            console.log("Error in saving the code to the database::", err.message);
            res.status(500).send(`Err.messageor in saving the product to the database::, ${err.message}`);
        }
    },
    async removeItem (req,res) {
        try{
            const {userID,id} = req.params;
            if(userID,id){
                const removeProd = await helper.removeItem(userID,id);
                console.log("item removed from the cart::", removeProd);
                res.status(200).send(`item removed from the cart::, ${removeProd}`);
            }
        }
        catch(err){
            console.log("Error in removing the item from the cart::", err.message);
            res.status(200).send(`Error in removing the item from the cart:", ${err.message}`)
        }
    },
    async decQty (req,res) {
        try{
            const {userID,prod} = req.body;
            if(userID,prod){
                const addQty = await helper.decQty(userID,prod.id);
                console.log(addQty);
                res.status(200).send(`Quantity of a product is decreased`)
            }
        }
        catch(err){
            console.log("Error in decreasing the quantity::", err);
            res.status(200).send(`Error in reducing the quantity of the product::, ${err.message}`)
        }
    },
    async clearCart (req,res) {
        try{
            const { userID } = req.body;
            if(userID){
                const clear = await helper.clearCart(userID);
                console.log("cleared cart");
                res.status(200).send("cleared cart");
            }
        }
        catch(err){
            console.log("Error in clearing the cart");
        }
    }
}

module.exports=service;