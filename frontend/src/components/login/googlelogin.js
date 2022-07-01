import {useState} from "react"
import axios from "axios";
import {GoogleLogin,GoogleLogout} from "react-google-login"; 
import Loading from "../../components/loading";

import "../../css/login.css";

function Googlelogin () {
    const [loginButton,setLoginButton] = useState (true);
    // const [logoutButton,setlogoutButton] = useState (false);
    const [loading,setLoading] = useState(false);

    const clientId = "478067663275-6m5e98p5p9et3416a396dmm63c1jkjre.apps.googleusercontent.com";

    const loginSuccess = async (res) => {
        setLoginButton(false)
        // setlogoutButton(true);
        setLoading(true)
        const email = res.profileObj.email;
        const { data } = await axios.post("https://hebewebstore.herokuapp.com/emaillogin",{email});
        console.log(data,Object.keys(data));
        if(Object.keys(data).includes("user")){
            console.log("yes")
            localStorage.setItem('isLoggedIn',true);
            localStorage.setItem('user',data.user);
            window.location.href="/";
        }
    }

    const loginFail = (res) => {
        console.log("login failed::", res)
    } 

    // const signOut = () => {
    //     alert ('Signed Out Successfully');
    //     setLoginButton(true)
    //     setlogoutButton(false)
    //     console.clear();
    // }

    return (
        <>
            <div className="googleLogin">
                {loginButton ? 
                    <GoogleLogin
                            clientId = {clientId}
                            buttonText="Login"
                            onSuccess={loginSuccess}
                            onFailure={loginFail}
                            cookiePolicy={'single_host_origin'}  
                            className="googlelogin"                          
                    /> : null}
                    {loading ? 
                    (
                        <div >
                            <Loading style={{zIndex:100}}/>
                        </div>
                    ) : ""}

                {/* {logoutButton ? 
                    <GoogleLogout
                        clientId = {clientId}
                        buttonText="Logout"
                        onLogoutSuccess={signOut} 
                    >
                    </GoogleLogout> : null} */}
            </div>
        </>
    ) 
}

export default Googlelogin;