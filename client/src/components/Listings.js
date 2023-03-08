import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import typeR from "../img/type-r.jpg";
import c180 from "../img/c180.jpg";
import m3 from "../img/m3.jpg";
import loader from "../img/loader.gif";

const Listings = () => {
  const navigate = useNavigate();
  const [name, setName] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    names();
  }, []);

  const names = async () => {
    const response = await fetch("http://localhost:8080/api/listing/");
    console.log(response);
    const data = await response.json();
    console.log(data.listings);
    setName(data.listings);
    setLoading(false);
  };

  function goToDetails(id){
    navigate("/viewListings", {state: {id:id}})
  }

  function showId(id){
    goToDetails(id);
  }
  var i = 0;
  return (
    <>
      <div className="">
        {/* first check if the data is loading, then check if the data exists in the database */}

        {loading === true ? (
          <Loader />
        ) : name.length > 0 ? (
          
          

                    <>
                
                        <div className="container-fluid  featured">
                        <div className="container pt-5 pb-3">
                            <h1 className="display-4 text-uppercase text-center mb-5">FEATURED CARS</h1>
                            <div className="row">
                                <div className="col-lg-4 col-md-6 mb-2">
                                    <div className="rent-item mb-4">
                                        <img className="img-fluid mb-4 car-listings" src={c180} alt=""/>
                                        <h4 className="text-uppercase mb-4">Mercedes Benz C180</h4>
                                        <div className="d-flex justify-content-center mb-4">
                                            <div className="px-2">
                                                <i className="fa fa-car text-primary mr-1"></i>
                                                <span>2015</span>
                                            </div>
                                            <div className="px-2 border-left border-right">
                                                <i className="fa fa-cogs text-primary mr-1"></i>
                                                <span>AUTO</span>
                                            </div>
                                            <div className="px-2">
                                                <i className="fa fa-road text-primary mr-1"></i>
                                                <span>25K</span>
                                            </div>
                                            <div className="px-2 border-left">
                                                <i className="fa fa-map-marker text-primary mr-1"></i>
                                                <span>LAHORE</span>
                                            </div>
                                        </div>
                                        <a className="btn btn-primary px-3" href="/listings">$99.00/Day</a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-2">
                                    <div className="rent-item active mb-4">
                                        <img className="img-fluid mb-4 car-listings" src={m3} alt=""/>
                                        <h4 className="text-uppercase mb-4">BMW M3 COMPETITION</h4>
                                        <div className="d-flex justify-content-center mb-4">
                                            <div className="px-2">
                                                <i className="fa fa-car text-primary mr-1"></i>
                                                <span>2019</span>
                                            </div>
                                            <div className="px-2 border-left border-right">
                                                <i className="fa fa-cogs text-primary mr-1"></i>
                                                <span>MANUAL</span>
                                            </div>
                                            <div className="px-2">
                                                <i className="fa fa-road text-primary mr-1"></i>
                                                <span>55K</span>
                                            </div>
                                            <div className="px-2 border-left">
                                                <i className="fa fa-map-marker text-primary mr-1"></i>
                                                <span>Karachi</span>
                                            </div>
                                        </div>
                                        <a className="btn btn-primary px-3" href="/listings">$100.00/Day</a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-2">
                                    <div className="rent-item  mb-4">
                                        <img className="img-fluid mb-4 car-listings" style={{height: 193}}  src={typeR} alt=""/>
                                        <h4 className="text-uppercase mb-4">Honda Civic Type-R</h4>
                                        <div className="d-flex justify-content-center mb-4">
                                            <div className="px-2">
                                                <i className="fa fa-car text-primary mr-1"></i>
                                                <span>2019</span>
                                            </div>
                                            <div className="px-2 border-left border-right">
                                                <i className="fa fa-cogs text-primary mr-1"></i>
                                                <span>MANUAL</span>
                                            </div>
                                            <div className="px-2">
                                                <i className="fa fa-road text-primary mr-1"></i>
                                                <span>55K</span>
                                            </div>
                                            <div className="px-2 border-left">
                                                <i className="fa fa-map-marker text-primary mr-1"></i>
                                                <span>Karachi</span>
                                            </div>
                                        </div>
                                        <a className="btn btn-primary px-3" href="/listings">$100.00/Day</a>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                
                    <div className="container-fluid py-5">
                      <div className="container pt-5 pb-3">
                        <h1 className="display-4 text-uppercase text-center mb-5">Find Your Car</h1>
                        <div className="row">
                          {name.length> 0? name.map((data) => {
                            i = i + 1;
                            if(i % 2 === 0 && i !== 0){
                              i = -1;
                              return (
                                <>
                                  <div className="col-lg-4 col-md-6 mb-2 car-container-main" key={data._id} >
                                    <div className="rent-item active mb-4" onClick={ () => showId(data._id) }>
                                      <img className="img-fluid mb-4" width={"100%"} style={{height: 217}} src={data.picture[0]} alt="" />
                                      <h4 className="text-uppercase mb-4">{data.company} {data.carName}</h4>
                                      <div className="d-flex justify-content-center mb-4">
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
                                        <div className="px-2 border-left">
                                          <i className="fa fa-map-marker text-primary mr-1"></i>
                                          <span>{data.location}</span>
                                        </div>
                                      </div>
                                      <div className="crud-section">
                                          {/* <i className="fa fa-edit text-primary mr-1" style={{fontSize:25}} onClick={ () => editCar(data._id) }></i> */}
                                          
                                          <button className="btn btn-primary px-3" onClick={ () => showId(data._id) }>PKR {data.rentPerDay}/Day</button>
                                          
                                          {/* <i className="fa fa-trash text-primary mr-1" style={{fontSize:25}} onClick={ () => deleteCar(data._id) }></i> */}
                                      </div>                    
                                    </div>
                                  </div>
                                </>
                              );
                            }
                            else{
                                return (
                                  <>
                                    <div className="col-lg-4 col-md-6 mb-2 car-container-main" key={data._id} >
                                      <div className="rent-item mb-4" onClick={ () => showId(data._id) }>
                                        <img className="img-fluid mb-4" width={"100%"} style={{height: 217}} src={data.picture[0]} alt="" />
                                        <h4 className="text-uppercase mb-4">{data.company} {data.carName}</h4>
                                        <div className="d-flex justify-content-center mb-4">
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
                                          <div className="px-2 border-left">
                                            <i className="fa fa-map-marker text-primary mr-1"></i>
                                            <span>{data.location}</span>
                                          </div>
                                        </div>
                                        <div className="crud-section">
                                          {/* <i className="fa fa-edit text-primary mr-1" style={{fontSize:25}} onClick={ () => editCar(data._id) }></i> */}
                                          
                                          <button className="btn btn-primary px-3" onClick={ () => showId(data._id) }>PKR {data.rentPerDay}/Day</button>
                                          
                                          {/* <i className="fa fa-trash text-primary mr-1" style={{fontSize:25}} onClick={ () => deleteCar(data._id) }></i>                        */}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                            }
                            
                          }):
                          <div style={{width: "100%"}}>
                          <center>
                              <img src={loader} alt="loader" width="50px"/> 
                              <br/> <br/>
                              <h1>Loading Listings...</h1>
                          </center>
                          </div>
                          }
                        </div>
                      </div>
                    </div>
                    </>
          
        ) : loading === true ? (
          <Loader />
        ) : (
          <div>
            <center>
              <h1>No Listings Found!</h1>
            </center>
          </div>
        )}
      </div>
    </>
  );
};

export default Listings;
