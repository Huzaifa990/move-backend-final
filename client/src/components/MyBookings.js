import moment from "moment/moment";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const MyListings = () => {
  const [name, setName] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    names();
  }, []);

  const names = async () => {
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    console.log("User ID =>", userDetails);
    const response = await fetch("http://localhost:8080/api/booking/myBookings", {
      headers: { Authorization: userDetails },
    });
    const data = await response.json();
    setName(data.bookings);
    setLoading(false);
  };

  function goToDetails(id) {
    navigate("/viewBooking", { state: { id: id } });
  }

  function goToEdit(id) {
    navigate("/editBooking", { state: { id: id } });
  }

  function goToDelete(id) {
    navigate("/deleteBooking", { state: { id: id } });
  }

  function showId(id) {
    goToDetails(id);
  }

  function editCar(id) {
    goToEdit(id);
  }

  function deleteCar(id) {
    goToDelete(id);
  }

  return (
    <>
      <div className="">
        {loading===true? <Loader/>:name.length > 0 ? (
          name.map((data) => {
            if (data !== null) {
              return (
                <>
                  <div
                    className="container pt-5 pb-3"
                    key={data.car?.carName}
                    style={{ marginBottom: "50px", padding: "0px 100px" }}
                  >
                    <h1 className="display-4 text-uppercase  mb-3">
                      {data?.car?.company} {data?.car?.carName}
                    </h1>
                    <img
                      className="img-fluid mb-4 car-listings"
                      style={{ width: "30%" }}
                      src={data?.car?.picture[0]}
                      alt="car"
                    />
                    <ul style={{ float: "right" }} className="list-inline m-0">
                      <li className="list-inline-item">
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
                      </li>
                      <li className="list-inline-item">
                        <button
                          className="btn btn-danger btn-sm rounded-0 px-4"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                          onClick={() => deleteCar(data._id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </li>
                    </ul>
                    <div className="d-flex mb-4">
                      <div className="px-2">
                        <span>Pickup Date: {moment(data?.pickupDate).format("llll")}</span>
                      </div>
                      <div className="px-2 border-left border-right">
                        <span>Dropoff Date: {moment(data?.dropOffDate).format("llll")}</span>
                      </div>
                    </div>

                    <span
                      style={{ position: "relative", float: "right", bottom: "180px", right: "0" }}
                    >
                      <h5>PKR {data?.car?.rentPerDay}/Day</h5>
                      <h5>
                        Booking Days: <span style={{ color: "rgb(197, 197, 197)" }}>{data?.bookingDays}</span>
                      </h5>
                      <h5>Location: {data?.car?.location}</h5>
                      <br />
                      <button className="btn btn-primary px-3" onClick={() => showId(data._id)}>
                        View Booking
                      </button>
                    </span>
                  </div>
                </>
              );
            } else {
              return <div></div>;
            }
          })
        ) :loading===true? <Loader/>: (
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

export default MyListings;
