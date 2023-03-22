import React, { useEffect, useReducer, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import Loader from "./Loader";
import Loader2 from "./Loader2";
import approve from "../img/correct.png";
import reject from "../img/remove.png";
import axios from "axios";
import ReactSwitch from "react-switch";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

export default function AdminDashboard() {
  const [activeOption, setActiveOption] = useState("listings");

  function handleOptionClick(option) {
    setActiveOption(option);
  }

  var [anal, setAnal] = useState({});
  const [loading, setLoading] = useState(true);

  var userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/analytics/adminAnalytics", {
        headers: { Authorization: userDetails },
      });

      var data = await response.json();
      console.log(data);
      setAnal(data.analytics);
      setLoading(false);
    }

    getData();
  }, [userDetails]);

  return (
    <div className="stats-section">
      <NotificationContainer />
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <h1>Analytics:</h1>
          <br />
          <br />
          <div className="charts-container">
            <div className="chart-1">
              <Bar
                data={{
                  datasets: [
                    {
                      label: "Audience",
                      data: [anal.totalMembers, anal.totalLessees, anal.totalLessors],
                      backgroundColor: ["#F77D0A", "#343a40", "#F77D0A", "#343a40"],

                      hoverBackgroundColor: [
                        "#6f42c1",
                        "#6f42c1",
                        "rgba(0, 123, 255,0.5)",
                        "rgba(0,0,0,0.07)",
                      ],
                    },
                  ],
                  labels: ["Total Members", "Total Lessors", "Total Lessees"],
                }}
                width={100}
                height={100}
                options={{
                  legend: {
                    labels: {
                      color: "white",
                    },
                  },

                  scales: {
                    y: {
                      ticks: {
                        color: "white",
                        beginAtZero: true,
                      },
                      grid: {
                        color: "rgba(185, 185, 185, 0.427)",
                      },
                    },

                    x: {
                      ticks: {
                        color: "white",
                        beginAtZero: true,
                      },
                    },
                  },
                }}
              />
            </div>

            <div className="chart-1">
              <Line
                data={{
                  datasets: [
                    {
                      label: "Revenue Analysis",
                      data: [anal.totalBookings, anal.totalCarListed, anal.totalRevenueGenerated],
                      backgroundColor: ["#F77D0A", "white", "white"],
                      borderColor: "#F77D0A",
                      hoverBackgroundColor: ["orange", "orange", "orange", "rgba(0,0,0,0.07)"],
                    },
                  ],
                  labels: ["Total Bookings", "Total Listings", "Total Revenue"],
                }}
                width={100}
                height={100}
                options={{
                  legend: {
                    labels: {
                      backgroundColor: "#ffff",
                    },
                  },
                  scales: {
                    y: {
                      ticks: {
                        color: "white",
                      },
                      grid: {
                        color: "rgba(185, 185, 185, 0.427)",
                      },
                    },

                    x: {
                      ticks: {
                        color: "white",
                        beginAtZero: true,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <br />
          <h1 className="overview-heading">OVERVIEW:</h1>
          <div className="stats-container">
            <div className="col-sm-6 col-lg-2">
              <div className="overview-item overview-item--c1">
                <div className="overview__inner">
                  <div className="overview-box clearfix">
                    <div className="icon">
                      <i className="zmdi zmdi-account-o"></i>
                    </div>
                    <center>
                      <div className="text">
                        <h2>{anal.totalMembers}</h2>
                        <span>Total Members</span>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-2">
              <div className="overview-item overview-item--c2">
                <div className="overview__inner">
                  <div className="overview-box clearfix">
                    <div className="icon">
                      <i className="zmdi zmdi-account-o"></i>
                    </div>
                    <center>
                      <div className="text">
                        <h2>{anal.totalLessors}</h2>
                        <span>Total Lessors</span>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-2">
              <div className="overview-item overview-item--c3">
                <div className="overview__inner">
                  <div className="overview-box clearfix">
                    <div className="icon">
                      <i className="zmdi zmdi-account-o"></i>
                    </div>
                    <center>
                      <div className="text">
                        <h2>{anal.totalLessees}</h2>
                        <span>Total Lessees</span>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-2">
              <div className="overview-item overview-item--c4">
                <div className="overview__inner">
                  <div className="overview-box clearfix">
                    <div className="icon">
                      <i className="zmdi zmdi-account-o"></i>
                    </div>
                    <center>
                      <div className="text">
                        <h2>{anal.totalCarListed}</h2>
                        <span>Total Cars Listings</span>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-8 col-lg-2">
              <div className="overview-item overview-item--c1">
                <div className="overview__inner">
                  <div className="overview-box clearfix">
                    <div className="icon">
                      <i className="zmdi zmdi-account-o"></i>
                    </div>
                    <center>
                      <div className="text">
                        <h2>{anal.totalBookings}</h2>
                        <span>Total Bookings</span>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="overview-item overview-item--c2">
                <div className="overview__inner">
                  <div className="overview-box clearfix">
                    <div className="icon">
                      <i className="zmdi zmdi-account-o"></i>
                    </div>
                    <center>
                      <div className="text">
                        <h2>{anal.totalRevenueGenerated} PKR</h2>
                        <span>Total Revenue Genereated</span>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1>Your Business: </h1>
          <br /> <br />
          <div class="table-responsive table--no-card m-b-40">
            <div className="top-bar">
              <div
                className={`option ${activeOption === "allUsers" ? "active-1" : ""}`}
                onClick={() => handleOptionClick("allUsers")}
              >
                All Users
              </div>
              <div
                className={`option ${activeOption === "users" ? "active-1" : ""}`}
                onClick={() => handleOptionClick("users")}
              >
                Pending Users
              </div>
              <div
                className={`option ${activeOption === "listings" ? "active-1" : ""}`}
                onClick={() => handleOptionClick("listings")}
              >
                Active Listings
              </div>

              <div
                className={`option ${activeOption === "pendingListings" ? "active-1" : ""}`}
                onClick={() => handleOptionClick("pendingListings")}
              >
                Pending Listings
              </div>

              <div
                className={`option ${activeOption === "bookings" ? "active-1" : ""}`}
                onClick={() => handleOptionClick("bookings")}
              >
                Active Bookings
              </div>

              <div
                className={`option ${activeOption === "pendingBookings" ? "active-1" : ""}`}
                onClick={() => handleOptionClick("pendingBookings")}
              >
                Pending Bookings
              </div>
            </div>

            <div>
              {activeOption === "users" ? (
                <UsersTable />
              ) : activeOption === "listings" ? (
                <ListingsTable />
              ):
                 activeOption ==="pendingListings" ? (
                <PendingListingsTable/>
              ): activeOption === "bookings" ? (
                <BookingsTable />
              ) : activeOption === "pendingBookings" ? (
                <PendingBookingsTable />
              ) : activeOption === "allUsers" ? (
                <AllUsersTable />
              ) : (
                ""
              )}
            </div>
          </div>
          <br /> <br />
        </>
      )}
    </div>
  );
}

function UsersTable() {
  const [loading, setLoading] = useState(true);
  const [ingnored, forceUpdate] = useReducer((x) => x + 1, 0);
  var navigate = useNavigate();
  var [users, setUser] = useState([]);
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/auth/getAllPendingApprovalUsers", {
        headers: { Authorization: userDetails },
      });

      var data = await response.json();
      console.log("Pending Users:");
      console.log(data);
      setUser(data.users);
      setLoading(false);
    }

    getData();
  }, [userDetails, ingnored]);

  async function approveUser(id){
    axios.put("http://localhost:8080/api/auth/verifyUser/approve/"+id,
    {
      verified: true,
    },
    {
      headers: { Authorization: userDetails },
    }
    )
    .then((res)=>{
      console.log(res);
      NotificationManager.success("User Approved");

    }).catch((e)=>{
      console.log(e);
    });

    await fetch("http://localhost:8080/api/auth/getAllPendingApprovalUsers", {
        headers: { Authorization: userDetails },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    forceUpdate();
  }

  async function rejectUser(id){
    axios.put("http://localhost:8080/api/auth/verifyUser/reject/"+id,
    {
      verified: false,
    },
    {
      headers: { Authorization: userDetails },
    }
    )
    .then((res)=>{
      console.log(res);
      NotificationManager.error("User Rejected");

    }).catch((e)=>{
      console.log(e);
    });

    await fetch("http://localhost:8080/api/auth/getAllPendingApprovalUsers", {
        headers: { Authorization: userDetails },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    forceUpdate();
  }

  function goToViewUser(id) {
    navigate("/viewUser", { state: { id: id } });
  }
  return (
    <div>
      <table class="table table-borderless table-striped table-earning">
        {loading === false ? (
          <>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CNIC</th>
                <th class="text-right">Phone Number</th>
                <th class="text-right">Email Verified</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => {
                return (
                  <tr>
                    <td onClick={() => goToViewUser(item._id)}>{item.name}</td>
                    <td onClick={() => goToViewUser(item._id)}>{item.email}</td>
                    <td onClick={() => goToViewUser(item._id)}>{item.cnic}</td>
                    <td class="text-right">{item.phoneNumber}</td>
                    <td class="text-right">
                      {item.emailVerified === true ? (
                        <>
                          <span style={{ color: "green" }}> Active</span>
                        </>
                      ) : (
                        <span style={{ color: "#6c757d" }}> Inactive</span>
                      )}{" "}
                    </td>
                    <td className="tr-flex" id="approval">
                      <img
                        src={approve}
                        width="35"
                        alt=""
                        id="tick"
                        // class="pendingBtns"
                        onClick={() => approveUser(item._id)}
                      />
                      <img
                        src={reject}
                        width="35"
                        alt=""
                        id="tick"
                        onClick={() => rejectUser(item._id)}
                      />
                    </td>
                    
                  </tr>
                );
              })}
            </tbody>
          </>
        ) : (
          <Loader2 />
        )}
      </table>
    </div>
  );
}

function AllUsersTable() {
  const [loading, setLoading] = useState(true);
  var navigate = useNavigate();
  var [users, setUser] = useState([]);
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/auth/getAllUsers", {
        headers: { Authorization: userDetails },
      });

      var data = await response.json();
      console.log(data);
      setUser(data.users);
      setLoading(false);
    }

    getData();
  }, [userDetails]);

  function goToViewUser(id) {
    navigate("/viewUser", { state: { id: id } });
  }
  return (
    <div>
      <table class="table table-borderless table-striped table-earning">
        {loading === false ? (
          <>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CNIC</th>
                <th>Phone Number</th>
                <th>Account Status</th>
                <th>Email Verified</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => {
                return (
                  <tr onClick={() => goToViewUser(item._id)}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.cnic}</td>
                    <td>{item.phoneNumber}</td>
                    <td align="center">
                      {item.status === true ? (
                        <>
                          <span style={{ color: "green" }}> Active</span>
                        </>
                      ) : (
                        <span style={{ color: "#6c757d" }}> Inactive</span>
                      )}{" "}
                    </td>

                    <td align="center">
                      {item.emailVerified === true ? (
                        <>
                          <span style={{ color: "green" }}> Verified</span>
                        </>
                      ) : (
                        <span style={{ color: "#6c757d" }}> Not Verified</span>
                      )}{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </>
        ) : (
          <Loader2 />
        )}
      </table>
    </div>
  );
}

function ListingsTable() {
  const [ingnored, forceUpdate] = useReducer(x=>x+1,0);
  const [loading, setLoading] = useState(true);
  var navigate = useNavigate();
  var [listings, setListings] = useState([]);
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [switchState, setSwitchState] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/analytics/adminAnalytics/getAllListings", {
        headers: { Authorization: userDetails },
      });

      var data = await response.json();
      console.log(data);
      setListings(data.allListings);
      setLoading(false);
    }

    getData();
  }, [userDetails, ingnored, switchState]);

  async function statusChangeTwo(id) {
    axios.put(
        "http://localhost:8080/api/listing/toggle/" + id,
        {},
        {
          headers: { Authorization: userDetails },
        }
      )
      .then((res) => {
        NotificationManager.success("Listing Updated");
        setSwitchState(!switchState)
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
      
    forceUpdate();
  }

  function goToListings(id) {
    navigate("/viewListingDashboard", { state: { id: id } });
  }

  

  return (
    <div>
      <table class="table table-borderless table-striped table-earning">
        {loading === false ? (
          <>
            <thead>
              <tr>
                <th>Car Name</th>
                <th>Company</th>
                <th>Date Listed</th>
                <th class="text-right">Rent Per Day</th>
                <th class="text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item) => {
                return (
                  <tr>
                    <td onClick={() => goToListings(item._id)}>{item.carName}</td>
                    <td onClick={() => goToListings(item._id)}>{item.company}</td>
                    <td onClick={() => goToListings(item._id)}>
                      {moment.utc(item.listedDate).format("llll")}
                    </td>
                    <td onClick={() => goToListings(item._id)} class="text-right">
                      {item.rentPerDay} PKR
                    </td>

                    <td class="text-right">
                      {item.approved === "Accepted" ? (<ReactSwitch
                        className="switch"
                        checked={item.status}
                        onChange={() => statusChangeTwo(item._id)}
                      />) : item.approved === "Rejected" ? (<><p>Listing Rejected</p></>) : item.approved === "Processing" ? (<></>) : <></>}
                      
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </>
        ) : (
          <Loader2 />
        )}
      </table>
    </div>
  );
}

function PendingListingsTable() {
  const [ingnored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [switchState, setSwitchState] = useState(false);
  const [loading, setLoading] = useState(true);
  var navigate = useNavigate();
  var [listings, setListings] = useState([]);
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/analytics/adminAnalytics/getAllPendingListings", {
        headers: { Authorization: userDetails },
      });

      var data = await response.json();
      console.log(data);
      setListings(data.pendingListings);
      setLoading(false);
    }

    getData();
  }, [userDetails, ingnored, switchState]);

  function goToListings(id) {
    navigate("/viewListingDashboard", { state: { id: id } });
  }

  async function statusChange(id) {
    axios
      .put(
        "http://localhost:8080/api/listing/verifyListing/" + id,
        {},
        {
          headers: { Authorization: userDetails },
        }
      )
      .then((res) => {
        console.log(res);
        NotificationManager.success("Listing Approved");
        setSwitchState(!switchState)
      })
      .catch((e) => {
        console.log(e);
      });

      
    forceUpdate();
  }

  async function statusChangeReject(id) {
    axios
      .put(
        "http://localhost:8080/api/listing/rejectListing/" + id,
        {},
        {
          headers: { Authorization: userDetails },
        }
      )
      .then((res) => {
        console.log(res);
        NotificationManager.error("Listing Rejected");
        setSwitchState(!switchState)
      })
      .catch((e) => {
        console.log(e);
      });

      
    forceUpdate();
  }


  return (
    <div>
      <table class="table table-borderless table-striped table-earning">
        {loading === false ? (
          <>
            <thead>
              <tr>
                <th>Car Name</th>
                <th>Company</th>
                <th>Date Listed</th>
                <th class="text-right">Rent Per Day</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item) => {
                return (
                  <tr>
                    <td onClick={() => goToListings(item._id)}>{item.carName}</td>
                    <td onClick={() => goToListings(item._id)}>{item.company}</td>
                    <td onClick={() => goToListings(item._id)}>
                      {moment.utc(item.listedDate).format("llll")}
                    </td>
                    <td onClick={() => goToListings(item._id)} class="text-right">
                      {item.rentPerDay} PKR
                    </td>
                    <td className="tr-flex" id="approval">
                          <img
                            src={approve}
                            width="35"
                            alt=""
                            id="tick"
                            onClick={() => statusChange(item._id)}
                          />
                        <img
                            src={reject}
                            width="35"
                            alt=""
                            id="tick"
                            onClick={() => statusChangeReject(item._id)}/>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </>
        ) : (
          <Loader2 />
        )}
      </table>
    </div>
  );
}

function BookingsTable() {
  const [loading, setLoading] = useState(true);
  var navigate = useNavigate();
  var [bookings, setBookings] = useState([]);
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [forceUpdate] = useReducer((x) => x + 1, 0);
  const [switchState, setSwitchState] = useState(false);
  const [show,setShow]=useState();
  const [update, setUpdate] = useState(false);

  function goToBookings(id) {
    navigate("/viewBookingDashboard", { state: { id: id } });
  }

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/analytics/adminAnalytics/getAllBookings", {
        headers: { Authorization: userDetails },
      });
      var data = await response.json();
      console.log(data);
      setBookings(data.allBookings);
      setLoading(false);
    }

    getData();
  }, [userDetails, switchState, update]);

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
        NotificationManager.error("Booking Cancelled");
        setSwitchState(!switchState)
        setUpdate(!update);
      })
      .catch((e) => {
        console.log(e);
      });

      
    forceUpdate();
  }

  function togglePopup(item) {
    setShow(item);
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


  return (
    <div>
      <table class="table table-borderless table-striped table-earning">
        {loading === false ? (
          <>
            <thead>
              <tr>
                <th>Car Name</th>
                <th>Company</th>
                <th>Date Listed</th>
                <th class="text-right">Rent Per Day</th>
                <th class="text-right">Cancel Booking</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => {
                if (item.status === "Accepted") {
                  return (
                    <tr>
                      <td onClick={() => goToBookings(item._id)}>{item.car.carName}</td>
                      <td onClick={() => goToBookings(item._id)}>{item.car.company}</td>
                      <td onClick={() => goToBookings(item._id)}>{moment.utc(item.listedDate).format("llll")}</td>
                      <td onClick={() => goToBookings(item._id)} class="text-right">{item.paymentDetails.amount} PKR</td>
                      <td class="text-right"><img
                            src={reject}
                            width="35"
                            alt=""
                            id="tick"
                            onClick={() => togglePopup(item)}/></td>
                            <div class="popup-container" id="pop" onClick={toggleOff}>
                      <div class="popup">
                        <h2 style={{ color: "#f77d0a" }}>Are you sure you want to cancel this booking?</h2>
                        <br />
                        <button className="btn btn-primaryDelete py-3 px-5 cancel-btn" onClick={() => BookingReject(show?._id)}>Cancel Booking</button>
                        
                        <button className="btn btn-secondaryDelete py-3 px-5 cancel-btn" onClick={() => toggleOff()}>Go Back</button>
                        </div>
                    </div>
                    </tr>
                  );
                } else {
                  return <></>;
                }
              })}
            </tbody>
          </>
        ) : (
          <Loader2 />
        )}
      </table>
    </div>
  );
}

function PendingBookingsTable() {
  const [ingnored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [loading, setLoading] = useState(true);
  var navigate = useNavigate();
  var [bookings, setBookings] = useState([]);
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [show,setShow]=useState();
  const [update, setUpdate] = useState(false);

  function goToBookings(id) {
    navigate("/viewBookingDashboard", { state: { id: id } });
  }

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/analytics/adminAnalytics/getAllPendingBookings", {
        headers: { Authorization: userDetails },
      });
      var data = await response.json();
      console.log(data);
      setBookings(data.pendingBookings);
      setLoading(false);
    }

    setInterval(getData,5000);
  }, [userDetails, ingnored, update]);

  async function acceptBooking(id) {
    axios
      .put(
        "http://localhost:8080/api/booking/approve/" + id,
        {},
        {
          headers: { Authorization: userDetails },
        }
      )
      .then((res) => {
        console.log(res);
        NotificationManager.success("Booking Approved!");
      })
      .catch((e) => {
        console.log(e);
      });

    await fetch("http://localhost:8080/api/booking/getLessorPendingBookings", {
      headers: { Authorization: userDetails },
    })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
    forceUpdate();
  }

  function togglePopup(item) {
    setShow(item);
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

  async function rejectBooking(id) {
    axios
      .put(
        "http://localhost:8080/api/booking/reject/" + id,
        {},
        {
          headers: { Authorization: userDetails },
        }
      )
      .then((res) => {
        console.log(res);
        NotificationManager.error("Booking Rejected");
        setUpdate(!update);
      })
      .catch((e) => {
        console.log(e);
      });

      await fetch("http://localhost:8080/api/analytics/adminAnalytics/getAllPendingBookings", {
      headers: { Authorization: userDetails },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    forceUpdate();
  }

  return (
    <div>
      <table class="table table-borderless table-striped table-earning">
        {loading === false ? (
          <>
            <thead>
              <tr>
                <th>Car Name</th>
                <th>Company</th>
                <th>Date Listed</th>
                <th class="text-right">Rent Per Day</th>
                <th>Status</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => {
                if (item.status === "pending") {
                  return (
                    <tr>
                      <td onClick={() => goToBookings(item._id)}>{item.car.carName}</td>
                      <td onClick={() => goToBookings(item._id)}>{item.car.company}</td>
                      <td onClick={() => goToBookings(item._id)}>
                        {moment.utc(item.listedDate).format("llll")}
                      </td>
                      <td class="text-right" onClick={() => goToBookings(item._id)}>
                        {item.paymentDetails.amount} PKR
                      </td>
                      <td onClick={() => goToBookings(item._id)} id="stat">
                        {item.status}
                      </td>
                      <td className="tr-flex" id="approval">
                      <img
                        src={approve}
                        width="35"
                        alt=""
                        id="tick"
                        onClick={() => acceptBooking(item._id)}
                      />
                        <img
                          src={reject}
                          width="35"
                          alt=""
                          id="tick"
                          onClick={() => togglePopup(item)}
                        />
                      </td>
                      <div class="popup-container" id="pop" onClick={toggleOff}>
                      <div class="popup">
                        <h2 style={{ color: "#f77d0a" }}>Are you sure you want to cancel this booking?</h2>
                        <br />
                        <button className="btn btn-primaryDelete py-3 px-5 cancel-btn" onClick={() => rejectBooking(show?._id)}>Cancel Booking</button>
                        
                        <button className="btn btn-secondaryDelete py-3 px-5 cancel-btn" onClick={() => toggleOff()}>Go Back</button>
                        </div>
                    </div>
                    </tr>
                  );
                } else {
                  return <></>;
                }
              })}
            </tbody>
          </>
        ) : (
          <Loader2 />
        )}
      </table>
    </div>
  );
}
