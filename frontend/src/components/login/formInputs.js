import Icon from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";


function FormInput ({id,label,type,name,placeholder,value,err,handleChange,handleBlur,className,view,handleView}) {
    return (
        <>
            {label === "Password" ? (
                <>
                    <div className="form-inp" id={id} >
                        <label>{label}</label>
                        <input 
                        className={className}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        // value={value}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        <span className="errmsg">{err}</span>
                        <span onClick={handleView} className="view"><Icon icon={view}/></span>
                    </div>
                </>
            ):
            (
                <>
                    <div className="form-inp" id={id} >
                        <label>{label}</label>
                        <input 
                        className={className}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        // value={value}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        <span className="errmsg">{err}</span>
                    </div>
                </> 
            )
            }
        </>
    )
}

export default FormInput;





{/* <div className="form-inp" id={id} >
            <label>{label}</label>
            <input 
            className={className}
            type={type}
            name={name}
            placeholder={placeholder}
            // value={value}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            />
            <span className="errmsg">{err}</span>
        </div> */}