import moment from "moment/moment";
import React from "react";
import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import reject from "../img/remove.png";
import axios from "axios";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const MyBookings = () => {
  const [name, setName] = useState([]);
  const navigate = useNavigate();
  const [show,setShow]=useState();
  const [update, setUpdate] = useState(false);
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [switchState, setSwitchState] = useState(false);
  const [forceUpdate] = useReducer((x) => x + 1, 0);
  // State of true means data is loading state of false means data has been loaded

  const [loading, setLoading] = useState(true);
  const [fees, setFees] = useState();

  //Function being called that fetches data from api.
  useEffect(() => {
    names();
  }, []);

  //Function defined to fetch data from api for all the bookings and store it in a variable.
  const names = async () => {
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const response = await fetch("http://localhost:8080/api/booking/myBookings", {
      headers: { Authorization: userDetails },
    });
    const data = await response.json();
    setName(data.bookings);
    setLoading(false);
  };

  //Functions to navigate from one state to another upon the press of certain buttons.
  function goToDetails(id) {
    navigate("/viewBooking", { state: { id: id } });
  }

  // function goToEdit(id) {
  //   navigate("/editBooking", { state: { id: id } });
  // }

  //Function that also passes the ID of the object to the navigated page.
  function showId(id) {
    goToDetails(id);
  }

  // function editCar(id) {
  //   goToEdit(id);
  // }


  function togglePopup(item) {
    setShow(item);
    var discount = item.paymentDetails.amount;
    discount = discount * 0.2;
    setFees(discount);
    const popupContainer = document.getElementById("pop");
    if (popupContainer.style.display === "block") {
      popupContainer.style.display = "none";
    } else {
      popupContainer.style.display = "block";
    }
  }

  function toggleOff() {
    const popupContainer = document.getElementById("pop");
    popupContainer.style.display = "none";
  }

  async function BookingReject(id) {
    axios
      .put(
        "http://localhost:8080/api/booking/cancel/" + id,
        {},
        {
          headers: { Authorization: userDetails },
        }
      )
      .then((res) => {
        console.log(res);
        NotificationManager.success(res.data.msg);
        setSwitchState(!switchState);
        setUpdate(!update);
      })
      .catch((e) => {
        console.log(e);
      });

      
    forceUpdate();
  }

  return (
    <>
      <div className="">
        <NotificationContainer/>
        {/* This condition allows us to render all of the objects received from the Api. It runs for the count of objects received. */}
        {loading === true ? (
          <Loader />
        ) : name.length > 0 ? (
          name.map((data) => {
            if (data !== null) {
              return (
                <>
                  {/* Data being fed into the list that we fetched from API. */}
                  <div
                    className="container-fluid-listing pt-5 pb-3"
                    key={data.car?.carName}
                    style={{ marginBottom: "50px", padding: "0px 100px" }}
                  >
                    <h1 className="display-4 text-uppercase  mb-3">
                      {data?.car?.company} {data?.car?.carName}
                    </h1>
                    <img
                      className="img-fluid3 mb-4 car-listings"
                      src={data?.car?.picture[0]}
                      alt="car"
                    />

                    {data.status === "Accepted" || data.status === "pending" ? (
                    <ul style={{ float: "right" }} className="list-inline">
                      {/* <li className="list-inline-item">
                        <button
                          className="btn btn-success btn-sm rounded-0 px-4"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Edit"
                          onClick={() => editCar(data._id)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                      </li> */}
                      <li className="list-inline-item">
                        <button
                          className="btn btn-danger btn-sm rounded-0 px-4"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                          onClick={() => togglePopup(data)}
                        >
                          <img
                            src={reject}
                            width="20"
                            alt=""
                            id="tick"/>
                        </button>
                      </li>
                    </ul>
                    ) : <></>}

                    <div class="popup-container" id="pop" onClick={toggleOff}>
                      <div class="popup">
                        <h2 style={{ color: "#f77d0a" }}>Are you sure you want to cancel your booking?</h2>
                        <br />
                        <p>You will be charged PKR {fees} of the PKR {show?.paymentDetails?.amount} amount you paid.</p>
                        <button className="btn btn-secondaryDelete py-3 px-5 cancel-btn" onClick={() => toggleOff()}>Go Back</button>
                        <button className="btn btn-primaryDelete py-3 px-5 cancel-btn" onClick={() => BookingReject(show?._id)}>Cancel Booking</button>
                        </div>
                    </div>

                    {/* Moment plugin used to make the time and date format readable. */}
                    <div className="d-flex mb-4">
                      <div className="px-2 border-left border-right">
                        <span>Pickup Date: {moment.utc(data?.pickupDate).format("llll")}</span>
                      </div>
                      <div className="px-2 border-left border-right">
                        <span>Dropoff Date: {moment.utc(data?.dropOffDate).format("llll")}</span>
                      </div>
                    </div>

                    <span className="headingsRent" style={{}}>
                      <h5>PKR {data?.car?.rentPerDay}/Day</h5>
                      <h5>
                        Booking Days:{" "}
                        <span style={{ color: "rgb(197, 197, 197)" }}>{data?.bookingDays}</span>
                      </h5>
                      <h5>Location: {data?.car?.location}</h5>
                      <h5>
                        Current Status:
                        {data.status === "Accepted" ? (
                          <>
                            <span style={{ color: "green" }}> Active</span>
                          </>
                        ) : data.status === "Cancelled" ? (
                          <span style={{ color: "#6c757d" }}> Cancelled</span>
                        ) : data.status === "Completed" ? (
                          <span style={{ color: "#6c757d" }}> Completed</span>
                        ) : data.status === "Rejected" ? (
                          <span style={{ color: "#6c757d" }}> Rejected</span>
                        ) : (
                          <span style={{ color: "#6c757d" }}> Processing</span>
                        )}
                      </h5>
                      <br></br>
                      {data.status === "Accepted" ? (
                        <>
                          <button className="btn btn-primary px-3" onClick={() => showId(data._id)}>
                            View Booking
                          </button>
                        </>
                      ) : (
                        <div></div>
                      )}
                    </span>
                  </div>
                </>
              );
            } else {
              return <div></div>;
            }
          })
        ) : loading === true ? (
          <Loader />
        ) : (
          // If no data is found from API, this is show.
          <div>
            <center>
              <h1>No Booking Found!</h1>
            </center>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;
