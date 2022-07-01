import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";

import { useGetAllProductsQuery } from "../redux/features/productsApi";
import Nav from "../components/navfiles/nav";
import Cards from "../components/productPageCards";
import DetailedProductCard from "../components/detailedproductcard";
import "../css/detailedproduct.css"

// individual product page

function DetailedProduct(){
    const [product,setProduct] = useState([]);
    const [similar,setSimilar] = useState([]);

    const isLoggedIn = localStorage.getItem('isLoggedIn');

     // getting params from the url...
     const {productName,productID} = useParams();
     console.log(productName)

    const {data,error,isLoading} = useGetAllProductsQuery(productName);
    console.log(data,error,isLoading)

    useEffect(() => {
        if(data){
            const product = data[0][productName].filter(prod => prod.id === productID);
            const index = data[0][productName].findIndex(prod => prod.id === productID);
            setProduct(product[0]);
            similarProduts(data[0][productName],index);
        }
    },[data])

    // getting similar products.
    const similarProduts=(data,index)=>{
        let sim=[]
        for(let i = index+1;i <= index+4;i++ ){
            if(!data[i]){
                data = [...data,...data];
                sim.push(data[i])
            }else{
                sim.push(data[i])
            }
        }
        setSimilar(sim)
    }

    return(
        <>
            {isLoggedIn ? (
                <>
                    {isLoading ? 
                    <p>Loading...</p> : 
                        error ? 
                            <p>Error in Fetching the Products</p> : 
                                (
                                    <>
                                        <Nav />
                                        <div style={{marginTop:'10rem'}}></div>
                                        <section className="indProdPage">
                                            
                                            <DetailedProductCard 
                                            img = {product.img} 
                                            title = {product.title} 
                                            dp = {product.dp}
                                            ap = {product.ap} 
                                            disc ={product.disc}
                                            star = {product.star}
                                            prod = {product}/>

                                            {/* displaying similar products */}
                                            <div className="simCont">
                                                <div className="sp">SIMILAR PRODUCTS</div>
                                                <hr />                                        <Row>
                                                {similar.map((prod)=>{
                                                        return(
                                                            <Cards 
                                                            proName={productName} 
                                                            productID={prod.id} 
                                                            prod={prod}
                                                            key = {prod.id}
                                                            />
                                                        )
                                                    })}
                                            </Row>
                                            </div>
                                        </section>
                                    </>
                                )
                            } 
                </>
            ) : window.location.href = "/login"
            }         
        </>
    )
}

export default DetailedProduct;
