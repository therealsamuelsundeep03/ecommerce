import Lottie from "react-lottie";
import axios from "axios";
import { useState } from "react";

import animationData from "../../images/92131-ecommerce.json";
import "../../css/identity.css";
import Loading from "../../components/loading";
import FormInput from "../../components/login/formInputs";

function Identity () {
    let [identityEmail,setEmail] = useState("");
    let [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    // animation
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    const handleChange = ({target:{name,value}}) => {
        if(!value){
            setLoading(false)
            setError("Please Enter Valid Email Address");
        }else{
            setError("")
        }
        setEmail(value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            if(!error.length && identityEmail.length){
                const {data} = await axios.post("https://hebewebstore.herokuapp.com/forgotpassword",{identityEmail});
                console.log(data);
                if(data === "no user with this id"){
                    setLoading(false)
                    setError("Email doesn't exists");
                }else if(data === "check in email"){
                    localStorage.setItem('email',identityEmail);
                    alert("please check in email to reset the password");
                    window.open("about:blank", "_self");
                    window.close();
                }else{
                    setError("some error occurred in confirming the email")
                }
            }
            else{
                setLoading(false)
                setError("Please Enter Valid Email Address");
            }
        }
        catch(err){
            console.log("Error in confirming the email::", err);
        }
    }

    console.log(loading);
    console.log(error)
    return (
        <>
            <div className="identityContainer">
                <div className="animation">
                    <h3>Welcome to Hebe!</h3>
                    <div className="animateImg">
                        <Lottie 
                            options={defaultOptions}
                        />
                    </div>
                </div>
                <div className="identity">
                    <h3>Find Your Account</h3>
                    <p>Please enter your email address to search for your account.</p>
                    <form className="identityform" onSubmit={handleSubmit}>
                        <FormInput id="identityform" type ="email" name="email" placeholder= "abc@gmail.com" value={identityEmail} err={error} handleChange={handleChange} className="identityInp"/>
                        <button type = "submit" className="identityButton">Submit</button>
                        {loading ? <Loading /> : ""}
                    </form>
                </div>
            </div>
        </>
    )
}


export default Identity;