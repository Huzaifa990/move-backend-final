import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import Loader from "./Loader";

export default function AdminDashboard() {
  var [bookings, setBookings] = useState([]);
  var [listings, setListings] = useState([]);
  var [anal, setAnal] = useState({});
  const [loading, setLoading] = useState(true);

  var navigate = useNavigate();
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/analytics/adminAnalytics", {
        headers: { Authorization: userDetails },
      });

      var data = await response.json();
      console.log(data);
      setBookings(data.allBookings);
      setListings(data.allListings);
      setAnal(data.analytics);
      setLoading(false);
    }

    getData();
  }, [userDetails]);

  function goToBookings(id) {
    navigate("/viewBooking", { state: { id: id } });
  }

  function goToListings(id) {
    navigate("/viewListings", { state: { id: id } });
  }

  return (
    <div className="stats-section">
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
          <h1>All Bookings: </h1>
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
                </tr>
              </thead>
              <tbody>
                {bookings.map((item) => {
                  return (
                    <tr onClick={() => goToBookings(item._id)}>
                      <td>{item.car.carName}</td>
                      <td>{item.car.company}</td>
                      <td>{moment.utc(item.listedDate).format("llll")}</td>
                      <td class="text-right">{item.paymentDetails.amount} PKR</td>
                      <td class="text-right">{item.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <br /> <br />
          <h1>All Listings: </h1>
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
                </tr>
              </thead>
              <tbody>
                {listings.map((item) => {
                  return (
                    <tr onClick={() => goToListings(item._id)}>
                      <td>{item.carName}</td>
                      <td>{item.company}</td>
                      <td>{moment.utc(item.listedDate).format("llll")}</td>
                      <td class="text-right">{item.rentPerDay} PKR</td>
                      <td class="text-right">{item.status}</td>
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
