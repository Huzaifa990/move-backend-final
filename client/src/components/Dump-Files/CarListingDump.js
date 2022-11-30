import React from "react";
import { useState, useEffect } from "react";

const Listings = () => {
    const [name,setName] = useState([]);

    useEffect(()=>{
        names()
    }, [])

    const names = async () => {
        const response = await fetch("http://localhost:8080/api/listing/");
        console.log(response);
        const data = await response.json();
        console.log(data.listings);
        setName(data.listings)
        
    }
    return (
        <div>
            <h1>API Data</h1>
            {name.map((data)=>{
                return (
                    <li key={data.id}>{data.carName}</li>
                )
            })}
        </div>
    )
}       

export default Listings;