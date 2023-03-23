import React, { useEffect, useState, useReducer } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Bar, Line} from "react-chartjs-2";
import "chart.js/auto";
import Loader from "./Loader";
import reject from "../img/remove.png";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";


export default function LesseeDashboard() {
  var [stats, setStats] = useState([]);
  var [Analytics, setAnalytics] = useState({});
  const [show,setShow]=useState();
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [forceUpdate] = useReducer((x) => x + 1, 0);
  const [switchState, setSwitchState] = useState(false);
  const [fees, setFees] = useState();

  var navigate = useNavigate();
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/analytics/lesseeAnalytics", {
        headers: { Authorization: userDetails },
      });

      var data = await response.json();
      console.log(data);
      setStats(data.myBookings);
      setAnalytics(data.analytics);
      setLoading(false);
    }

    getData();
  }, [userDetails,update]);

  function goToBookings(id) {
    navigate("/viewBookingDashboard", { state: { id: id } });
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
        NotificationManager.error(res.data.msg);
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

  return (
    <div className="stats-section">
      <NotificationContainer/>
      {loading === true? <Loader/>: 
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
                  label: "My Spend",
                  data: [Analytics.lifetimeSpent, Analytics.currentMonthSpent],
                  backgroundColor: ["#F77D0A", "#343a40", "rgba(0,0,0,0.07)"],
                  
                  hoverBackgroundColor: [
                    "#6f42c1",
                    "#6f42c1",
                    "rgba(0, 123, 255,0.5)",
                    "rgba(0,0,0,0.07)",
                  ],
                },
                
              ],
              labels: ["Life Time Spent", "Current Month Spent"],
            }}
            width={100}
            height={100}
            options={
              {
                legend: {
                  labels: {
                      color:"white"
                  }
              },
              
              scales:{
                y:{
                  ticks: {
                    color: "white",
                    beginAtZero: true
                  },
                  grid:{
                    color: "rgba(185, 185, 185, 0.427)"
                  }
                },

                x:{
                  
                  ticks:{
                    color:"white",
                    beginAtZero: true
                  }
                }
              }
              }
            }
            
          />
        </div>

        <div className="chart-1">
          <Line
          
            data={{
              datasets: [
                {
                  label: "Booking Analysis",
                  data: [ Analytics.currentMonthBookings,Analytics.totalBookingsDone],
                  backgroundColor: ["#F77D0A", "white", "white"],
                  borderColor: '#F77D0A',  
                  hoverBackgroundColor: [
                    "orange",
                    "orange",
                    "orange",
                    "rgba(0,0,0,0.07)",
                  ],
                },
                
              ],
              labels: [  "Current Month Bookings", "Lifetime Bookings"],
            }}
            width={100}
            height={100}
            options={
              {
                legend: {
                  labels: {
                      backgroundColor:"#ffff"
                  }
              },
              scales:{
                y:{
                  ticks: {
                    color: "white",
                  },
                  grid:{
                    color: "rgba(185, 185, 185, 0.427)"
                  }
                },
                
                x:{
                  ticks:{
                    color:"white",
                    beginAtZero: true
                  },
                
                }
              }
              }
            }
            
          />
        </div>
      </div>
      <br />
      <h1 className="overview-heading">OVERVIEW:</h1>
      <div className="stats-container">

        <div className="col-sm-6 col-lg-2">
          <div className="overview-item overview-item--c2">
            <div className="overview__inner">
              <div className="overview-box clearfix">
                <div className="icon">
                  <i className="zmdi zmdi-account-o"></i>
                </div>
                <center>
                  <div className="text">
                    <h2>{Analytics.currentMonthBookings}</h2>
                    <span>Current Month Bookings</span>
                  </div>
                </center>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-8 col-lg-2">
          <div className="overview-item overview-item--c3">
            <div className="overview__inner">
              <div className="overview-box clearfix">
                <div className="icon">
                  <i className="zmdi zmdi-account-o"></i>
                </div>
                <center>
                  <div className="text">
                    <h2>{Analytics.totalBookingsDone}</h2>
                    <span>Total Bookings Completed</span>
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
                    <h2>{Analytics.currentMonthSpent} PKR</h2>
                    <span>Money Spent This Month</span>
                  </div>
                </center>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-2">
          <div className="overview-item overview-item--c1">
            <div className="overview__inner">
              <div className="overview-box clearfix">
                <div className="icon">
                  <i className="zmdi zmdi-account-o"></i>
                </div>
                <center>
                  <div className="text">
                    <h2>{Analytics.lifetimeSpent}</h2>
                    <span>Total Money Spent Overall</span>
                  </div>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1>Your Bookings: </h1>
      <br /> <br />
      <div class="table-responsive table--no-card m-b-40">
        <table class="table table-borderless table-striped table-earning">
          <thead>
            <tr>
              <th>Car Name</th>
              <th>Company</th>
              <th>Date Listed</th>
              <th class="text-right">Rent Per Day</th>
              <th class="text-right">Status</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
          
            {stats.map((item) => {
              return (
                <tr>
                  <td onClick={()=>goToBookings(item._id)}>{item.car.carName}</td>
                  <td onClick={()=>goToBookings(item._id)}>{item.car.company}</td>
                  <td onClick={()=>goToBookings(item._id)}>{moment.utc(item.listedDate).format("llll")}</td>
                  <td onClick={()=>goToBookings(item._id)} class="text-right">{item.paymentDetails.amount} PKR</td>
                  <td onClick={()=>goToBookings(item._id)} class="text-right">{item.status}</td>
                  <td class="text-right">
                  {item.status === "Accepted" ? (<img
                            src={reject}
                            width="35"
                            alt=""
                            id="tick"
                            onClick={() => togglePopup(item)}/>):<></>}

                  </td>
                  <div class="popup-container" id="pop" onClick={toggleOff}>
                      <div class="popup">
                        <h2 style={{ color: "#f77d0a" }}>Are you sure you want to cancel your booking?</h2>
                        <br />
                        <p>You will be charged PKR {fees} of the PKR {show?.paymentDetails?.amount} amount you paid.</p>
                        <button className="btn btn-secondaryDelete py-3 px-5 cancel-btn" onClick={() => toggleOff()}>Go Back</button>
                        <button className="btn btn-primaryDelete py-3 px-5 cancel-btn" onClick={() => BookingReject(show?._id)}>Cancel Booking</button>
                        </div>
                    </div>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </>
      }
      
    </div>
  );
}