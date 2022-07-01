import {Card,Col} from "react-bootstrap";
import {Link} from "react-router-dom";

function LandingPageCard ({img,cat}) {
    return(
        <>
            <Col className="landingCol">
                <Card className="landingCard">
                    <div className="lcardimg">
                        {cat === "lap" ? <a href="/laptop"><img src={img} style={{height:'150px',maxWidth:"180px",marginTop:'30px'}}/></a> : 
                         cat === "tv" ? <a href="/television"><img src={img} style={{height:'140px',maxWidth:"270px",marginTop:'40px'}}/></a> : 
                         cat === "fridge" ? <a href = "/fridge"><img src={img} style={{height:'200px',maxWidth:'160px'}}/></a> :
                         <a href = "/mobile"><img src={img} style={{height:'200px',maxWidth:'200px'}}/></a>}
                    </div>
                </Card>
            </Col>
        </>
    )
}

export default LandingPageCard;