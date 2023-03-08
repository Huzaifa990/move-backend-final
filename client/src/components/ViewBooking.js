import React from "react";
import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ViewBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState([]);

  useEffect(() => {
    const names = async () => {
        var userDetails = JSON.parse(localStorage.getItem("userDetails"));
        console.log("User ID =>", userDetails);
        const response = await fetch("http://localhost:8080/api/booking/" + location.state.id,{
          headers: { Authorization: userDetails },
        });
        const data = await response.json();
        console.log("Response is: ", data)
        setName(data.carBooking);
      };
    names();
  },[location.state.id]);
  
  //Functions to navigate from one state to another upon the press of certain buttons.
  function goToEdit(id) {
    navigate("/editBooking", { state: { id: id } });
  }

  function goToDelete(id) {
    navigate("/deleteBooking", { state: { id: id } });
  }

  //Function that also passes the ID of the object to the navigated page.
  function editCar(id) {
    goToEdit(id);
  }

  function deleteCar(id) {
    goToDelete(id);
  }

  //Function defined to fetch data from api for the specific booking and store it in a variable.
  

  return (
    <>    
    {/* Data fetched being shown in. */}
        <div className="container-fluid pt-5">
        <div className="container pt-5 pb-3">
            <h1 className="display-4 text-uppercase mb-5">{name?.car?.company} {name?.car?.carName}</h1>
            <div className="row align-items-center pb-2">
                {
                    <div>
                    <img className="img-fluid" src={name?.car?.picture[0]} alt=""/>
                    </div>
                }
                
                <div className="col-lg-6 mb-4">
                    <br/><br/>
                    <h4 className="mb-2">PKR{name?.car?.rentPerDay}/Day</h4>
                    <div className="d-flex mb-3">
                        <h6 className="mr-2">Rating:</h6>
                        <div className="d-flex align-items-center justify-content-center mb-1">
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star-half-alt text-primary mr-1"></small>
                            <small>(250)</small>
                        </div>
                    </div>
                    <p>Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor diam ipsum et, tempor voluptua sit consetetur sit. Aliquyam diam amet diam et eos sadipscing labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor consetetur takimata eirmod, dolores takimata consetetur invidunt</p>
                    <div className="d-flex pt-1">
                        <h6>Share on:</h6>
                        <div className="d-inline-flex">
                            <a className="px-2" href="/"><i className="fab fa-facebook-f"></i></a>
                            <a className="px-2" href="/"><i className="fab fa-twitter"></i></a>
                            <a className="px-2" href="/"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-n3 mt-lg-0 pb-4">
                <div className="col-md-3 col-6 mb-2">
                    <i className="fa fa-car text-primary mr-2"></i>
                    <span>Model: {name?.car?.model}</span>
                </div>
                <div className="col-md-3 col-6 mb-2">
                    <i className="fa fa-cogs text-primary mr-2"></i>
                    <span>{name?.car?.transmission}</span>
                </div>
                <div className="col-md-3 col-6 mb-2">
                    <i className="fa fa-road text-primary mr-2"></i>
                    <span>{name?.car?.mileage} Km</span>
                </div>
                <div className="col-md-3 col-6 mb-2">
                    <i className="fa fa-eye text-primary mr-2"></i>
                    <span>GPS Navigation</span>
                </div>
                
            </div>
        </div>
    </div>

    <div className="container-fluid pb-5">
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    
                    <h2 className="mb-4">Booking Detail</h2>
                    <label htmlFor id="errorApi">
                    {" "}
                    <span id="errorMessage"></span>
                    </label>
                    <div className="mb-5">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label for="">Number of days you have booked the car for: </label>
                                <div className="date" id="date2" data-target-input="nearest">
                                    <h5>{name?.bookingDays}</h5>
                                </div>
                            </div>
                            <div className="col-6 form-group">
                                <label for="">Total Payable Amount: </label>
                                <div className="date" id="date2" data-target-input="nearest">
                                <h5>Rs.{name?.paymentDetails?.amount}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label for="">Pickup Date: </label>
                                <div className="date" id="date2" data-target-input="nearest">
                                <h5>Pickup Date: {moment.utc(name?.pickupDate).format("llll")}</h5>
                                </div>
                            </div>
                            <div className="col-6 form-group">
                                <label for="">Dropoff Date: </label>
                                <div className="date" id="date2" data-target-input="nearest">
                                <h5>DropOff Date: {moment.utc(name?.dropOffDate).format("llll")}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Buttons to edit and/or delete the booking. */}
                <div className="col-lg-4">
                    <div className="bg-secondary p-4 mb-5">
                        <h2 className="text-primary mb-4">Manage Booking</h2>
                        <button className="btn btn-block btn-edit py-2" onClick={() => editCar(name?._id)}>Edit Booking <i className="fa fa-edit"></i></button>
                        <button className="btn btn-block btn-deleteBooking py-2" onClick={() => deleteCar(name?._id)}>Delete Booking <i className="fa fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>          

    </>
  );
    };
    
    export default ViewBooking;