import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import Loader from "./Loader";
import ReactSwitch from "react-switch";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function LessorDashboard() {
  var [stats, setStats] = useState([]);
  var [anal, setAnal] = useState({});
  const [loading, setLoading] = useState(true);
  const [switchState, setSwitchState] = useState(false);

  var navigate = useNavigate();
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/analytics/lessorAnalytics", {
        headers: { Authorization: userDetails },
      });

      var data = await response.json();
      console.log(data);
      setStats(data.myListings);
      setAnal(data.analytics);
      setLoading(false);
    }

    getData();
  }, [userDetails]);

  function goToListings(id) {
    navigate("/viewListings", { state: { id: id } });
  }

  async function statusChange(id){
    setSwitchState(true);
    axios.put("http://localhost:8080/api/listing/toggle/"+id,  
    {},
    {
        headers: { Authorization: userDetails },
    }).then((res)=>{
        console.log(res);
        NotificationManager.success('Listing Updated');
    }).catch((e)=>{
        console.log(e);
        NotificationManager.success('Listing Update Failed  ');
    })
    // forceUpdate();
  }

  return (
    <div className="stats-section">
      <NotificationContainer/>
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
          <div class="table-responsive table--no-card m-b-40">
            <table class="table table-borderless table-striped table-earning">
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
                      <td onClick={() => goToListings(item._id)}>{moment.utc(item.listedDate).format("llll")}</td>
                      <td onClick={() => goToListings(item._id)} class="text-right">{item.rentPerDay} PKR</td>
                      <td class="text-right">{item.status===true?<><span style={{ color: "green" }}> Active</span></>: <span style={{ color: "#6c757d" }}> Inactive</span>} </td>
                      <td class="text-right"><ReactSwitch className="switch" disabled={switchState} checked={item.status} onChange={()=>statusChange(item._id)} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
