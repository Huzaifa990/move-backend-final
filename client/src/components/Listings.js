import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import typeR from "../img/type-r.jpg";
import c180 from "../img/c180.jpg";
import m3 from "../img/m3.jpg";

const Listings = () => {
  const [name, setName] = useState([]);

  useEffect(() => {
    names();
  }, []);

  const names = async () => {
    const response = await fetch("http://localhost:8080/api/listing/");
    console.log(response);
    const data = await response.json();
    console.log(data.listings);
    setName(data.listings);
  };
  return (

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
                            <div className="px-2">
                                <i className="fa fa-map-marker text-primary mr-1"></i>
                                <span>LAHORE</span>
                            </div>
                        </div>
                        <a className="btn btn-primary px-3" href="booking.html">$99.00/Day</a>
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
                            <div className="px-2">
                                <i className="fa fa-map-marker text-primary mr-1"></i>
                                <span>Karachi</span>
                            </div>
                        </div>
                        <a className="btn btn-primary px-3" href="booking.html">$100.00/Day</a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-2">
                    <div className="rent-item  mb-4">
                        <img className="img-fluid mb-4 car-listings" src={typeR} alt=""/>
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
                            <div className="px-2">
                                <i className="fa fa-map-marker text-primary mr-1"></i>
                                <span>Karachi</span>
                            </div>
                        </div>
                        <a className="btn btn-primary px-3" href="booking.html">$100.00/Day</a>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <h1 className="display-4 text-uppercase text-center mb-5">Find Your Car</h1>
        <div className="row">
          {name.map((data) => {
            return (
              <>
                <div className="col-lg-4 col-md-6 mb-2" key={data.id}>
                  <div className="rent-item mb-4">
                    <img className="img-fluid mb-4 car-listings" src={data.picture} alt="" />
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
                      <div className="px-2">
                        <i className="fa fa-map-marker text-primary mr-1"></i>
                        <span>{data.location}</span>
                      </div>
                    </div>
                    <Link to="/listings" className="btn btn-primary px-3">PKR {data.rentPerDay}/Day</Link>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>

    </>
  );
};

export default Listings;