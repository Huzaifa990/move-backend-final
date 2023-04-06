import React, { useEffect, useState, useReducer } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Bar, Line,  } from "react-chartjs-2";
import "chart.js/auto";
import Loader from "./Loader";
import ReactSwitch from "react-switch";
import axios from "axios";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Loader2 from "./Loader2";
import approve from "../img/correct.png";
import unable from "../img/unable3.png";
import reject from "../img/remove.png";
import left_arr from "../img/backward.png";
import right_arr from "../img/forward.png";


export default function LessorDashboard() {
  const [activeOption, setActiveOption] = useState("allListings");

  function handleOptionClick(option) {
    setActiveOption(option);
  }

  var [anal, setAnal] = useState({});
  const [loading, setLoading] = useState(true);

  var userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/analytics/lessorAnalytics?pageSize=10&page=0", {
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
                      label: "Revenue",
                      data: [anal.lifetimeRevenue, anal.currentMonthRevenue],
                      backgroundColor: ["#F77D0A", "#343a40", "rgba(0,0,0,0.07)"],

                      hoverBackgroundColor: [
                        "#6f42c1",
                        "#6f42c1",
                        "rgba(0, 123, 255,0.5)",
                        "rgba(0,0,0,0.07)",
                      ],
                    },
                  ],
                  labels: ["Life Time Revenue", "Current Month Revenue"],
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
                      label: "Your Activity",
                      data: [
                        anal.carsListed,
                        anal.currentMonthBookings,
                        anal.totalBookingsReceived,
                      ],
                      backgroundColor: ["#F77D0A", "white", "white"],
                      borderColor: "#F77D0A",
                      hoverBackgroundColor: ["orange", "orange", "orange", "rgba(0,0,0,0.07)"],
                    },
                  ],
                  labels: ["Total Cars Listed", "Current Month Bookings", "Lifetime Bookings"],
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
                      beginAtZero: true,
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
            <div className="col-sm-6 col-lg-3">
              <div className="overview-item overview-item--c1">
                <div className="overview__inner">
                  <div className="overview-box clearfix">
                    <div className="icon">
                      <i className="zmdi zmdi-account-o"></i>
                    </div>
                    <center>
                      <div className="text">
                        <h2>{anal.carsListed}</h2>
                        <span>Cars Listed Currently</span>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="overview-item overview-item--c2">
                <div className="overview__inner">
                  <div className="overview-box clearfix">
                    <div className="icon">
                      <i className="zmdi zmdi-account-o"></i>
                    </div>
                    <center>
                      <div className="text">
                        <h2>{anal.currentMonthBookings}</h2>
                        <span>Current Month Bookings</span>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-8 col-lg-3">
              <div className="overview-item overview-item--c3">
                <div className="overview__inner">
                  <div className="overview-box clearfix">
                    <div className="icon">
                      <i className="zmdi zmdi-account-o"></i>
                    </div>
                    <center>
                      <div className="text">
                        <h2>{anal.currentMonthRevenue} PKR </h2>
                        <span>Current Month Revenue</span>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="overview-item overview-item--c1">
                <div className="overview__inner">
                  <div className="overview-box clearfix">
                    <div className="icon">
                      <i className="zmdi zmdi-account-o"></i>
                    </div>
                    <center>
                      <div className="text">
                        <h2>{anal.totalBookingsReceived}</h2>
                        <span>Total Bookings Recieved</span>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="overview-item overview-item--c4">
                <div className="overview__inner">
                  <div className="overview-box clearfix">
                    <div className="icon">
                      <i className="zmdi zmdi-account-o"></i>
                    </div>
                    <center>
                      <div className="text">
                        <h2>{anal.lifetimeRevenue} PKR</h2>
                        <span>Life Time Revenue</span>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1>Your Cars: </h1>
          <br /> <br />
          <div className="table-responsive table--no-card m-b-40">
            <div className="table-responsive table--no-card m-b-40">
              <div className="top-bar">
                <div
                  className={`option ${activeOption === "allListings" ? "active-1" : ""}`}
                  onClick={() => handleOptionClick("allListings")}
                >
                  All Listings
                </div>
                <div
                  className={`option ${activeOption === "bookingsCurrent" ? "active-1" : ""}`}
                  onClick={() => handleOptionClick("bookingsCurrent")}
                >
                  All Bookings
                </div>

                <div
                  className={`option ${activeOption === "bookingsPending" ? "active-1" : ""}`}
                  onClick={() => handleOptionClick("bookingsPending")}
                >
                  Booking Requests
                </div>
              </div>

              <div>
                {activeOption === "allListings" ? (
                  <AllListings />
                ) : activeOption === "bookingsCurrent" ? (
                  <AllBookings />
                ) : activeOption === "bookingsPending" ? (
                  <PendingBookings />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function AllListings() {
  var [stats, setStats] = useState([]);
  const [ingnored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [switchState, setSwitchState] = useState(false);
  var [pageNum, setPageNum] = useState(0);


  var navigate = useNavigate();
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [loading, setLoading] = useState(true);
  var [totalPages, setTotalPages] = useState(0);

  useEffect(() => {

    async function getData() {
      const response = await fetch("http://localhost:8080/api/analytics/lessorAnalytics?pageSize=10&page="+pageNum, {
        headers: { Authorization: userDetails },
      });
      var data = await response.json();
      console.log(data);
      setStats(data.myListings);
      setLoading(false);
      setTotalPages(Math.ceil(data.analytics.carsListed/10));
      console.log(totalPages);
    }

    getData();
  }, [userDetails, ingnored,pageNum, totalPages]);

  function goToListings(id) {
    navigate("/viewListings", { state: { id: id } });
  }

  async function statusChange(id) {
    setSwitchState(true);
    axios
      .put(
        "http://localhost:8080/api/listing/toggle/" + id,
        {},
        {
          headers: { Authorization: userDetails },
        }
      )
      .then((res) => {
        console.log(res);
        NotificationManager.success("Listing Updated");
      })
      .catch((e) => {
        console.log(e);
        NotificationManager.error("Listing Update Failed  ");
      });

      await fetch("http://localhost:8080/api/analytics/lessorAnalytics?pageSize=10&page="+pageNum, {
      headers: { Authorization: userDetails },
    })
      .then(() => {
        setSwitchState(false);
      })
      .catch((e) => {
        console.log(e);
      });
    forceUpdate();
  }

  return (
    <>
      <table class="table table-borderless table-striped table-earning lessorTable">
        {loading === false ? (
          <>
            <thead>
              <tr>
                <th>Car Name</th>
                <th>Company</th>
                <th>Date Listed</th>
                <th class="text-right">Rent Per Day</th>
                <th class="text-right">Status</th>
                <th class="text-right">Manage</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((item) => {
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
                      {item.status === true && item.approved === "Accepted" ? (
                        <>
                          <span style={{ color: "green" }}> Active</span>
                        </>
                      ) : item.status === false && item.approved === "Accepted" ? (
                        <span style={{ color: "#6c757d" }}> Inactive</span>
                      ) : item.approved === "Rejected" ? (
                        <span style={{ color: "#6c757d" }}> Rejected</span>
                      ) : (
                        <span style={{ color: "#6c757d" }}> Processing</span>
                      )}{" "}
                    </td>
                    <td class="text-right">
                      {item.approved === "Accepted" ? (
                        <ReactSwitch
                          className="switch"
                          disabled={switchState}
                          checked={item.status}
                          onChange={() => statusChange(item._id)}
                        />
                      ) : (
                        <></>
                      )}
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
      {totalPages > 1?<>
        <div className="pagination">
        <div className="pagi-cons">
          {pageNum > 0? <>
            <img src={left_arr} alt="left" width="25px" onClick={()=>setPageNum(--pageNum)}/>
          </>:null}
          
          <span>Page {pageNum+1} of {totalPages}</span>
          {pageNum+1 !== totalPages? <>
            <img src={right_arr} alt="right"  width="25px"  onClick={()=>setPageNum(++pageNum)}/>
          </>:null}
        </div>
      </div>
      </>:<>
      <div className="pagination">
        <div className="pagi-cons">
          <span>Page {pageNum+1} of {totalPages}</span>
        </div>
      </div>
      </>}
      
    </>
  );
}

function AllBookings() {
  var [pageNum, setPageNum] = useState(0);
  var [stats, setStats] = useState([]);
  const [ingnored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [switchState, setSwitchState] = useState(false);
  var navigate = useNavigate();
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [loading, setLoading] = useState(true);
  const [show,setShow]=useState();
  const [update, setUpdate] = useState(false);
  const [fees, setFees] = useState();
  var [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/booking/getLessorBookings?pageSize=10&page="+pageNum, {
        headers: { Authorization: userDetails },
      });
      var data = await response.json();
      console.log(data);
      setStats(data.bookings);
      setTotalPages(Math.ceil(data.count/10));
      setLoading(false);
    }

    getData();
  }, [userDetails, ingnored, switchState, update, pageNum]);

  function goToBookings(id) {
    navigate("/viewListings", { state: { id: id } });
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
        NotificationManager.error("Booking Cancelled");
        setSwitchState(!switchState);
        setUpdate(!update);
      })
      .catch((e) => {
        console.log(e);
      });

    forceUpdate();
  }

  function togglePopup(item) {
    setShow(item);
    var discount = item.paymentDetails.amount;
    discount = discount * 0.2;
    console.log(discount);
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

  async function statusChange(id) {
    axios
      .put(
        "http://localhost:8080/api/booking/markAsComplete/" + id,
        {},
        {
          headers: { Authorization: userDetails },
        }
      )
      .then((res) => {
        console.log(res);
        NotificationManager.success(res.data.msg);
      })
      .catch((e) => {
        console.log(e);
      });

    await fetch("http://localhost:8080/api/booking/getLessorBookings?pageSize=10&page="+pageNum, {
      headers: { Authorization: userDetails },
    })
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
    forceUpdate();
  }

  return (
    <>
      <table class="table table-borderless table-striped table-earning lessorTable">
        {loading === false ? (
          <>
            <thead>
              <tr>
                <th>Car Name</th>
                <th>Pickup Date</th>
                <th>Delivery Date</th>
                <th class="text-center">Earnings</th>
                <th class="text-center">Status</th>
                <th class="text-center">Mark As Complete</th>
                <th class="text-center">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((item) => {
                return (
                  <tr>
                    <td onClick={() => goToBookings(item.car._id)}>{item.car.carName}</td>
                    <td onClick={() => goToBookings(item.car._id)}>
                      {moment.utc(item.pickupDate).format("llll")}
                    </td>
                    <td onClick={() => goToBookings(item.car._id)}>
                      {moment.utc(item.dropOffDate).format("llll")}
                    </td>

                    <td class="text-center" onClick={() => goToBookings(item.car._id)}>
                      {item.status === "Rejected" || item.status === "Cancelled" ? (
                        <p>-</p>
                      ) : (
                        <>{item.paymentDetails.amount}</>
                      )}
                    </td>

                    <td class="text-center" onClick={() => goToBookings(item.car._id)}>
                      {item.status}
                    </td>
                    {item.status === "Accepted" ? (
                      <>
                        <td class="text-center">
                          <img
                            src={approve}
                            width="35"
                            alt=""
                            id="tick"
                            onClick={() => statusChange(item._id)}
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td class="text-center">
                          <img src={unable} width="28" alt="" id="unable" />
                        </td>
                      </>
                    )}

                    {item.status === "Accepted" ? (
                      <>
                        <td class="text-center">
                          <img
                            src={reject}
                            width="35"
                            alt=""
                            id="tick"
                            onClick={() => togglePopup(item)}
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td class="text-center">
                          <img src={unable} width="28" alt="" id="unable" />
                        </td>
                      </>
                    )}
                     <div class="popup-container" id="pop" onClick={toggleOff}>
                      <div class="popup">
                        <h2 style={{ color: "#f77d0a" }}>Are you sure you want to cancel this booking?</h2>
                        <br />
                        <p>You will be charged PKR {fees} for cancelling this booking!</p>
                        <button className="btn btn-secondaryDelete py-3 px-5 cancel-btn" onClick={() => toggleOff()}>Go Back</button>
                        <button className="btn btn-primaryDelete py-3 px-5 cancel-btn" onClick={() => BookingReject(show?._id)}>Cancel Booking</button>
                        </div>
                    </div>
                  </tr>
                );
              })}
            </tbody>
          </>
        ) : (
          <Loader2 />
        )}
      </table>
      {totalPages > 1?<>
        <div className="pagination">
        <div className="pagi-cons">
          {pageNum > 0? <>
            <img src={left_arr} alt="left" width="25px" onClick={()=>setPageNum(--pageNum)}/>
          </>:null}
          
          <span>Page {pageNum+1} of {totalPages}</span>
          {pageNum+1 !== totalPages? <>
            <img src={right_arr} alt="right"  width="25px"  onClick={()=>setPageNum(++pageNum)}/>
          </>:null}
        </div>
      </div>
      </>:<>
      <div className="pagination">
        <div className="pagi-cons">
          <span>Page {pageNum+1} of {totalPages}</span>
        </div>
      </div>
      </>}
    </>
  );
}

function PendingBookings() {
  var [stats, setStats] = useState([]);
  const [ingnored, forceUpdate] = useReducer((x) => x + 1, 0);

  var navigate = useNavigate();
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [loading, setLoading] = useState(true);
  const [show,setShow]=useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/booking/getLessorPendingBookings", {
        headers: { Authorization: userDetails },
      });
      var data = await response.json();
      console.log(data);
      setStats(data.bookings);
      setLoading(false);
    }

    getData();
  }, [userDetails, ingnored, update]);

  function goToBookings(id) {
    navigate("/viewListings", { state: { id: id } });
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
        NotificationManager.success(res.data.msg);
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
        NotificationManager.success(res.data.msg);
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

  return (
    <>
      <table class="table table-borderless table-striped table-earning lessorTable">
        {loading === false ? (
          <>
            <thead>
              <tr>
                <th>Car Name</th>
                <th>Pickup Date</th>
                <th>Delivery Date</th>
                <th class="text-center">Earnings</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((item) => {
                return (
                  <tr>
                    <td onClick={() => goToBookings(item.car._id)}>{item.car.carName}</td>
                    <td onClick={() => goToBookings(item.car._id)}>
                      {moment.utc(item.pickupDate).format("llll")}
                    </td>
                    <td onClick={() => goToBookings(item.car._id)}>
                      {moment.utc(item.dropOffDate).format("llll")}
                    </td>
                    <td class="text-center" onClick={() => goToBookings(item.car._id)}>
                      {item.paymentDetails.amount} PKR
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
                        <h2 style={{ color: "#f77d0a" }}>Are you sure you want to reject this booking?</h2>
                        <br />
                        <p>You will be charged PKR 1000 for rejecting this booking!</p>
                        <button className="btn btn-secondaryDelete py-3 px-5 cancel-btn" onClick={() => toggleOff()}>Go Back</button>
                        <button className="btn btn-primaryDelete py-3 px-5 cancel-btn" onClick={() => rejectBooking(show?._id)}>Cancel Booking</button>
                        </div>
                    </div>
                  </tr>
                );
              })}
            </tbody>
          </>
        ) : (
          <Loader2 />
        )}
      </table>
    </>
  );
}
