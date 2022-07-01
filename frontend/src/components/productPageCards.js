import {Col,Card} from "react-bootstrap";
import {faCartShopping, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import axios from "axios";

import "../css/productcard.css";
import { addToCart } from "../redux/features/cartslice";

function Cards({prod,proName,productID}){

    const dispatch = useDispatch();

    const handleAddToCart = async(prod) => {
        dispatch(addToCart(prod));
        const userID = localStorage.getItem('user');
        const {data} = await axios.post("https://hebewebstore.herokuapp.com/cart",{
            userID,
            prod
        });
        console.log(data)
    }

        return(
        <>
         <Col md={3} style={{marginBottom:"2rem"}} className="productCol">
             {/* cart icon  */}
             <div className="cart">
                    {/* <FontAwesomeIcon icon={faCartShopping} onClick={()=>{addToCart(productID,proName)}}/>  */}
                    <FontAwesomeIcon icon={faCartShopping} onClick={() => {handleAddToCart(prod)}}/>                
                </div>
                <a className = "detlink" href={`/product/${proName}/${productID}`} >
                    <Card className="simCard" style={{borderRadius:"14px"}}>
                        <div className="simProd">
                            {/* product's img */}
                            <div className="simImgCont">
                                {proName === "ac"  ? 
                                    <img className="simImg" src={prod.img} style={{height : 90,width : 320, marginTop : "50px", marginLeft: "-10px"}}/> : 
                                    proName === "television" ? <img className="simImg" src={prod.img} style={{height : 150,width : 300, marginTop : "20px", marginLeft: "-10px"}}/> : 
                                    <img className="simImg" src={prod.img}/>}
                            </div>
                            {/* product's info */}
                            <div className="simDesc">
                                <h4 className="simTitle">
                                    {/* shorten the title length */}
                                    {prod.title.length > 15 ? (prod.title).slice(0,49) + "..." : prod.title}
                                </h4>
                                <div className="simCost">
                                    {/* discounted price, for site amazon i have to slice down prices from three to one.*/}
                                        <span className="simDp">                                               
                                            {prod.site == "amazon" || (prod.site == "flipkart")  ? ("₹"+prod.ap.split("₹").slice(0,2)).split(",") : prod.ap.split(".").slice(1,2)}
                                        </span>
                                    {/* stars, for the site snapdeal the star rating is in width so i had to slice the width part  */}
                                     <span className = {`simStars ${prod.site === "snapdeal" && "simSnapStar"}`}>
                                            <span >
                                                {prod.star ? ((prod.site === "flipkart" || prod.site === "amazon") ? (prod.star).slice(0,3) : 
                                                prod.site === "snapdeal" ? ((prod.star.split(":").slice(-1))[0]) : "") : "4.1"}
                                            </span>
                                             <span>
                                                 <FontAwesomeIcon icon={faStar} />
                                             </span>
                                     </span>
                                </div>
                                <div className="simDiscount">
                                    {/* actual price, for site amazon i have to slice down prices from three to one. */}
                                        <span className="simAp">
                                            {
                                               prod.site == "amazon" || (prod.site == "flipkart")  ? ("₹"+prod.dp.split("₹").slice(0,2)).split(",") : prod.dp
                                            }
                                        </span>
                                    {/* offer percentage */}
                                        <span className="simDisc">
                                            {
                                               prod.site === "amazon" ?  prod.disc : `(${((prod.disc) ? ((prod.disc).split("%").slice(0,1).pop() + " off"): "")})`
                                            }
                                        </span>
                                </div>                   
                            </div>
                        </div>  
                    </Card>
                    </a>                               
            </Col>
        </>
    )
}


export default Cards; 































