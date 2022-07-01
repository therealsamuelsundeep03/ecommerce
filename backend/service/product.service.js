const productHelper = require("../helper/product.helper");

const productService = {
    async getProducts(req,res){
        try{
            const product = req.params.products
            console.log(product)
            const response = await productHelper.findProduct(product);
            console.log(response);
            if(response==""){
                res.status(200).send("No such product in the database")
            }else{
                res.status(200).send(response)
            }
        }
        catch(err){
            console.log("Error in gettting the products::",err);
            res.status(500).send("Error in getting the products::", err)
        }
    }
}

module.exports = productService;