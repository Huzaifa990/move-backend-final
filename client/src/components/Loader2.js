import React from "react";
import loader from "../img/loader.gif";

const Loader2 = () => {
    return (
        <>
        
            <div style={{width: "100%", padding: "50px"}}>
                <center>
                    <img src={loader} alt="loader" width="50px"/> 
                </center>
            </div>
        </>
    )
}

export default Loader2;