import React,{ useState } from 'react';
import Lottie from "react-lottie";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";


import "../../css/login.css";
import Googlelogin from '../../components/login/googlelogin';
import animationData from "../../images/92131-ecommerce.json";
import FormInput from '../../components/login/formInputs';
import Loading from '../../components/loading';
import { Redirect } from 'react-router-dom';

const Login = () => {
    const [credentials,setCredentials] = useState({
        email:"",
        password:"",
        errors:{
            email:"",
            password:""
        },
        touched:{
            email:false,
            password:false
        }
    })
    const [loading,setLoading] = useState(false);
    const [view,setView] = useState(eyeOff);
    const [type,setType] = useState("password");

    const loginInp = [
        {label:"Email",type:"email",name:"email",placeholder:"abc@gmail.com",value:credentials.email,err:credentials.errors.email},
        {label:"Password",type:type,name:"password",placeholder:"Password",value:credentials.password,err:credentials.errors.password,view:view},
    ]


    // animation
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

    const handleChange = ({target : {name,value}}) => {
        // form validations...
        const errors = credentials.errors;

        switch(name){
            case "email" : 
                errors.email = !value ? "Enter a valid Email ID" : "";
                break;

            case "password" : 
                if(value.length < 5 || value.length > 35){
                    errors.password  = "password must be between 5 to 35 characters";
                    break;
                }
                else{
                    errors.password = "";
                    break;
                }

            default : break;
        }

        setCredentials({...credentials,[name]:value,errors})
    }

    const handleBlur = ({target:{name}}) => {
        const touched = {...credentials.touched,[name]:true};
        setCredentials({...credentials,touched})
    }

    const forgotpass = async() =>{
        const {data} = await axios.post("http://localhost:8000")
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        setLoading(true);


        const errors = credentials.errors;

        if(!credentials.email.length){
            setLoading(false);
            errors.email = "Enter a valid Email";
            setCredentials({...credentials,errors});
        }else if(!credentials.password.length){
            setLoading(false);
            errors.password = "Enter a valid password";
            setCredentials({...credentials,errors});
        }
        // if there are any errors then dont send the data to the backend
        const error = Object.values(credentials.errors).filter(err => err !== "");
        const notTouched = Object.values(credentials.touched).filter(err => !err);
        console.log(error)
        if(!error.length && !notTouched.length){
            console.log("no error")
            // sending the data to the backend
            const {data} = await axios.post("https://hebewebstore.herokuapp.com/login",{
                email:credentials.email,
                password:credentials.password
            });

            // if the user exists, then store the user id in local storage and redirect the user to the home page
            if(Object.keys(data)[0] === "UserExists"){
                localStorage.setItem('isLoggedIn',true);
                localStorage.setItem('user',data.UserExists);
                window.location.href="/home";
            }
            else if(data === "Email doesnt exists"){
                setLoading(false);
                errors.email = "Email doesn't exists";
                setCredentials({...credentials,errors});
            }
            else if(data === "password is incorrect"){
                setLoading(false);
                errors.password = "password is incorrect";
                setCredentials({...credentials,errors});
            }
        }else{
            setLoading(false)
        }
    }
    
    return (
        <>
            <div className='loginContainer'>
                <div className="animation">
                    <h3>Welcome to Hebe!</h3>
                    <div className='animateImg'>
                        <Lottie 
                            options={defaultOptions}
                            />
                    </div>
                </div>
                <div className='login'>
                    <div className='loginTitle'>Login</div>

                    <div className='googlelogin'>
                        <Googlelogin />
                    </div>

                    {/* form */}
                    <form onSubmit={handleSubmit} className="loginform googleloadin">
                       
                        {loginInp.map(inp => <FormInput label={inp.label} className="loginInp" type={inp.type} name={inp.name} placeholder={inp.placeholder} value={inp.value} handleChange={handleChange} handleBlur={handleBlur} err={inp.err} view = {view} handleView={handleView}/>)}


                        <div>
                            <div className='forgot' onClick={() => {window.location.href = "/identity"}}>Forgot password ?</div>
                            <button type="submit" className="loginSubmit">Log In</button>
                            {loading ? <Loading /> : ""}
                        </div>
                    </form>
                        <div className="hr"></div>

                        <a href="/signin" className="createlink">
                            <div className="createbutton">Create Account</div>
                        </a >
                </div>
            </div>
        </>
    )
}

export default Login