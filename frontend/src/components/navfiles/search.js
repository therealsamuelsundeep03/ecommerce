import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import {useHistory} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../css/search.css";

function Search(){
    const [inp,setInp]=useState("")
    const [list,setList]=useState([])

    // list of all the products available in the store.
    const products = ["Headphone","Laptop","Vaccum Cleaner","AC","Mobile","Water heater","Fridge","Electric stove","Washing Machine","Television"]

    // getting suggestions as per the user input.
    const keyUp=({target:{value}})=>{
        if(value){
            let suggestions = products.filter(ele => ele.toLowerCase().startsWith(value.toLowerCase()));
            // showing all the suggestions for the searched result.
            setList(suggestions);
        }
    }

    // tracking input.
    const handleChange=({target:{value}})=>{
        setInp(value);
    }    

    const history = useHistory();

    // onclicking the value, it must be displayed in the input box
    const handleClick=(val)=>{
        setInp(val);
        setList([]);
        // onclicking the product directing it to the product page.
        if(products.includes(val)){
            const value = (val.split("").filter((ele=> ele !== " "))).join("");
            history.push(`/${value}`)
            window.location.reload();
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        // onclicking the icon, must be directed to the product page.
        products.filter((pro)=>{
            if(pro.toLowerCase() === inp.toLowerCase()){
                const input = (inp.split("").filter((ele=> ele !=" "))).join("");
                history.push(`/${input}`)
                window.location.reload();
            }
        })
    }
    return(
        <>   
        {/*creating a search bar */}
          <div className="searchcontainer">
            <form onSubmit={handleSubmit} className="searchForm">
               <div className={`searchInput`}>
                <div className="searchicon" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div> 
                    <input type="text" placeholder="Search products..."
                    onChange={handleChange}
                    onKeyUp={keyUp} 
                    value={inp}
                    className="searchInp"
                    /> 
                    {/* if no i/p then hide the autoComp section */}
                    <div className={`autoComp ${!inp.length ?  "hide" : ""}`}>
                        {list.map(ele => <li  onClick={()=>{handleClick(ele)}}>{ele}</li>)}
                    </div>
                </div> 
            </form>
          </div>     
        </>
    )
}

export default Search;

 {/* <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <div className="icon" onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div> */}


