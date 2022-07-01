import { useSelector,useDispatch } from "react-redux";
import axios from "axios";

import "../css/cart.css";
import Nav from "../components/navfiles/nav";
import { addToCart,removeFromCart,decreaseQty } from "../redux/features/cartslice";
import { useEffect, useState } from "react";

function Cart () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const [nocart,setNoCart] = useState(false);

    useEffect(() => {
      const fetchCart = async() => {
        const userID = localStorage.getItem('user');
        const {data} = await axios.get(`https://hebewebstore.herokuapp.com/cart/${userID}`);
        if(data === "no items in cart"){
            return null
        }else{
            localStorage.setItem('cartItems',JSON.stringify(data));
        }
      }  
      fetchCart();
    },[])
    
    const cart = useSelector(state => state.cart); 
    const dispatch = useDispatch();

    const addCart = async(prod) => {
        dispatch(addToCart(prod));
        const userID = localStorage.getItem('user');
        const {data} = await axios.post("https://hebewebstore.herokuapp.com/cart",{
            userID,
            prod
        });
    }

    const clearCart = async() => {
        localStorage.removeItem('cartItems');
        window.location.reload();
        const userID = localStorage.getItem('user');
        const {data} = await axios.put("https://hebewebstore.herokuapp.com/cart",{
            userID,
        });
        console.log(data);
    }

    const removeItem = async(prod) => {
        dispatch(removeFromCart(prod));
        const userID = localStorage.getItem('user');
        const {data} = await axios.delete(`https://hebewebstore.herokuapp.com/cart/${userID}/${prod.id}`);
        console.log(data);
    }

    const decreaseqty = async(prod) => {
        dispatch(decreaseQty(prod));
        const userID = localStorage.getItem('user');
        const {data} = await axios.post("https://hebewebstore.herokuapp.com/cart/dec",{
            userID,
            prod
        });
        console.log(data)
    }

    const totalAmount = () => {
        let allProductPrice = 0;
        cart.cartItems.map(product => {
            let val = product.ap.includes("₹") ? ((product.ap.replace(",","").split("₹").slice(0,2)).join(""))*product.qty : (product.ap.replace(",","").split("Rs.").join(""))*product.qty;
            allProductPrice = val+allProductPrice;
        })
        localStorage.setItem('totalAmount',allProductPrice);
    }
    totalAmount();

    const totalQty = () => {
        let totalqty = cart.cartItems.reduce((total,{qty}) => {
            return total + qty;
        },0)
        localStorage.setItem('totalQty',totalqty)
        console.log(totalqty)
    }
    totalQty();

    let price;
    
    return (
        <>
           {isLoggedIn ? ( 
                    <>
                         <Nav />
                        <div className="cartContainer">
                            <div className="cartBody">
                            <h2 className="cartTitle">SHOPPING CART</h2>
                        {(cart.cartItems.length === 0 || nocart) ? (
                            <div className="cartEmpty">
                            {nocart}

                                <div>
                                    <a href = "/home">
                                        <span className="material-symbols-outlined arrow">keyboard_backspace</span>
                                        CONTINUE SHOPPING</a>
                                </div>
                            </div>
                        ) : 
                        (
                        <>
                            <div className="cartProducts">
                                <div className="cartTitles">
                                    <h3 className="productTitle">PRODUCT</h3>
                                    <h3 className="priceTitle">PRICE</h3>
                                    <h3 className="qtyTitle">QUANTITY</h3>
                                    <h3 className="removeTitle">REMOVE</h3>
                                </div>
                                {/* <button onClick={clearCart}>clear cart</button> */}
                                {cart.cartItems.map((product) => {
                                    {price = product.ap.includes("₹") ? ((product.ap.replace(",","").split("₹").slice(0,2)).join(""))*product.qty : (product.ap.replace(",","").split("Rs.").join(""))*product.qty}
                                    return (
                                        <>
                                            <div className="cartProduct" key={product.title}>
                                                <div className = "cartImgtitle">
                                                    <img src={product.img} className="cartImg"/>
                                                    <div>{product.title.length > 20 ? product.title.slice(0,40)+"..." : product.title}</div>
                                                </div>
                                                <div>{price}</div>
                                                <div className="cartQty">
                                                    <button onClick={() => {addCart(product)}}>+</button>
                                                    <div className="count">{product.qty}</div>
                                                    <button onClick={() => {decreaseqty(product)}}>-</button>
                                                </div>
                                                {/* <div  className="material-icons">close</div> */}
                                                <span onClick={() => {removeItem(product)}} className="material-symbols-outlined">close</span>
                                            </div>
                                        </>
                                    )
                                })}
                                <div className="cartSummary">
                                    <button className="clearcart" onClick={clearCart}>Clear Cart</button>
                                    <div className="checkout">
                                        <div className="checkoutTotal">
                                            <div  className="total">Subtotal</div>
                                            <div>RS. {(localStorage.getItem('totalAmount'))}</div>
                                        </div>
                                        {/* <div>Total Qty : {(localStorage.getItem('totalQty'))}</div> */}
                                        <button className="checkoutbutton">Check out</button>
                                    </div>
                                </div>
                            </div>
                                    </>
                                )
                                }
                                    </div>
                                </div>
                    </>
            
           ) : window.location.href = "/login"}
        </>
    )
}

export default Cart;

(
    <>
       
    </>
   )