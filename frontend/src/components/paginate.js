import "../css/paginate.css";

function Paginate ({pagenum,paginate}) {
    return (
        <>  
            <div className="paginateCont">
                <ul>
                    {pagenum.map((num) => {
                        return(
                            <li key={num} className="pagLi">
                                <a href="#" onClick={() => {paginate(num)}} className="pagLink">{num}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Paginate