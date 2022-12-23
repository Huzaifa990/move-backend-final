import React from "react";
import loader from "../img/loader.gif";

const Loader = () => {
    return (
        <>
        
            <div style={{width: "100%"}}>
                <center>
                    <img src={loader} alt="loader" width="50px"/> 
                    <br/> <br/>
                    <h1>Loading Data...</h1>
                </center>
            </div>
        </>
    )
}

export default Loader;