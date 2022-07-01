const {ObjectId} = require('mongodb');
const bcryptjs = require('bcryptjs');

const helper = require("../helper/login.helper");

const service = {
    async findUser(req,res){
        try{
            const email = req.body.email;
            const password = req.body.password;

            if(email && password){
                // checking if the email exists, if exists then check the password...
                let response = await helper.findUserByEmail(email);
                console.log(response)
                if(response === null){
                        res.status(200).send( "Email doesnt exists");
                        console.log("Email doesnt exists");
                }else{
                    const {_id} = response; 
                    const result = await bcryptjs.compare(password,response.password);
                    // if the password is correct then redirect to the login page or send the message...
                    if(result){
                        res.status(200).json({"UserExists":_id.toString()}); 
                        console.log("user Exists")          
                    }else{
                        res.status(200).send("password is incorrect");
                        console.log("password is incorrect")
                    }
                }
            }else{
                res.status(200).send("Fill all the inputs")
            }
        }catch(err){
            console.log("Error in verifing the user::",err);
            res.send(500).send(`Error in Verifying the user::, ${err}`)
        }
    }
}

module.exports = service;