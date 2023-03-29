import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "react-notifications/lib/notifications.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function LesseeWallet() {
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  var [balance, setbalance] = useState("");
  var [upcomingBooking, setUpcomingBookings] = useState([]);
  var [recentBooking, setRecentBooking] = useState([]);
  var [chooseMonths, setCurrentMonths] = useState([]);
  var [graphData, setGraphData] = useState([]);
  var navigate = useNavigate();
  var [loader, setLoader] = useState(true);

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/wallet/lesseeWallet", {
        headers: { Authorization: userDetails },
      });

      const graphResponse = await fetch("http://localhost:8080/api/wallet/graphDataForLessee", {
        headers: { Authorization: userDetails },
      });

      var data = await response.json();
      var graph = await graphResponse.json();
      var recentData = [];

      for (var i = 0; i < data.recentBookings.length; i++) {
        if (i < 3) {
          recentData.push(data.recentBookings[i]);
        } else {
          break;
        }
      }

      var allMonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var currentMonths = [];
      for (var x = 0; x < graph.spendings.length; x++) {
        currentMonths.push(allMonths[x]);
      }
      setCurrentMonths(currentMonths);
      console.log(graph);
      console.log(data);
      setbalance(data.pendingBalance * 0.8);
      setUpcomingBookings(data.upcomingBookings);
      setRecentBooking(recentData);
      setGraphData(graph.spendings);
      setLoader(false);
    }

    getData();
  }, [userDetails]);

  function goToDetails(id) {
    navigate("/viewBookingLessor", { state: { id: id } });
  }

  return (
    <div className="stats-section">
      {loader === false ? (
        <>
          <div className="stats-container">
            <h1>Pending Balance: {balance.toLocaleString()} PKR</h1>
          </div>
          <h1>Recent Trends: </h1>
          <div className="stats-container">
            <div className="chart-2">
              <Line
                data={{
                  datasets: [
                    {
                      label: "Your Spendings",
                      data: graphData,
                      backgroundColor: ["rgba(253,126,20, 0.25)", "white", "white"],
                      borderColor: "#F77D0A",
                      hoverBackgroundColor: ["orange", "orange", "orange", "rgba(0,0,0,0.07)"],
                    },
                  ],
                  labels: chooseMonths,
                }}
                width={100}
                height={100}
                options={{
                  tension: 0.4,
                  fill: true,
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
            {recentBooking.length < 3 ? (
              <>
                <div className="container-1">
                  <h1 class="pl-3 mb-4 text-primary text-center">Recent Bookings</h1>
                  <div className="row">
                    {recentBooking.map((item) => {
                      return (
                        <div
                          className="col-lg-6 col-md-6 mb-2"
                          onClick={() => goToDetails(item._id)}
                        >
                          <div className="rent-item mb-4">
                            <img
                              className="img-fluid mb-4"
                              style={{ height: 150 }}
                              src={item.car.picture[0]}
                              alt="c180"
                            />
                            <h4 className="text-uppercase mb-4">
                              {item.car.company} {item.car.carName}
                            </h4>
                            <p>
                              You booked this car for {item.bookingDays} days, you spent{" "}
                              {(item.paymentDetails.amount).toLocaleString()} PKR
                            </p>
                            <button className="btn btn-primary px-3">View Details</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-1-1">
                  <h1 class="pl-3 mb-4 text-primary text-center">Recent Bookings</h1>
                  <div className="row">
                    {recentBooking.map((item) => {
                      return (
                        <div
                          className="col-lg-4 col-md-6 mb-2"
                          onClick={() => goToDetails(item._id)}
                        >
                          <div className="rent-item mb-4">
                            <img
                              className="img-fluid mb-4 car-listings"
                              style={{ height: 217 }}
                              src={item.car.picture[0]}
                              alt="c180"
                            />
                            <h4 className="text-uppercase mb-4">
                              {item.car.company} {item.car.carName}
                            </h4>
                            <p>
                              You booked this car for {item.bookingDays} days, you spent{" "}
                              {(item.paymentDetails.amount).toLocaleString()} PKR
                            </p>
                            <button className="btn btn-primary px-3">View Details</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* <h1>Recent Transactions: </h1>
      <div className="stats-container">
      <div class="table-responsive table--no-card m-b-40">
        <table class="table table-borderless table-striped table-earning">
          <thead>
            <tr>
              <th>Car Name</th>
              <th>Booking Date</th>
              <th>Price</th>
              <th class="text-right">Payment Method</th>
              <th class="text-right">Booking Duration</th>
              <th class="text-right">Total Price</th>
            </tr>
          </thead>
          <tbody>
            
                <tr>
                  <td>Mehran</td>
                  <td>12 Jun</td>
                  <td>2500 Pkr/Day</td>
                  <td className="text-right">Credit Card</td>
                  <td class="text-right">6 Days</td>
                  <td class="text-right">15000 Pkr</td>
                </tr>

                <tr>
                  <td>Ferrari</td>
                  <td>31 Jun</td>
                  <td>2500 Pkr/Day</td>
                  <td className="text-right">Credit Card</td>
                  <td class="text-right">6 Days</td>
                  <td class="text-right">15000 Pkr</td>
                </tr>

                <tr>
                  <td>Tesla</td>
                  <td>7 Aug</td>
                  <td>2500 Pkr/Day</td>
                  <td className="text-right">Cash on Delivery</td>
                  <td class="text-right">6 Days</td>
                  <td class="text-right">15000 Pkr</td>
                </tr>
          </tbody>
        </table>
      </div>
      </div> */}

          <h1>Ongoing Bookings: </h1>
          <div className="stats-container">
            <div class="table-responsive table--no-card m-b-40">
              <table class="table table-borderless table-striped table-earning">
                <thead>
                  <tr>
                    <th>Car Name</th>
                    <th>Booking Date</th>
                    <th>Price</th>
                    <th class="text-right">Payment Method</th>
                    <th class="text-right">Booking Duration</th>
                    <th class="text-right">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingBooking.map((item) => {
                    return (
                      <tr onClick={() => goToDetails(item._id)}>
                        <td>
                          {item.car.company} {item.car.carName}
                        </td>
                        <td> {moment.utc(item.bookingDate).format("llll")}</td>
                        <td>{item.car.rentPerDay} PKR/Day</td>
                        <td className="text-right">{item.paymentDetails.paymentMethod}</td>
                        <td class="text-right">{item.bookingDays} Days</td>
                        <td class="text-right">{item.paymentDetails.amount} PKR</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
