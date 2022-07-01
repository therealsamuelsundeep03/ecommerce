// importing external lib
import {Col, Row} from "react-bootstrap";
import { useState } from "react";
import { faEnvelope,faPhone} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// importing internal components
import LandingPageCard from "./landingpagecard";
import headphoneImgs from "../images/pngkey.com-skull-with-headphones-png-5727126.png"
import mobileimg from "../images/pngkey.com-iphone-6s-png-683481.png";
import lapImg from "../images/pngkey.com-laptop-png-hd-2504161.png";
import tvimg from "../images/pngkey.com-tv-png-transparent-462443.png";
import firdgeimg from "../images/pngkey.com-refrigerator-top-view-png-3644105.png";
import aboutimg from "../images/pngkey.com-skull-with-headphones-png-3134743 (1).png";

// importing landing page css...
import "../css/landingpage.css";

function LandingPage () {

    const [category] = useState([
        {img : mobileimg,cat : "mob"},
        {img : lapImg, cat : "lap"},
        {img : tvimg, cat : "tv"},
        {img : firdgeimg, cat : "fridge"}
    ]);

    return (
        <>
        {/* intro to the landing page... */}
            <section className="intro">
                <div className="introContent">
                    <p style={{color:"lightGrey"}}>YOUR ELECTRONIC STORE</p>
                    <div className="introHead">
                        <h2>Super Value Deals On</h2>
                        <h2 style={{color:"lightGrey"}}>All Our Products</h2>
                    </div>
                    <div>
                        <p className="introDisc">upto 50% OFF on all of our Products</p>
                    </div>
                </div>
                <div className="introImg">
                    <img src= {headphoneImgs} className="headphoneImg"/>
                </div>
                <div className="bannerFade"></div>
            </section>

            {/* about section */}
            <section className="about">
               <Row className="aboutRow">
                <Col>
                    <div className="aboutImg">
                        <img src = {aboutimg}  /> 
                    </div>
                </Col>
                <Col>
                    <div className="aboutContent">
                        <h2 className="aboutus">ABOUT US</h2>
                        <p> <span style={{fontFamily:'Cedarville Cursive', fontSize : '25px'}}>At Hebe, </span> we beleive that there is a beter way to do marketing. A more 
                        valuable, less invasive way where customers are earned not bought. We're obssesively 
                        passionate about it, and our mission is to help people acheive it by providing them 
                        with the quality products and help them to experince the best. And we're 
                        excited for you to join our family. </p>
                    </div>
                </Col>
               </Row>
            </section>

            {/* featured section ... */}
            <section className="featured">
                <h3>FEATURED PRODUCTS</h3>
                <div className="featuredRow">
                    <Row>
                        {category.map(ele => <LandingPageCard img={ele.img} cat = {ele.cat}/>)}
                    </Row>
                </div>
            </section>

            {/* footer section */}
            <section className= "footer">
            <div>Get In Touch</div>
            <div className="border" />
                <div>
                    <p><FontAwesomeIcon icon={faEnvelope}/><span style={{marginLeft : '1.2rem'}} className = "footercontent">hebestore@gmail.com</span></p>
                    <p className="footerPara"><FontAwesomeIcon icon={faPhone} style={{marginLeft:'2rem'}}/><span style={{marginLeft : '1.2rem'}} className = "footercontent">+91 8908900980</span></p>
                </div>
            </section>
        </>
    )
}

export default LandingPage