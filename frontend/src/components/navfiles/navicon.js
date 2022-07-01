import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse,faMobile,faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

function NavIcon () {

    const signOut = () => {
        localStorage.removeItem('isloggedin');
        localStorage.removeItem('id');
        window.location.href="/login";
    }

    return(
        <ul  className="iconUl">
            <li className="iconli">
                <Link to="/home">
                    <FontAwesomeIcon icon={faHouse} className="fonticon"/>
                    <span>Home</span>
                </Link>
            </li>
            <li className="iconli">
                <Link to="/cart">
                    <FontAwesomeIcon icon={faCartShopping} className="fonticon"/>
                    <span>Cart</span>
                </Link>
            </li>
            <button className="btn  btn-primary iconsignout" onClick={signOut}>Sign Out</button>
        </ul>
    )
}

export default NavIcon;