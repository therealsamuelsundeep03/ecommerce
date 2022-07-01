import { useGetAllProductsQuery } from "../redux/features/productsApi";
import { useEffect, useState } from "react";
import { Container,Row } from "react-bootstrap";

import Nav from "../components/navfiles/nav";
import Loading from "../components/loading";
import Paginate from "../components/paginate";
import Cards from "../components/productPageCards";

function Product ({proName}) {
    const [products,setProducts] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);

    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // getting products from rtk query...
    const { data,error,isLoading } = useGetAllProductsQuery(proName);
   
    useEffect(() => {
        if(data){
            setProducts(data[0][proName])
        }
    },[data])

    // creating buttons for paginations
    let postPerPage = 12

    let pagenum = []
    for(let i = 1; i <= Math.ceil(products.length/postPerPage);i++){
        pagenum.push(i)
    }

    // defining Product; and last prods of tha page...
    const lastProdOfPage = currentPage*postPerPage;
    const fistProdOFPage = lastProdOfPage-postPerPage;
    const currentPageprodcuts = products.slice(fistProdOFPage,lastProdOfPage); 
    

     // setting the clicked button to the current page...
     const paginate = (num) => {
        setCurrentPage(num)
    }


    return (
        <>
            {isLoggedIn ? (
                <>
                    {isLoading ? 
                        <Loading /> : 
                        error ? 
                            <p>Error in Fetching the Products</p> : 
                                (
                                    <>
                                        <Nav />
                                        <section className="ProductSection">
                                            <Container className="productContainer">
                                                <div style={{fontSize:"22px",textAlign:"left"}}>RESULTS : {(proName).toUpperCase()}</div>
                                                <hr/>
                                                <Row>
                                                    {currentPageprodcuts.map((product)=>{
                                                            return (
                                                                <Cards 
                                                                key={product.id}
                                                                proName={proName}
                                                                productID = {product.id}
                                                                prod={product}
                                                                />
                                                            )
                                                        })}
                                                </Row>  
                                            </Container>
                                            <Paginate pagenum={pagenum} paginate={paginate}/>
                                        </section>
                                    </>
                                )
                    }
                </>
            ) : window.location.href = "/login"}
        </>
    )
}

export default Product;


