import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Loader from "./Loader";

const ViewBookingLessor = () => {
  const location = useLocation();
  const [name, setName] = useState([]);
  var [loader, setLoader] = useState(true);

  useEffect(() => {
    const names = async () => {
      var userDetails = JSON.parse(localStorage.getItem("userDetails"));
      console.log("User ID =>", userDetails);
      const response = await fetch("http://localhost:8080/api/booking/" + location.state.id, {
        headers: { Authorization: userDetails },
      });
      const data = await response.json();
      console.log("Response is: ", data);
      setName(data.carBooking);
      setLoader(false);
    };
    names();
  }, [location.state.id]);

  return (
    <>
      {/* Data fetched being shown in. */}
      <div className="container-fluid pt-5">
        {loader === false ? (
          <>
            <div>
              <div className="container pt-5 pb-3">
                <h1 className="display-4 text-uppercase mb-5">
                  {name?.car?.company} {name?.car?.carName}
                </h1>
                <div className="row align-items-center pb-2">
                  {
                    <div>
                      <img className="img-fluid" src={name?.car?.picture[0]} alt="" />
                    </div>
                  }

                  <div className="col-lg-6 mb-4">
                    <br />
                    <br />
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
                    <p>{name?.car?.description}</p>

                    <div className="d-flex pt-1">
                      <h6>Share on:</h6>
                      <div className="d-inline-flex">
                        <a className="px-2" href="/">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="px-2" href="/">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a className="px-2" href="/">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
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
                    <div className="bg-secondary p-4 mb-5" style={{ height: "200px" }}>
                      <h2 className="text-primary mb-4">Manage Booking</h2>

                      <p>No Options Available!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default ViewBookingLessor;
