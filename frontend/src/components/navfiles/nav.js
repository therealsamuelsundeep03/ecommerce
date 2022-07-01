import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping, faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Search from "./search";
import "../../css/nav.css";
import { Col } from "react-bootstrap";
import avatar from "../../images/avatar1.png";
import NavIcon from "./navicon";

function Nav(){
    const [click,setClick] = useState(false);
   
    const products = ["Headphone","Laptop","Vaccum Cleaner","AC","Mobile","Water heater","Fridge","Electric stove","Washing Machine","Television"]

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('totalQty');
        localStorage.removeItem('totalAmount');
        window.location.href="/login";
    }

    const handleClick = () => {
        setClick(!click)
    }

    return (
        <>
            {/* Nav Bar */}
            <header className={`navbar navgrey`}>
                 {/* site title */}
                 <Col md={2}><a href = "/home" style={{textDecoration: "none"}}><h1 className="title">Hebe.</h1 ></a></Col>
                 <Col md = {6}><Search /></Col>
                 <Col md={5} className="navListContainer">
                     <ul className="navList">
                         <li><a href="/home">Home</a></li>
                         <li className="prod">Products
                            <ul className="prods">
                                {products.map(ele => <a href={`/${ (ele.split("").filter((ele=> ele !== " "))).join("")}`} className = "prodList" ><li>{ele}</li></a>)}
                            </ul>
                         </li>
                         <li className="navcart">
                            <a href="/cart" className="navcart"><FontAwesomeIcon icon ={faCartShopping}></FontAwesomeIcon></a></li>
                            <div className="qty">{localStorage.getItem('totalQty')}</div>
                         <li className="avatarImgCont">
                            <img src={avatar} className="avatarimg"/>
                            <div className="avatarSignout">
                                <button className="btn btn-primary" onClick={logout}>Log out</button>
                            </div>
                         </li>
                         
                     </ul>
                 </Col>
                 <div className="miniIcon">
                    <div className="icon" onClick={handleClick}>
                        {click ? <FontAwesomeIcon icon={faTimes}/> : <FontAwesomeIcon icon = {faBars}/>}
                        {click && <NavIcon /> }
                    </div>
                </div>
            </header>
        </>
    )
}

export default Nav;
