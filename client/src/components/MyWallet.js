import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "react-notifications/lib/notifications.css";
import m3 from "../img/m3.jpg";
import c180 from "../img/c180.jpg";

export default function MyWallet() {
  return (
    <div className="stats-section">
      <div className="stats-container">
        <h1>Current Balance: 52,900Pkr</h1>
      </div>
      <h1>Recent Trends: </h1>
      
      <div className="stats-container">
        <div className="chart-2">
          <Line
            data={{
              datasets: [
                {
                  label: "Your Spending",
                  data: [1000, 2500, 1750, 4000, 8000, 4250, 1000],
                  backgroundColor: ["rgba(253,126,20, 0.25)", "white", "white"],
                  borderColor: "#F77D0A",
                  hoverBackgroundColor: ["orange", "orange", "orange", "rgba(0,0,0,0.07)"],
                },
              ],
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
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

        <div className="container-1">
              <h1 class="pl-3 mb-4 text-primary text-center">Recent Bookings</h1>
                            <div className="row">
                                <div className="col-lg-4 col-md-6 mb-2">
                                    <div className="rent-item mb-4">
                                        <img className="img-fluid mb-4 car-listings" src={c180} alt=""/>
                                        <h4 className="text-uppercase mb-4">Wagon R</h4>
                                        <p>You booked the car for 10 days, costing you 50,000Pkr</p>
                                        <a className="btn btn-primary px-3" href="/listings">View Details</a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-2">
                                    <div className="rent-item mb-4">
                                        <img className="img-fluid mb-4 car-listings" src={m3} alt=""/>
                                        <h4 className="text-uppercase mb-4">Mehran</h4>
                                        <p>You booked the car for 10 days, costing you 50,000Pkr</p>
                                        <a className="btn btn-primary px-3" href="/listings">View Details</a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-2">
                                    <div className="rent-item mb-4">
                                        <img className="img-fluid mb-4 car-listings" src={c180} alt=""/>
                                        <h4 className="text-uppercase mb-4">Alto</h4>
                                        <p>You booked the car for 10 days, costing you 50,000Pkr</p>
                                        <a className="btn btn-primary px-3" href="/listings">View Details</a>
                                    </div>
                                </div>
                                
                            </div>

              
            </div>
        
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


      <h1>Upcoming Bookings: </h1>
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
      </div>

      
    </div>
  );
}
