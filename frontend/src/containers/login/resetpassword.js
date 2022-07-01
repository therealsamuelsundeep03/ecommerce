import { useState } from "react";
import Lottie from "react-lottie";
import axios from "axios";import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";


import animationData from "../../images/92131-ecommerce.json";
import FormInput from "../../components/login/formInputs";
import Loading from "../../components/loading";
import "../../css/reset.css";

function ResetPasword () {
    const [credential,setCredential] = useState ({
        password : "",
        confirmpassword : "",
        errors: {
            password : "",
            confirmpassword : "" 
        },
        touched:{
            password : false,
            confirmpassword :false,
        }
    })
    const [loading,setLoading] = useState(false);
    const [view,setView] = useState(eyeOff);
    const [type,setType] = useState("password");

    const resetInput = [
        {
            label:"Password",
            type:"password",
            name:"password",
            placeholder:"Password",
            value:credential.password,
            err:credential.errors.password,
            view:view
        },
        {
            label:"Confirm password",
            type:"password",
            id:"confirmpassword",
            name:"confirmpassword",
            placeholder:"confirmpassword",
            value:credential.confirmpassword,
            err:credential.errors.confirmpassword
        }
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

    const handleChange = ({target:{name,value}}) => {
        const errors = credential.errors;

        switch(name){
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
                if(value != credential.password){
                    errors.confirmpassword = "password do not match"
                }else {
                    errors.confirmpassword = ""
                }
                break;
            }

            default:
                break;

        }
        setCredential({...credential,[name]:value},errors)
    }

    const handleBlur = ({target:{name}}) => {
        const touched = {...credential.touched,[name]:true};
        setCredential({...credential,touched})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const errors = Object.values(credential.errors).filter( err => err !== "");
            const notTouched = Object.values(credential.touched).filter(err => !err);
            
            if(!credential.confirmpassword.length){
                setLoading(false)
                const errors = credential.errors;
                errors.confirmpassword = "Please fill this field";
                setCredential({...credential,errors})
            }else{
                // if there are no errors then send the form to the backend
                if(!errors.length && !notTouched.length){
                    const password = credential.password;
                    const email = localStorage.getItem('email');
    
                    const { data } = await axios.put("https://hebewebstore.herokuapp.com/resetpassword",{
                        password,
                        email
                    });

                if(data === "password changed successfully"){
                    localStorage.removeItem('email')
                    window.location.href="/login";
                }
                else{
                    setLoading(false);
                    const errors = credential.errors;
                    errors.password = "password changed successfully";
                    setCredential({...credential,errors})
                }
                }
    
            }    
        }
        catch(err){
            console.log("Error in reseting the password::", err);
        }
    }

    return (
        <>
        <div>hi</div>
            <div className = "resetContainer">
                <div className="animation">
                    <h3>Welcome to Hebe!</h3>
                    <div className="animateImg">
                        <Lottie 
                            options={defaultOptions}
                            /> 
                    </div>
                </div>
                    <div className="reset">
                        <h3>To Reset, Fill The Form</h3>
                        <form className="resetform" onSubmit={handleSubmit}>
                            {resetInput.map(inp => <FormInput label={inp.label} type={inp.type} name={inp.name} placeholder={inp.placeholder} value={inp.value} handleChange={handleChange} handleBlur={handleBlur} err={inp.err} className="resetInp" id={inp.id} view = {view} handleView={handleView}/>)}
                            <button type="submit" className="resetbutton">Submit</button>
                            {loading ? <Loading /> : ""}
                        </form>
                    </div>
            </div>
        </>
    )
}

export default ResetPasword;