import { useState } from "react";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../../images/92131-ecommerce.json";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

import FormInput from "../../components/login/formInputs";
import "../../css/signin.css";
import Loading from "../../components/loading";

function SignIn () {

    // to store the user info...
    const [user,setUser] = useState({
        username : "",
        email : "",
        password : "",
        confirmpassword : "",
        errors:{
            username : "",
            email : "",
            password : "",
            confirmpassword : ""
        },
        touched:{
            username : false,
            email : false,
            password : false,
            confirmpassword : false
        }
        }
    );

    const [loading,setLoading] = useState(false);
    const [view,setView] = useState(eyeOff);
    const [type,setType] = useState("password");

    const inputs = [
        {
            label:"Username",
            type:"text",
            name:"username",
            placeholder:"username",
            value:user.username,
            err:user.errors.username
        },
        {
            label:"Email",
            type:"email",
            name:"email",
            placeholder:"Email",
            value:user.email,
            err:user.errors.email
        },
        {
            label:"Password",
            type:type,
            name:"password",
            placeholder:"Password",
            value:user.password,
            err:user.errors.password
        },
        {
            label:"Confirm password",
            type:"password",
            name:"confirmpassword",
            id:"confirmpassword",
            placeholder:"confirmpassword",
            value:user.confirmpassword,
            err:user.errors.confirmpassword
        },
    ]

    // animations
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    }

    
    const handleView = () => {
        if(type === "password"){
            setView(eye);
            setType("text");
        }else{
            setView(eyeOff);
            setType("password");
        }
    }

    const handleChange = ({target  : {name,value}}) => {
        const errors = user.errors;

        // adding validations to the form
        switch (name) {
            case "username": {
                if(!value){
                    errors.username = "please enter the username";
                }else if(value.length < 5){
                    errors.username = "username must be atleat 5 characters";
                }else{
                    errors.username = "";
                }
            }
            break;

            case "email":
            errors.email = !value ?  "please enter valid email" : "";
            break;

            case "password": {
                if(value.length < 5 || value.length > 35){
                    errors.password  = "password must be between 5 to 35 characters";
                    break;
                }else{
                    errors.password = "";
                }
            }
            break;

            case "confirmpassword": {
                if(value != user.password){
                    errors.confirmpassword = "password do not match"
                }else {
                    errors.confirmpassword = ""
                }
                break;
            }

            default:
                break;
        }
        setUser({...user,[name]:value},errors)
    }

    const handleBlur = ({target:{name}}) => {
        const touched = {...user.touched,[name]:true};
        setUser({...user,touched})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)

        const errors = Object.values(user.errors).filter( err => err !== "");
        const notTouched = Object.values(user.touched).filter(err => !err);
        
        if(user.username && user.confirmpassword && user.password && user.email)
        {
            // if there are no errors then send the form to the backend
            if(!errors.length && !notTouched.length){
                const newUser = {
                    username : user.username,
                    email : user.email,
                    password : user.password,
                }

                const { data } = await axios.post("https://hebewebstore.herokuapp.com/signin",{
                    ...newUser
                });

                console.log(data);

                const errors = user.errors;

                if(data === "user exists"){

                    // if the user exists then send an error message
                    setLoading(false);
                    errors.email = "User Exists With This Email";
                    setUser({...user,errors});
                }else if(data === "Fill all inputs"){

                    // if feilds are missing then send an error message
                    setLoading(false);
                    errors.username = "Fill All Inputs";
                    setUser({...user,errors});
                }else if(data === "check in email"){

                    // if all the validations are send valid then send an error message 
                    alert("please check in email to signin");
                    window.open("about:blank", "_self");
                    window.close();
                }
            }

        }else{
            setLoading(false)
            const errors = user.errors;
            errors.username ="Fill All The Inputs";
            setUser({...user,errors});
        }
    }

    console.log(user.errors);

    return (
        <>
            {/*   animations */}
            <div className="signinContainer">
                    <div className="animation">
                        <h3>Welcome to Hebe!</h3>
                        <div className="animateImg">
                            <Lottie 
                                options={defaultOptions}
                                />
                        </div>
                    </div>

            {/* signin form */}
                    <div className="signin">
                        {/* on submitting the form it goes to the backend for further validations */}
                        <form onSubmit={handleSubmit} className="createAccountForm">
                            <h3 className="signintitle">Sign In</h3>
                            {inputs.map(inp => <FormInput label={inp.label} type={inp.type} name={inp.name} placeholder={inp.placeholder} value={inp.value} handleChange={handleChange} handleBlur={handleBlur} err={inp.err} className="signinInp" id={inp.id}  view = {view} handleView={handleView}/>)}
                            <div>
                                <button className="signinbutton">submit</button>
                                {loading ? <Loading /> : ""}
                            </div>
                        </form>
                    </div>
                </div>
        </>
    )
}

export default SignIn
;
