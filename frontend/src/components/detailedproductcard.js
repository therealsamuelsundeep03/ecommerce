import {Col} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux";

import {addToCart} from "../redux/features/cartslice";
function DetailedProductCard ({img,title,dp,ap,star,prod}) {

    const dispatch = useDispatch();

    const handleCart = (product) => {
        dispatch(addToCart(product))
    }

    return (
        <>
        {console.log(prod)}
            {/* product */}
            <Col className="indProd">
                {/* product image */}
                <div className="indProdImg">
                    <img src ={img}/>
                </div>
                {/* product description */}
                <div className="desc">
                    <h4 className="indTitle">
                        {title}
                    </h4>
                    <div className="indDp">
                                {
                                    prod.site == "amazon" || (prod.site == "flipkart")? ("₹"+ap.split("₹").slice(0,2)).split(",") : ap
                                }
                    </div>
                    <div className="indOff">
                        <span className="indAp">
                        {
                            prod.site == "amazon" || (prod.site == "flipkart")? ("₹"+dp.split("₹").slice(0,2)).split(",") : dp
                        }
                        </span>
                        <span className="indDisc">
                        {
                            prod.site === "amazon" ?  prod.disc : `(${((prod.disc) ? ((prod.disc).split("%").slice(0,1).pop() + " off"): "")})`
                        }
                        </span>
                    </div>
                    <div className="indstarcart">
                        <div className = "indStars">
                            {star ? ((prod.site === "flipkart" || prod.site === "amazon") ? (star).slice(0,3) : 
                                prod.site === "snapdeal" ? ((star.split(":").slice(-1))[0]) : "") : "4.1"}
                                <FontAwesomeIcon icon={faStar} />
                        </div>
                        <button className="detailesAddCart"  onClick={() => {handleCart(prod)}}>Add To Cart</button>
                    </div>
                </div>
            </Col>
        </>
    )
}

export default DetailedProductCard;