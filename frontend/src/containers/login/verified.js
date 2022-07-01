import Lottie from "react-lottie";

import animationData from "../../images/92131-ecommerce.json";
import "../../css/verified.css";

function Verified() {

       // animations
       const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }
    
        return (
        <>  
            <div className="verifedContainer">
                <div className="animation">
                    <h3>Welcome to Hebe!</h3>
                    <div className="animateImg">
                        <Lottie 
                            options={defaultOptions}
                        />
                    </div>
                </div>
                <div className="verifed">
                    <h2>You have been successfully Signed In</h2>
                    <h4>Please Log In to access hebe</h4>
                    <a href="/login"><button className="verifybutton">Log In</button></a>
                    <p>It might take few minutes to login</p>
                </div>
            </div>
        </>
    )
}

export default Verified;