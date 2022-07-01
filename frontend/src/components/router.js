import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import { ToastContainer } from 'react-bootstrap';
import "react-toastify/dist/ReactToastify.css"

import Login from "../containers/login/login";
import SignIn from "../containers/login/signin";
import Verified from "../containers/login/verified";
import Identity from "../containers/login/identity";
import ResetPasword from "../containers/login/resetpassword";
import Home from "../containers/home";
import Product from "../containers/products";
import Cart from "../containers/cart"
import DetailedProduct from "../containers/detailedproductpage";
import Pagenotfound from "../containers/pagenotfound";

function Router(){
    return(
        <>
        {/* all the routings to the pages of the app */}
            <BrowserRouter>
                <ToastContainer />
                <Switch>
                    <Route path="/home"  component={Home}/>
                    <Route path="/" exact>
                        <Redirect to="/home" />
                    </Route>
                    <Route path="/login" component={Login}/>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/verified" component={Verified} />
                    <Route path="/identity" component={Identity}/>
                    <Route path="/resetpassword" component={ResetPasword}/>
                    <Route path="/headphone" render={()=>{return <Product proName = {"headphone"}/>}}/>
                    <Route path="/laptop" render={()=>{return <Product proName = {"laptop"}/>}}/> 
                    <Route path="/mobile" render={()=>{return <Product proName = {"mobile"}/>}}/>
                    <Route path="/fridge" render={()=>{return <Product proName = {"fridge"}/>}}/>
                    <Route path="/ac" render={()=>{return <Product proName = {"ac"} />}}/>
                    <Route path="/electricstove" render={()=>{return <Product proName = {"electricstove"}/>}}/>
                    <Route path="/waterheater" render={()=>{return <Product proName = {"waterheater"}/>}}/>
                    <Route path="/washingmachine" render={()=>{return <Product proName = {"washingmachine"}/>}}/>
                    <Route path="/television" render={()=>{return <Product proName = {"television"}/>}}/>
                    <Route path="/vaccumcleaner" render={()=>{return <Product proName = {"vaccumcleaner"}/>}}/>
                    <Route path="/product/:productName/:productID" component={DetailedProduct}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path = "*" component={Pagenotfound} />
                </Switch>
            </BrowserRouter>
        </>
    )
}
export default Router;