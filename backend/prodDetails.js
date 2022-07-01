const cheerio = require('cheerio');
const axios = require('axios');
const {ObjectId} = require('mongodb');
const { v4: uuidv4 } = require('uuid');

let productList=[{"product":"headphone","headphone":[]},{"product":"laptop","laptop":[]},{"product":"mobile","mobile":[]},{"product":"fridge","fridge":[]},
                {"product":"ac","ac":[]},{"product":"electricstove","electricstove":[]},{"product":"waterheater","waterheater":[]},
                {"product":"washingmachine","washingmachine":[]},{"product":"television","television":[]},{"product":"vaccumcleaner","vaccumcleaner":[]}];


function webScrapping(url,item,i,selectClass,name,actualPrice,discountedPrice,discount,stars,website){
    return new Promise((resolve,reject)=>{
        axios.get(url+item)
            .then((response)=>{
                const html = response.data;
                const $ = cheerio.load(html);
                // console.log(html)
                let id;
                $(selectClass,html).each(function(){
                    const img = $(this).find('img').attr('src');
                    const title =$(this).find(name).text();
                    const dp= $(this).find(actualPrice).text();
                    const ap= $(this).find(discountedPrice).text();
                    const disc= $(this).find(discount).text();
                    const star =  (website === "flipkart" || website === "amazon") ? $(this).find(stars).text() : $(this).find(stars).attr('style');
                    const site = website;
                    id = ObjectId();
                    let qty = 0;
                    if(img && title && dp && ap && disc && site){
                        productList[i][item].push({id,img,title,dp,ap,disc,star,site,qty});
                    }
                })
                resolve(productList[i]);  
            })             
    })
}



let listOFProducts=[
    ["headphone",0,".s1Q9rs","._3LWZlK"],
    ["laptop",1,'._4rR01T',"._3LWZlK"],
    ["mobile",2,'._4rR01T',"._3LWZlK"],
    ["fridge",3,'._4rR01T',"._3LWZlK"],
    ["ac",4,'._4rR01T',"._3LWZlK","._3LWZlK"],
    ["electricstove",5,".s1Q9rs","._3LWZlK"],
    ["waterheater",6,'._4rR01T',"._3LWZlK"],
    ["washingmachine",7,'._4rR01T',"._3LWZlK"],
    ["television",8,"._4rR01T","._3LWZlK"],
    ["vaccumcleaner",9,'._4rR01T',"._3LWZlK"]
]


 
module.exports = {listOFProducts,webScrapping}
