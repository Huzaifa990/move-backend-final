import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";


const MyListings = () => {
 // Creating use states for data and loader

  const [name, setName] = useState([]);
  // State of true means data is loading state of false means data has been loaded

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    names();
  }, []);
  // Getting data from API 

  const names = async () => {
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const response = await fetch("http://localhost:8080/api/listing/my-listings",{
        headers: {Authorization: userDetails}
      });
    console.log(response);
    const data = await response.json();
    console.log(data.listings);
    setName(data.listings);
    setLoading(false);
    
  };

  // Go to view cars 
  function goToDetails(id){
    navigate("/viewListings", {state: {id:id}})
  }

  // Go to editing listings 
  function goToEdit(id){
    navigate("/editListings", {state: {id:id}})
  }

  // Go to delete listings
  function goToDelete(id){
    navigate("/deleteListings", {state: {id:id}})
  }
  // Child callers for edit, delete, and show
  function showId(id){
    goToDetails(id);
  }

  function editCar(id){
    goToEdit(id);
  }

  function deleteCar(id)
  {
    goToDelete(id);
  }

    return(
        <>
        <div className="">
            {/* first check if the data is loading, then check if the data exists in the database */}
            
            { loading===true? <Loader/>:name.length>0?name.map((data)=>{
                if(data !== null){
                    return(
                        <>
                        <div className="container-fluid-listing pt-5 pb-3" key={data._id}>
                    <h1 className="display-4 text-uppercase  mb-3">{data.company} {data.carName}</h1>
                    <img className="img-fluid mb-4 car-listings" style={{width: "30%"}} src={data.picture[0]} alt="car"/>
                    <ul style={{float: "right", paddingBottom: "50px"}} className="list-inline m-0">
    
                        <li className="list-inline-item">
                            <button className="btn btn-success btn-sm rounded-0 px-4" type="button" data-toggle="tooltip"
                                data-placement="top" title="Edit" onClick={ () => editCar(data._id) }><i className="fa fa-edit"></i></button>
                        </li>
                        <li className="list-inline-item">
                            <button className="btn btn-danger btn-sm rounded-0 px-4" type="button" data-toggle="tooltip"
                                data-placement="top" title="Delete" onClick={ () => deleteCar(data._id) }><i className="fa fa-trash"></i></button>
                        </li>
                    </ul>
                    <div className="d-flex mb-4">
                        <div className="px-2">
                            <i className="fa fa-car text-primary mr-1"></i>
                            <span>{data.model}</span>
                        </div>
                        <div className="px-2 border-left border-right">
                            <i className="fa fa-cogs text-primary mr-1"></i>
                            <span>{data.transmission}</span>
                        </div>
                        <div className="px-2">
                            <i className="fa fa-road text-primary mr-1"></i>
                            <span>{data.mileage}</span>
                        </div>
                        <div className="px-2">
                            <i className="fa fa-map-marker text-primary mr-1"></i>
                            <span>{data.location}</span>
                        </div>
                    </div>
    
                    <span className = "headingsRent" style={{}}>
                        <h5>PKR {data.rentPerDay}/Day</h5>
                            <h5>Status: <span style={{color: "rgb(197, 197, 197)"}}>Active</span></h5>
                            <br/>
                            <button className="btn btn-primary px-3" onClick={ () => showId(data._id) }>View Listing</button>
                    </span>
    
                </div>
                        </>
                    )
                }
                else{
                    return(
                        <div>
                            
                        </div>
                    )
                }
                
            }): loading===true? <Loader/>:
                <div>
                    <center>
                        <h1>No Listings Found!</h1>
                    </center>
                </div>
            }
            
        </div>

        </>
    )
}

export default MyListings;