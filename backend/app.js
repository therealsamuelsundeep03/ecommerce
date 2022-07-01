const express = require('express');
const cors = require('cors');
require ('dotenv').config()

const mongo = require("./model/mongodb");
const prodDet = require("./prodDetails");
const productRouter = require("./routes/product.routes");
const loginRouter = require("./routes/login.routes");
const ForgotRouter = require("./routes/forgotpassword.routes");
const resetRouter = require("./routes/resetpassword.routes");
const signinRouter = require("./routes/signin.routes");
const cartRouter = require("./routes/cart.routes");
const emialLogin = require("./routes/emaillogin.routes")

const app = express();

(async = () => {

    // middelware
    app.use(express.json());
    app.use(cors());

    // connecting to the database..
    mongo.connect();

    // routes
    app.use("/product",productRouter);
    app.use("/cart",cartRouter);
    app.use("/login",loginRouter);
    app.use("/signin",signinRouter);
    app.use("/forgotpassword",ForgotRouter);
    app.use("/resetpassword",resetRouter)
    app.use("/emaillogin",emialLogin);
})();

// prodDet.listOFProducts.forEach( product => {
//     prodDet.webScrapping("https://www.flipkart.com/search?q=",product[0],product[1],'._13oc-S',product[2],'._3I9_wc','._30jeq3','._3Ay6Sb',product[3],'flipkart')
//     .then(async (res)=>{
//     return  prodDet.webScrapping("https://www.snapdeal.com/search?keyword=",product[0],product[1],'.product-tuple-listing','.product-title','.strike','.product-price','.product-discount > span','.filled-stars','snapdeal')
//     .then(async (res)=>{
//         await mongo.connect();
//         const data = mongo.db.collection('prods').insertMany([res]);
//         console.log("data updated successfully::", data);
//         })
//     })
// })  


app.listen(8000,()=>{
    console.log(`app is listening to the server ${8000}`);
})
